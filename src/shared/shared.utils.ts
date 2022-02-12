import { Upload } from "@src/types";
import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

interface UploadPhotoArgs {
  file: Upload;
  userId: number;
  fileName?: string;
}

export const uploadToS3 = async ({
  file,
  userId,
  fileName = "",
}: UploadPhotoArgs) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const keyName = `${fileName}/${userId}-${Date.now()}-${filename}`;
  const upload = await new AWS.S3()
    .upload({
      Bucket: "instaclone-sexy-uploads",
      Key: keyName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  return upload.Location;
};

export const throwErrorMessage = (error: string) => {
  return { ok: false, error };
};

export const throwOK = () => {
  return { ok: true };
};
