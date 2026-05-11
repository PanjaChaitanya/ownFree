import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.headers.set(
    'Set-Cookie',
    'admin_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
  );
  return response;
}
