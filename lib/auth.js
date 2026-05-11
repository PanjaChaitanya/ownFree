import { NextResponse } from 'next/server';
import { verifyToken } from './jwt';

export function getTokenFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookieToken = request.cookies.get('admin_token')?.value;
  return cookieToken || null;
}

export function withAuth(handler) {
  return async (request, context) => {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
    request.user = decoded;
    return handler(request, context);
  };
}
