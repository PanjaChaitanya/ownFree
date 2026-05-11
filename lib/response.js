import { NextResponse } from 'next/server';

export const ok = (data, status = 200) =>
  NextResponse.json({ success: true, data }, { status });

export const created = (data) =>
  NextResponse.json({ success: true, data }, { status: 201 });

export const error = (message, status = 400) =>
  NextResponse.json({ success: false, error: message }, { status });

export const serverError = (err) => {
  console.error('[API Error]', err);
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  );
};
