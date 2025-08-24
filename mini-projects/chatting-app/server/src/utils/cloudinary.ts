import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const upload = (
  file: Express.Multer.File
): Promise<{ secure_url: string; public_id: string } | null> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "chatting-app",
      },
      (err, result) => {
        if (err) return reject(err);
        return resolve(
          result
            ? { secure_url: result.secure_url, public_id: result.public_id }
            : null
        );
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const deleteFile = async (public_id: string) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);

    return result.result === "ok";
  } catch (error) {
    console.error("파일 삭제 실패", error);
    throw error;
  }
};
