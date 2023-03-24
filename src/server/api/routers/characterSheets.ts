import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const characterSheetsRouter = createTRPCRouter({
  getConfigs: protectedProcedure
    .input(
      z.object({
        user: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { user } = input;
      return ctx.prisma.characterSheetConfig.findMany({
        where: {
          createdById: user,
        },
      });
    }),
});
