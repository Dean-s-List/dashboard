import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { publicProcedure } from "../../trpc";

export const getProjects = publicProcedure
  .input(z.object({ publicKey: z.string() }))
  .mutation(async ({ input, ctx: { prisma } }) => {
    const client = await prisma.client.findUnique({
      where: {
        public_key: input.publicKey,
      },
      select: {
        projects: {
          select: {
            name: true,
            package: true,
            status: true,
          },
        },
      },
    });

    if (!client) {
      console.log(1);
      await prisma.client.create({
        data: {
          public_key: input.publicKey,
        },
      });

      return {
        projects: [],
      };
    }

    return client;
  });
