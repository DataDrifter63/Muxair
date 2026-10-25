import { z } from "zod";

export const contactSchema = z.object({
  need: z.string().min(1, "Select at least one service").max(200),
  bizName: z.string().trim().min(2, "Enter your business name").max(150),
  serviceArea: z.string().trim().min(2, "Enter your service area").max(150),
  otherInfo: z.string().trim().max(2000, "Please keep this under 2000 characters").optional(),
  fullName: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(40),
  heard: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const stepFields: Record<number, (keyof ContactFormValues)[]> = {
  1: ["need"],
  2: ["bizName", "serviceArea"],
  3: ["fullName", "email", "phone"],
};
