declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CONVEX_URL: string;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
  }
}