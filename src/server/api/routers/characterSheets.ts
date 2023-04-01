import { z } from "zod";
import { SkillName, Approach } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const normalise = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const approaches = z.object({
  heroic: z.string().transform(normalise),
  expert: z.string().transform(normalise),
  patient: z.string().transform(normalise),
  brilliant: z.string().transform(normalise),
  influential: z.string().transform(normalise),
});

const aspects = z.object({
  concept: z.string().transform(normalise),
  trouble: z.string().transform(normalise),
  profession: z.string().transform(normalise),
  reputation: z.string().transform(normalise),
  loyalty: z.string().transform(normalise),
});

const skills = z.array(
  z.object({
    replaces: z.nativeEnum(SkillName),
    name: z.string().transform(normalise),
    approach: z.nativeEnum(Approach),
    talent: z.nativeEnum(Approach),
  })
);

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
        include: {
          aspects: true,
          approaches: true,
          skills: true,
        },
      });
    }),
  createConfig: protectedProcedure
    .input(
      z.object({
        campaignName: z.string().transform((str) => str.trim()),
        aspects,
        approaches,
        skills,
      })
    )
    .mutation(({ ctx, input }) => {
      const user = ctx.session.user;
      const { campaignName, approaches, aspects, skills } = input;
      return ctx.prisma.characterSheetConfig.create({
        data: {
          createdById: user.id,
          campaignName,
          aspects: {
            create: aspects,
          },
          approaches: {
            create: approaches,
          },
          skills: {
            createMany: {
              data: skills,
            },
          },
        },
      });
    }),
  updateConfig: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        campaignName: z.string().transform((str) => str.trim()),
        aspects,
        approaches,
        skills,
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, campaignName, approaches, aspects, skills } = input;
      return ctx.prisma.characterSheetConfig.update({
        where: {
          id,
        },
        data: {
          campaignName,
          aspects: {
            update: aspects,
          },
          approaches: {
            update: approaches,
          },
          skills: {
            createMany: {
              data: skills,
            },
          },
        },
      });
    }),
  deleteConfig: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.characterSheetConfig.delete({
        where: {
          id,
        },
      });
    }),
});
