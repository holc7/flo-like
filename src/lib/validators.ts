import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const onboardingSchema = z.object({
  displayName: z.string().min(1).max(100),
  avgCycleLength: z.number().int().min(15).max(60),
  avgPeriodLength: z.number().int().min(1).max(15),
  lastPeriodStart: z.string(),
  notificationsEnabled: z.boolean(),
  periodReminderDays: z.number().int().min(0).max(7),
  fertileReminder: z.boolean(),
});

export const dailyLogSchema = z.object({
  logDate: z.string(),
  isPeriodDay: z.boolean(),
  flowIntensity: z.number().int().min(1).max(5).nullable(),
  mood: z.number().int().min(1).max(5).nullable(),
  energyLevel: z.number().int().min(1).max(5).nullable(),
  painLevel: z.number().int().min(0).max(5).nullable(),
  sleepQuality: z.number().int().min(1).max(5).nullable(),
  physicalSymptoms: z.array(z.string()),
  emotionalSymptoms: z.array(z.string()),
  exercise: z.boolean(),
  intimacy: z.boolean(),
  cervicalMucus: z
    .enum(["dry", "sticky", "creamy", "watery", "egg_white"])
    .nullable(),
  notes: z.string().max(1000).nullable(),
});

export const profileSchema = z.object({
  displayName: z.string().min(1).max(100),
  dateOfBirth: z.string().nullable(),
  locale: z.enum(["sl", "en"]),
  avgCycleLength: z.number().int().min(15).max(60),
  avgPeriodLength: z.number().int().min(1).max(15),
  notificationsEnabled: z.boolean(),
  periodReminderDays: z.number().int().min(0).max(7),
  fertileReminder: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type DailyLogInput = z.infer<typeof dailyLogSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
