import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, created, error, serverError } from '@/lib/response';
import FAQ from '@/models/FAQ';

export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    return ok({ faqs });
  } catch (err) {
    return serverError(err);
  }
}

async function createFAQ(request) {
  try {
    await connectDB();
    const body = await request.json();
    if (!body.question || !body.answer) return error('Question and answer are required');
    const faq = await FAQ.create(body);
    return created({ faq });
  } catch (err) {
    return serverError(err);
  }
}

export const POST = withAuth(createFAQ);
