import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function GET(request: Request) {
  const id = request.url.split("/")[5];
  const RequestedFile = request.url.split("/")[6];

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
    // Return a Response object with an error status and body
    return new Response(JSON.stringify({ error: "Server configuration issue, Please Contact Support" }), { status: 500 });
  }

  const s3 = new S3Client({
    endpoint: s3Endpoint,
    region: s3Region,
    credentials: {
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretKey,
    },
  });

  const listObjectsCommand = new ListObjectsV2Command({
    Bucket: s3BucketName,
    Prefix: id + "/",
  });

  const data = await s3.send(listObjectsCommand);

  if (!data || data.Contents?.length === 0) {
    // Return a Response object with an error status and body
    return new Response(JSON.stringify({ error: "No content found" }), { status: 404 });
  }

  const getRequestedFile = new GetObjectCommand({
    Bucket: s3BucketName,
    Key: `${id}/${RequestedFile}`,
  });

  const res = await s3.send(getRequestedFile);

  // Ensure res.Body?.transformToWebStream() returns a Response object
  // Adjust according to how you intend to handle the response body
  const stringData = res.Body?.transformToWebStream();
  if (stringData) {
    return new Response(stringData, { headers: { 'Content-Type': 'application/octet-stream' } }); // Example header
  } else {
    // Handle the case where stringData is not available
    return new Response(JSON.stringify({ error: "Failed to retrieve file" }), { status: 500 });
  }
}