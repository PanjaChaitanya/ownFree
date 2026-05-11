import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, created, error, serverError } from '@/lib/response';
import Service from '@/models/Service';

// Public: GET all active services
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const query = { isActive: true };
    if (featured === 'true') query.isFeatured = true;
    const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
    return ok({ services });
  } catch (err) {
    return serverError(err);
  }
}

// Admin: POST create service
async function createService(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.title || !body.description) {
      return error('Title and description are required');
    }
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    const service = await Service.create(body);
    return created({ service });
  } catch (err) {
    if (err.code === 11000) return error('A service with this slug already exists');
    return serverError(err);
  }
}

export const POST = withAuth(createService);
