import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const upload = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "chatting-app",
      },
      (err, result) => {
        if (err) return reject(err);
        return resolve(result?.secure_url || "");
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};
