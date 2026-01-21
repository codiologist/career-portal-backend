/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import cloudinary from "../config/cloudinary";


const uploadToCloudinary = (fileBuffer: Buffer, folder: string, resourceType: 'image' | 'raw') => {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url!);
      }
    );

    stream.end(fileBuffer); // send buffer to Cloudinary
  });
};
export default uploadToCloudinary;