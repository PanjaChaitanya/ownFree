import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, created, error, serverError } from '@/lib/response';
import ContactMessage from '@/models/ContactMessage';

// Public: submit contact form
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, message } = body;
    if (!name || !email || !message) return error('Name, email, and message are required');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return error('Invalid email address');

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const msg = await ContactMessage.create({ ...body, ipAddress: ip });
    return created({ message: 'Message sent successfully', id: msg._id });
  } catch (err) {
    return serverError(err);
  }
}

// Admin: get all messages
async function getMessages(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const isRead = searchParams.get('isRead');
    const query = { isArchived: false };
    if (isRead !== null && isRead !== undefined && isRead !== '') {
      query.isRead = isRead === 'true';
    }
    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    const total = await ContactMessage.countDocuments({ isArchived: false });
    const unread = await ContactMessage.countDocuments({ isRead: false, isArchived: false });
    return ok({ messages, total, unread });
  } catch (err) {
    return serverError(err);
  }
}

export const GET = withAuth(getMessages);
