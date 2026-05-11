import { connectDB } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { ok, error, serverError } from '@/lib/response';
import User from '@/models/User';

async function handler(request) {
  try {
    await connectDB();
    const user = await User.findById(request.user.id);
    if (!user) return error('User not found', 404);
    return ok({ user });
  } catch (err) {
    return serverError(err);
  }
}

export const GET = withAuth(handler);
