import { z } from "zod";

export const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(3, "Name should at least be 3 characters")
    .max(100, "Name should not exceeds 100 characters"),
    email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid Email"),
    password: z
    .string()
    .trim()
    .min(8, "Password should at least be 8 characters")
});

export const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid Email"),
    password: z
    .string()
    .trim()
    .min(8, "Password should at least be 8 characters")
});

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;