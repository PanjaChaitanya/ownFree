import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, error, serverError } from '@/lib/response';
import Service from '@/models/Service';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const service = await Service.findOne({
      $or: [{ _id: id.match(/^[0-9a-f]{24}$/) ? id : null }, { slug: id }],
      isActive: true,
    });
    if (!service) return error('Service not found', 404);
    return ok({ service });
  } catch (err) {
    return serverError(err);
  }
}

async function updateService(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!service) return error('Service not found', 404);
    return ok({ service });
  } catch (err) {
    if (err.code === 11000) return error('A service with this slug already exists');
    return serverError(err);
  }
}

async function deleteService(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return error('Service not found', 404);
    return ok({ message: 'Service deleted' });
  } catch (err) {
    return serverError(err);
  }
}

export const PUT = withAuth(updateService);
export const DELETE = withAuth(deleteService);
