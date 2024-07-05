"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/actions/auth";
import { loginSchema } from "@/zod/schema";
import Link from "next/link";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value.toString())
      );
      await loginUser(formData);
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-6">Login to your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter your Password"
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-xs">Remember me</span>
          </div>
          <Link href="#" className="text-[#307777] font-semibold text-sm">Forgot Password</Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#307777] text-white py-2 rounded"
        >
          Login
        </button>
      </form>

      <div className="flex items-center justify-center mt-5 text-sm">
        <div className="flex-grow border-t border-gray-300 ml-6"></div>
        <span className="mx-2 text-gray-500">or sign up with</span>
        <div className="flex-grow border-t border-gray-300 mr-6"></div>
      </div>

      <div className="text-sm text-center mt-2 flex items-center justify-center gap-2">
        <span>Don't have an account?</span>
        <Link href="/register" className="text-[#307777] font-semibold">
          Sign up here
        </Link>
      </div>
    </div>
  );
}
