import type { z } from 'zod';
import type { nativeEnvSchema, webEnvSchema, backendEnvSchema } from './schemas';

export type NativeEnv = z.infer<typeof nativeEnvSchema>;
export type WebEnv = z.infer<typeof webEnvSchema>;
export type BackendEnv = z.infer<typeof backendEnvSchema>;

export interface EnvConfig<T> {
  schema: z.ZodSchema<T>;
  runtimeEnv?: Record<string, string | undefined>;
}