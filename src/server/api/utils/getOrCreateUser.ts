import { prisma } from "../../db";

export const getOrCreateUser = async (publicKey: string) => {
  const user = await prisma.client.findUnique({
    where: {
      public_key: publicKey,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    const user = await prisma.client.create({
      data: {
        public_key: publicKey,
      },
      select: {
        id: true,
      },
    });
    return user.id;
  }

  return user.id;
};
