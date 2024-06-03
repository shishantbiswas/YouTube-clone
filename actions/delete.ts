"use server";

import { db } from "@/lib/db";
import { DeleteObjectCommand, DeleteObjectsCommand, S3Client,ListObjectsV2Command } from "@aws-sdk/client-s3";

export default async function Delete(video:{
    id: string;
    userId: string;
    title: string;
    description: string;
    thumbnail: string;
    videoId: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
  }) {


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

  const folderPath = video.videoId + "/";


  const list = new ListObjectsV2Command({
    Bucket: s3BucketName,
    Prefix: folderPath,
  })

  const listObjectsResponse = await s3.send(list);

  const objectKeysToDelete = listObjectsResponse.Contents?.map(object => object.Key);


  if (objectKeysToDelete && objectKeysToDelete.length > 0) {
    // Prepare the delete request
    const deleteObjectsRequest = new DeleteObjectsCommand({
        Bucket: s3BucketName,
        Delete: {
            Objects: objectKeysToDelete.map(key => ({ Key: key })),
        },
    });

    // Execute the delete operation
    await s3.send(deleteObjectsRequest);

    console.log(`Deleted ${objectKeysToDelete.length} objects under ${folderPath}`);
} else {
    console.log(`Folder ${folderPath} is already empty or does not exist.`);
}

await db.video.delete({
    where: { id: video.id },
  });

// Optionally, delete the folder itself after ensuring it's empty
// Note: S3 doesn't have traditional folders, so "deleting a folder" means removing the prefix from subsequent uploads
console.log(`Folder ${folderPath} deleted successfully.`);

}
