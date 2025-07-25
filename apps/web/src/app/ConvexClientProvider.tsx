"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ErrorBoundary } from "./ErrorBoundary";
// import { env } from "@/env";

// const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

// We are reading the variables directly from the environment, bypassing the broken import.
// The "!" tells TypeScript that we are certain these variables will exist.
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // NOTE: Once you get Clerk working you can remove this error boundary
    <ErrorBoundary>
      <ClerkProvider
        // publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        publishableKey={clerkPublishableKey}
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ErrorBoundary>
  );
}
