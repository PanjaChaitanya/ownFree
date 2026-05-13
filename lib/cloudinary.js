import { v2 as cloudinary } from 'cloudinary';

function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

export async function uploadImage(base64String, folder = 'horizon-web-labs') {
  const cld = getCloudinary();
  const result = await cld.uploader.upload(base64String, {
    folder,
    resource_type: 'auto',
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  };
}

export async function deleteImage(publicId) {
  const cld = getCloudinary();
  await cld.uploader.destroy(publicId);
}

export default cloudinary;
