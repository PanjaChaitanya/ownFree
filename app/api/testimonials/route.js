import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, created, error, serverError } from '@/lib/response';
import Testimonial from '@/models/Testimonial';

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return ok({ testimonials });
  } catch (err) {
    return serverError(err);
  }
}

async function createTestimonial(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.name || !body.review) return error('Name and review are required');
    const testimonial = await Testimonial.create(body);
    return created({ testimonial });
  } catch (err) {
    return serverError(err);
  }
}

export const POST = withAuth(createTestimonial);
