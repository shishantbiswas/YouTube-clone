"use server";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export default async function ProfileUpdate(
  values:FormData
) {
  const image = values.get("image") as unknown as File;
  const fullname = values.get("fullname") as string

  const user = await validateRequest()
  
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
      return { error: "Server configuration issue, Please Contact Admin" };
    }
  
    const s3 = new S3Client({
      endpoint: s3Endpoint,
      region: s3Region,
      credentials: {
        accessKeyId: s3AccessKeyId,
        secretAccessKey: s3SecretKey,
      },
    });

    const imageBytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);

    try {
        const s3Key = `user/${user.user?.id}-${image.name}`;
    
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

     if(fullname){
        await db.user.update({
            where:{id:user.user?.id},
            data: {
             fullname:fullname,
             image:`${user.user?.id}-${image.name}`
            },
          });
     }

     await db.user.update({
        where:{id:user.user?.id},
        data: {
         image:`${user.user?.id}-${image.name}`
        },
      });
    
      return { success: "Done"};
    
}
