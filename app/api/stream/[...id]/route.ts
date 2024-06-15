import { Readable } from "stream";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

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
    return new Response(
      JSON.stringify({
        error: "Server configuration issue, Please Contact Support",
      }),
      { status: 500 }
    );
  }

  const s3 = new S3Client({
    endpoint: s3Endpoint,
    region: s3Region,
    credentials: {
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretKey,
    },
  });

  const getRequestedFile = new GetObjectCommand({
    Bucket: s3BucketName,
    Key: `${id}/${RequestedFile}`,
  });

  const res = await s3.send(getRequestedFile);
  if (!res.Body) {
    return new Response(JSON.stringify({ error: "Failed to retrieve file" }), {
      status: 500,
    });
  }

  const buffer = await streamToBuffer(res.Body)

  if (buffer) {
    return new Response(buffer, {
      headers: { "Content-Type": "application/octet-stream" },
    });
  } else {
    // Handle the case where stringData is not available
    return new Response(JSON.stringify({ error: "Failed to retrieve file" }), {
      status: 500,
    });
  }
}

async function streamToBuffer(stream: any ): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk:Readable) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
