"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth";
import { registerSchema } from "@/zod/schema";
import Link from "next/link";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
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
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-6">Register your Account</h2>
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
              className="w-full border p-2 rounded"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
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
              className="w-full border p-2 rounded"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
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

        <div>
          <p className="text-sm font-medium text-gray-700 m-0">Date of Birth</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <select
                id="birthMonth"
                {...register("birthMonth")}
                className="w-full border p-2 rounded"
              >
                <option value="">MM</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.birthMonth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.birthMonth.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <select
                {...register("birthDay")}
                className="w-full border p-2 rounded"
              >
                <option value="">DD</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.birthDay && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.birthDay.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <select
                {...register("birthYear")}
                className="w-full border p-2 rounded"
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
                <p className="text-red-500 text-xs mt-1">
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
            <select className="w-20 border p-2 rounded-l">
              <option>BD</option>
            </select>
            <input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="+880 000-0000000"
              className="flex-1 border-t border-b border-r p-2 rounded-r"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
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
            className="w-full border p-2 rounded"
          >
            <option value="">Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-xs">
              I accept the{" "}
              <span className="text-[#307777] font-semibold">
                Terms and Conditions
              </span>{" "}
              of the website
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#307777] text-white py-2 rounded"
        >
          Complete Registration!
        </button>
      </form>

      <div className="flex items-center justify-center mt-5 text-sm">
        <div className="flex-grow border-t border-gray-300 ml-6"></div>
        <span className="mx-2 text-gray-500">or sign up with</span>
        <div className="flex-grow border-t border-gray-300 mr-6"></div>
      </div>

      <div className="text-sm text-center mt-2 flex items-center justify-center gap-2">
        <span>Already have an account?</span>
        <Link href="/" className="text-[#307777] font-semibold">
          Login here
        </Link>
      </div>
    </div>
  );
}
