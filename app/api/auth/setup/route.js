import { connectDB } from '@/lib/db';
import { ok, error, serverError } from '@/lib/response';
import User from '@/models/User';

// One-time setup to create the first admin user
export async function POST(request) {
  try {
    await connectDB();
    const count = await User.countDocuments();
    if (count > 0) {
      return error('Admin already exists. Use login instead.', 403);
    }

    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return error('Name, email, and password are required');
    }

    const user = await User.create({ name, email, password, role: 'admin' });
    return ok({ message: 'Admin created successfully', user }, 201);
  } catch (err) {
    return serverError(err);
  }
}
