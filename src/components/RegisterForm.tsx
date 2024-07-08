"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth";
import { registerSchema } from "@/zod/schema";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const validatedData = registerSchema.parse(data);

      Object.entries(validatedData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      await registerUser(formData);
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-8 shadow-md md:w-96">
      <h2 className="mb-6 text-2xl font-semibold">Register your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName")}
              placeholder="First Name"
              className="w-full rounded border p-2"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full rounded border p-2"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

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

        <div>
          <p className="m-0 text-sm font-medium text-gray-700">Date of Birth</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <select
                id="birthMonth"
                {...register("birthMonth")}
                className="w-full rounded border p-2"
              >
                <option value="">MM</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.birthMonth && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.birthMonth.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <select
                {...register("birthDay")}
                className="w-full rounded border p-2"
              >
                <option value="">DD</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.birthDay && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.birthDay.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <select
                {...register("birthYear")}
                className="w-full rounded border p-2"
              >
                <option value="">YYYY</option>
                {[...Array(100)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={i} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.birthYear && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.birthYear.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="flex">
            <select className="w-20 rounded-l border p-2">
              <option>BD</option>
            </select>
            <input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="+880 000-0000000"
              className="flex-1 rounded-r border-b border-r border-t p-2"
            />
          </div>
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender"
            {...register("gender")}
            className="w-full rounded border p-2"
          >
            <option value="">Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-xs">
              I accept the{" "}
              <span className="font-semibold text-[#307777]">
                Terms and Conditions
              </span>{" "}
              of the website
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded bg-[#307777] py-2 text-white"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Complete Registration!"
          )}
        </button>
      </form>

      <div className="mt-5 flex items-center justify-center text-sm">
        <div className="ml-6 flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">or sign up with</span>
        <div className="mr-6 flex-grow border-t border-gray-300"></div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 text-center text-sm">
        <span>Already have an account?</span>
        <Link href="/" className="font-semibold text-[#307777]">
          Login here
        </Link>
      </div>
    </div>
  );
}
