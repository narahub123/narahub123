import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { FileInfo, FileType } from "../types";

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

export const uploadFromBuffer = (
  buffer: Buffer,
  type: FileType
): Promise<{
  secure_url: string;
  public_id: string;
  type: FileType;
} | null> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "chatting-app",
        resource_type: "auto",
      },
      (err, result) => {
        if (err) return reject(err);
        return resolve(
          result
            ? {
                secure_url: result.secure_url,
                public_id: result.public_id,
                type,
              }
            : null
        );
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadMultipleFromBuffers = async (
  files: FileInfo[]
): Promise<
  { secure_url: string; public_id: string; name?: string; size?: string }[]
> => {
  const uploadPromises = files.map(async (file) => {
    const uploadResult = await uploadFromBuffer(file.file, file.type);
    if (file.type === "file") {
      return {
        ...uploadResult,
        name: file.name,
        size: file.size,
      };
    } else {
      return uploadResult;
    }
  });

  const results = await Promise.all(uploadPromises);

  // null 제거 후 반환
  return results.filter(
    (
      res
    ): res is {
      secure_url: string;
      public_id: string;
      type: FileType;
      name?: string;
      size?: string;
    } => res !== null
  );
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
