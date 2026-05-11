import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, error, serverError } from '@/lib/response';
import Testimonial from '@/models/Testimonial';

async function updateTestimonial(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
    if (!testimonial) return error('Testimonial not found', 404);
    return ok({ testimonial });
  } catch (err) {
    return serverError(err);
  }
}

async function deleteTestimonial(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) return error('Testimonial not found', 404);
    return ok({ message: 'Testimonial deleted' });
  } catch (err) {
    return serverError(err);
  }
}

export const PUT = withAuth(updateTestimonial);
export const DELETE = withAuth(deleteTestimonial);
