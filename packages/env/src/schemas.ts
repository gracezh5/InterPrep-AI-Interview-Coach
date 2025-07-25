import { z } from 'zod';

const urlSchema = z.string().url("Must be a valid URL");
const nonEmptyString = z.string().min(1, "Cannot be empty");

export const nativeEnvSchema = z.object({
  EXPO_PUBLIC_CONVEX_URL: urlSchema.describe("Convex backend URL for the React Native app"),
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: nonEmptyString.describe("Clerk authentication public key for the React Native app"),
});

export const webEnvSchema = z.object({
  NEXT_PUBLIC_CONVEX_URL: urlSchema.describe("Convex backend URL for the Next.js app"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: nonEmptyString.describe("Clerk authentication public key for the Next.js app"),
  CLERK_SECRET_KEY: nonEmptyString.describe("Clerk authentication secret key for the Next.js app"),
});

export const backendEnvSchema = z.object({
  CONVEX_DEPLOYMENT: nonEmptyString.describe("Convex deployment configuration").optional(),
  CONVEX_URL: urlSchema.describe("Convex backend URL").optional(),
  CLERK_ISSUER_URL: urlSchema.describe("Clerk authentication issuer URL").optional(),
  OPENAI_API_KEY: nonEmptyString.describe("OpenAI API key for AI features").optional(),
  CONVEX_CLOUD_URL: urlSchema.describe("Convex cloud URL for deployment").optional(),
});

export type NativeEnv = z.infer<typeof nativeEnvSchema>;
export type WebEnv = z.infer<typeof webEnvSchema>;
export type BackendEnv = z.infer<typeof backendEnvSchema>;