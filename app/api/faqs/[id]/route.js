import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, error, serverError } from '@/lib/response';
import FAQ from '@/models/FAQ';

async function updateFAQ(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true });
    if (!faq) return error('FAQ not found', 404);
    return ok({ faq });
  } catch (err) {
    return serverError(err);
  }
}

async function deleteFAQ(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) return error('FAQ not found', 404);
    return ok({ message: 'FAQ deleted' });
  } catch (err) {
    return serverError(err);
  }
}

export const PUT = withAuth(updateFAQ);
export const DELETE = withAuth(deleteFAQ);
