import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { ok, error, serverError } from '@/lib/response';
import User from '@/models/User';

// One-time setup — creates the first admin user
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

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword, role: 'admin' });

    return ok({ message: 'Admin created successfully', user: { _id: user._id, name: user.name, email: user.email } }, 201);
  } catch (err) {
    return serverError(err);
  }
}
