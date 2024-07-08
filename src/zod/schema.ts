import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must contain at least 2 characters"),
  lastName: z.string().min(2, "Last name must contain at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  phoneNumber: z
    .string()
    .min(10, "Phone number must contain at least 10 digits"),
  birthMonth: z.string().min(1, "Birth month is required"),
  birthDay: z.string().min(1, "Birth day is required"),
  birthYear: z.string().min(1, "Birth year is required"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().nonempty("Password is required"),
});
