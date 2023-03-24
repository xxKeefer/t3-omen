import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { adminDashboardRouter } from "./routers/adminDashboard";
import { characterSheetsRouter } from "./routers/characterSheets";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  adminDashboard: adminDashboardRouter,
  characters: characterSheetsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
