"use server";

import { join } from "path";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import { writeFile, readdir, readFile, unlink } from "fs/promises";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { rimraf } from "rimraf";

export default async function Upload(data: FormData) {
  const { userId } = auth();
  // user check
  if (!userId) {
    return { error: "You are not Authenticated !" };
  }
  const file: File | null = data.get("video") as unknown as File;
  const description = data.get("description") as string;
  const title = data.get("title") as string;
  const category = data.get("category") as string;
  const image: File | null = data.get("image") as unknown as File;

  // file validation
  if (!file.size) return { error: "No file Attached" };
  if (file.size > 104857600) return { error: "File size larger than 100MB!" };
  if (!image.name) return { error: "Image is Required !" };

  const s3Endpoint = process.env.S3_ENDPOINT;
  const s3Region = process.env.S3_REGION;
  const s3AccessKeyId = process.env.S3_ACCESS_KEY;
  const s3SecretKey = process.env.S3_SECRET_KEY;
  const s3BucketName = process.env.S3_BUCKET_NAME;

  if (
    !s3Endpoint ||
    !s3Region ||
    !s3AccessKeyId ||
    !s3SecretKey ||
    !s3BucketName
  ) {
    return { error: "Server configuration issue, Please Contact Support" };
  }

  const s3 = new S3Client({
    endpoint: s3Endpoint,
    region: s3Region,
    credentials: {
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretKey,
    },
  });

  const tempFilePath = join("./temp", file.name);

  // generating id to store in s3
  const videoId = uuidv4();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(tempFilePath, buffer);

  const imageBytes = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageBytes);

  const hlsPlaylist = `./output/${videoId}`;
  fs.mkdirSync(hlsPlaylist, { recursive: true });

  // can't get multiple srcs to work ATM
  // const command = `ffmpeg -i './temp/${file.name}' \
  // -vf "scale=1280:-1" -c:v libx264 -preset slow -b:v 2500k -maxrate 2500k -bufsize 5000k -hls_time 6 -hls_list_size 0 -f hls ./output/${videoId}/1280p.m3u8 \
  // -vf "scale=854:-1" -c:v libx264 -preset slow -b:v 1500k -maxrate 1500k -bufsize 3000k -hls_time 6 -hls_list_size 0 -f hls ./output/${videoId}/854p.m3u8 \
  // -vf "scale=640:-1" -c:v libx264 -preset slow -b:v 800k -maxrate 800k -bufsize 1600k -hls_time 6 -hls_list_size 0 -f hls ./output/${videoId}/640p.m3u8
  // `;

  const command = `ffmpeg -i './temp/${file.name}' -vf "scale=1280:-1" -c:v libx264 -preset slow -b:v 2500k -maxrate 2500k -bufsize 5000k -hls_time 6 -hls_list_size 0 -f hls ./output/${videoId}/index.m3u8  `;

  try {
    await execPromise(command);

    // Delete the original file after conversion
    await unlink(tempFilePath);
    console.log("Video Conversion successfull Staring Upload");

    // Proceed with the rest of the function...
  } catch (error) {
    console.error("exec error", error);
    // Handle deletion of the original file in case of error
    await unlink(tempFilePath).catch(console.error);
    console.log("File Conversion Failed Deleted Original Video From Server");
    return;
  }

  try {
    const s3Key = `${videoId}/${image.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: s3BucketName,
        Key: s3Key,
        Body: imageBuffer,
      })
    );
    console.log(`${image.name} Uploaded Successfully`);
  } catch (err) {
    console.log("Error: ", err);
  }

  const files = await readdir(hlsPlaylist);
  //looping through each .ts file and saving it to s3
  for (const file of files) {
    const tempPath = join(hlsPlaylist, file);

    // Read file content
    const fileContent = await readFile(tempPath);

    // Define the S3 object key (path)
    const s3Key = `${videoId}/${file}`;

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: s3BucketName,
          Key: s3Key,
          Body: fileContent,
        })
      );
      console.log(`${file} Uploaded Successfully`);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  try {
    await rimraf(hlsPlaylist);
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
  }

  await db.video.create({
    data: {
      title: title,
      userId: userId,
      description: description,
      videoId: videoId,
      category: category,
      thumbnail: image.name,
    },
  });

  return { success: "Video Converted And Uploaded Successfully"};
}

function execPromise(
  command: string
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stdout, stderr });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}
