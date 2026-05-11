import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, error, serverError } from '@/lib/response';
import ContactMessage from '@/models/ContactMessage';

async function updateMessage(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const msg = await ContactMessage.findByIdAndUpdate(id, body, { new: true });
    if (!msg) return error('Message not found', 404);
    return ok({ message: msg });
  } catch (err) {
    return serverError(err);
  }
}

async function deleteMessage(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const msg = await ContactMessage.findByIdAndDelete(id);
    if (!msg) return error('Message not found', 404);
    return ok({ message: 'Message deleted' });
  } catch (err) {
    return serverError(err);
  }
}

export const PUT = withAuth(updateMessage);
export const DELETE = withAuth(deleteMessage);
