declare namespace NodeJS {
  interface ProcessEnv {
    CONVEX_DEPLOYMENT?: string;
    CONVEX_URL?: string;
    CLERK_ISSUER_URL?: string;
    OPENAI_API_KEY?: string;
    CONVEX_CLOUD_URL?: string;
  }
}