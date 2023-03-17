import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { getOrCreateUser } from "../../utils/getOrCreateUser";

export const createProject = publicProcedure
  .input(
    z.object({
      publicKey: z.string(),
      data: z.object({
        name: z.string(),
        description: z.string(),
        contact: z.string(),
        package: z.enum(["STARTER", "MAIN", "MEGA"]),
        transaction: z.string(),
      }),
    })
  )
  .mutation(async ({ input, ctx: { prisma } }) => {
    const user = await getOrCreateUser(input.publicKey);

    await prisma.project.create({
      data: {
        clientId: user,
        name: input.data.name,
        description: input.data.description,
        contact: input.data.contact,
        package: input.data.package,
        transaction: input.data.transaction,
      },
    });
  });
