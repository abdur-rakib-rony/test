"use server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { loginSchema, registerSchema } from "@/zod/schema";
import { createToken } from "@/lib/auth";

export async function registerUser(formData: FormData) {
  await connectToDB();

  const parsedData = registerSchema.parse(
    Object.fromEntries(formData.entries())
  );

  const existingUser = await User.findOne({ email: parsedData.email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(parsedData.password, 10);

  const newUser = await User.create({
    ...parsedData,
    password: hashedPassword,
    createdAt: new Date(),
  });

  const token = await createToken({ userId: newUser._id.toString() });

  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function loginUser(formData: FormData) {
  const { email, password } = loginSchema.parse(
    Object.fromEntries(formData.entries())
  );

  await connectToDB();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = await createToken({ userId: user._id.toString() });

  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function logoutUser() {
  cookies().set("token", "", { expires: new Date(0) });
}