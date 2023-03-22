import * as aws from "aws-sdk";

aws.config.update({
  accessKeyId: process.env.AWS_ID_FOR_ACCESS,
  secretAccessKey: process.env.AWS_KEY_FOR_SECRET_ACCESS,
  region: process.env.AWS_S3_REGION,
  signatureVersion: "v4",
});

export const AWS = aws;
