import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Email invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type SignUpSchemaType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type SignInSchemaType = z.infer<typeof signinSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Email invalid"),
});

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z.object({
  current_password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  new_password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const createBookingSchema = z.object({
  facility: z.object({
    id: z.string().min(1, "Facility ID required"),
    name: z.string().min(1, "Facility name required"),
  }),
  booking_date: z.string().nonempty("Booking Date is required"),
  available_slots: z.object({
    hour: z.string().min(1, "Slot ID required"),
    startTime: z.string().min(1, "Slot startTime required"),
  }),
  notes: z.string().optional(),
});

export type CreateBookingSchemaType = z.infer<typeof createBookingSchema>;
