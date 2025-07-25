import { z } from 'zod';

interface EnvError {
  field: string;
  message: string;
  whereToGet?: string;
}

interface ValidationOptions {
  onError?: (errors: EnvError[]) => void;
  throwOnError?: boolean;
}

const defaultErrorHandler = (errors: EnvError[]) => {
  console.error('\n⚠️  Environment validation failed!\n');
  
  errors.forEach((error) => {
    console.error(`  ❌ ${error.field}: ${error.message}`);
    if (error.whereToGet) {
      console.error(`     → Get it from: ${error.whereToGet}`);
    }
  });
  
  console.error('\n  Please check your environment variables and try again.\n');
};

export function createEnv<T extends z.ZodObject<any>>(
  schema: T,
  options: ValidationOptions = {}
): z.infer<T> {
  const { 
    onError = defaultErrorHandler, 
    throwOnError = true 
  } = options;

  try {
    const parsed = schema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: EnvError[] = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        whereToGet: getWhereToGet(err.path.join('.')),
      }));

      onError(errors);

      if (throwOnError) {
        throw new Error('Environment validation failed. See logs above for details.');
      }
    }

    throw error;
  }
}

function getWhereToGet(envVarName: string): string | undefined {
  const whereToGetMap: Record<string, string> = {
    'EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY': 'https://dashboard.clerk.com/apps/app/api-keys',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY': 'https://dashboard.clerk.com/apps/app/api-keys',
    'CLERK_SECRET_KEY': 'https://dashboard.clerk.com/apps/app/api-keys',
    'CLERK_ISSUER_URL': 'https://dashboard.clerk.com/apps/app/jwt-templates',
    'OPENAI_API_KEY': 'https://platform.openai.com/account/api-keys',
    'EXPO_PUBLIC_CONVEX_URL': 'https://dashboard.convex.dev',
    'NEXT_PUBLIC_CONVEX_URL': 'https://dashboard.convex.dev',
    'CONVEX_URL': 'https://dashboard.convex.dev',
    'CONVEX_DEPLOYMENT': 'https://dashboard.convex.dev',
    'CONVEX_CLOUD_URL': 'https://dashboard.convex.dev',
  };

  return whereToGetMap[envVarName];
}

export function validateEnvVar(
  value: unknown,
  schema: z.ZodSchema,
  varName: string
): { success: true; data: any } | { success: false; error: string } {
  try {
    const data = schema.parse(value);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const whereToGet = getWhereToGet(varName);
      const message = `${varName}: ${error.errors[0].message}`;
      return { 
        success: false, 
        error: whereToGet ? `${message}\n→ Get it from: ${whereToGet}` : message 
      };
    }
    return { success: false, error: 'Unknown validation error' };
  }
}