import { jwtVerify, SignJWT } from 'jose';
import { NextRequest } from "next/server";

export function getToken(req: NextRequest) {
  return req.cookies.get("token")?.value;
}

export async function verifyToken(token: string) {
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function createToken(payload: { userId: string }) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret);
  return token;
}