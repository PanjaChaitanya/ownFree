import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(base64String, folder = 'horizon-web-labs') {
  const result = await cloudinary.uploader.upload(base64String, {
    folder,
    resource_type: 'auto',
    transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

export async function deleteImage(publicId) {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
