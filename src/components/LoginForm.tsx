"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/actions/auth";
import { loginSchema } from "@/zod/schema";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value.toString()),
      );
      await loginUser(formData);
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full rounded-lg bg-white p-8 shadow-md md:w-96">
      <h2 className="mb-6 text-2xl font-semibold">Login to your Account</h2>
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
            className="w-full rounded border p-2"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
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
            className="w-full rounded border p-2"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-xs">Remember me</span>
          </div>
          <Link href="#" className="text-sm font-semibold text-[#307777]">
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded bg-[#307777] py-2 text-white"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="mt-5 flex items-center justify-center text-sm">
        <div className="ml-6 flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">or sign up with</span>
        <div className="mr-6 flex-grow border-t border-gray-300"></div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 text-center text-sm">
        <span>Don&apos;t have an account?</span>
        <Link href="/register" className="font-semibold text-[#307777]">
          Sign up here
        </Link>
      </div>
    </div>
  );
}
