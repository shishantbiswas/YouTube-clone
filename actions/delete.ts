"use server";

import { db } from "@/lib/db";
import {
  DeleteObjectCommand,
  S3Client,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { Video } from "@prisma/client";

export default async function Delete(video: Video) {
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

  const folderPath = video.id;

  const list = new ListObjectsV2Command({
    Bucket: s3BucketName,
    Prefix: folderPath,
  });

  const listObjectsResponse = await s3.send(list);

  const objArr = listObjectsResponse.Contents;
  objArr?.forEach(async (item) => {
    try {
      const deleteObjectsRequest = new DeleteObjectCommand({
        Bucket: s3BucketName,
        Key: item.Key,
      });
      await s3.send(deleteObjectsRequest);

      console.log(`Deleted ${item.Key} objects under ${folderPath}`);
    } catch (error) {
      return { error: "Error Deleting Video" };
    }
  });

  await db.video.delete({
    where: { id: video.id },
  });

  return { sucess: "Video Deleted Successfully" };
}
