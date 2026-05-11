import { connectDB } from '@/lib/db';
import { signToken } from '@/lib/jwt';
import { ok, error, serverError } from '@/lib/response';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password, rememberMe } = await request.json();

    if (!email || !password) {
      return error('Email and password are required');
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return error('Invalid credentials', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return error('Invalid credentials', 401);
    }

    const token = signToken({ id: user._id, email: user.email, role: user.role });

    const response = ok({ token, user: user.toJSON() });

    // Set HTTP-only cookie
    const cookieOptions = [
      `admin_token=${token}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Strict',
      rememberMe ? 'Max-Age=604800' : 'Max-Age=86400',
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
    ]
      .filter(Boolean)
      .join('; ');

    response.headers.set('Set-Cookie', cookieOptions);
    return response;
  } catch (err) {
    return serverError(err);
  }
}
