import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getToken(req: NextRequest) {
  return req.cookies.get("token")?.value;
}
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
  } catch {
    return null;
  }
}
