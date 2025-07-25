import { createEnv, backendEnvSchema } from '@narby/env';

export const env = createEnv(backendEnvSchema, {
  throwOnError: false,
});