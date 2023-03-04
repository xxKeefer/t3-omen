import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";

export const adminDashboardRouter = createTRPCRouter({
  getUsers: adminProcedure
    .input(
      z.object({
        text: z.string(),
        role: z.enum(["admin", "user"]),
        pagination: z.object({
          skip: z.number(),
          take: z.number(),
          cursor: z.number().default(1),
        }),
      })
    )
    .query(({ ctx, input }) => {
      const { text, role, pagination } = input;
      return ctx.prisma.user.findMany({
        take: pagination.take,
        skip: pagination.skip,
        cursor: { cursor: pagination.cursor },
        where: {
          OR: [{ name: { contains: text } }, { email: { contains: text } }],
          AND: [{ role: { equals: role } }],
        },
        orderBy: {
          cursor: "asc",
        },
      });
    }),
  promoteUser: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: input.id },
        data: { role: "admin" },
      });
      return user;
    }),
  demoteUser: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: input.id },
        data: { role: "user" },
      });
      return user;
    }),
});
