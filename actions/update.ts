'use server'

import { db } from "@/lib/db"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

export default async function Update(data:FormData,videoId:string) {
    let image = data.get('image') as File
    let title = data.get('title')
    let description = data.get('description')
    let category = data.get('category')    

    if(!videoId) return{error:'Invalid Credentials !'}

    title = typeof title === 'string'? title : '';
    description = typeof description === 'string'? description : '';
    category = typeof category === 'string'? category : '';

    if(!title || !description || !category  ) return {error:'Tilte, Description and Category is required!'}

    if(!image.size){
        await db.video.update({
            where:{id:videoId},
            data:{
                title:title,
                description:description,
                category:category,
            }
        })

        return {success:'Video Updated Successfully'}
    }


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


    const imageBytes = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageBytes);

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

      await db.video.update({
        where:{id:videoId},
        data: {
          title: title,
          description: description,
          category: category,
          thumbnail: image.name,
        },
      });
    
    
    return {success:'Video Updated Successfully'}

}