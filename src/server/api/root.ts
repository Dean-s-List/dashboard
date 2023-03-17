import { createTRPCRouter } from "./trpc";
import { client } from "./routers/client";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  client,
});

// export type definition of API
export type AppRouter = typeof appRouter;
