import { withAuth } from '@/lib/auth';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import { ok, error, serverError } from '@/lib/response';

async function handleUpload(request) {
  try {
    const { image, folder, publicId } = await request.json();
    if (!image) return error('No image provided');

    // Delete old image if replacing
    if (publicId) {
      await deleteImage(publicId).catch(() => {});
    }

    const result = await uploadImage(image, folder || 'horizon-web-labs');
    return ok({ url: result.url, publicId: result.publicId });
  } catch (err) {
    return serverError(err);
  }
}

async function handleDelete(request) {
  try {
    const { publicId } = await request.json();
    if (!publicId) return error('Public ID is required');
    await deleteImage(publicId);
    return ok({ message: 'Image deleted' });
  } catch (err) {
    return serverError(err);
  }
}

export const POST = withAuth(handleUpload);
export const DELETE = withAuth(handleDelete);
