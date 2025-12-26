"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

type RankedChocolate = {
  id: number;
};

export async function saveRanking(ranked: RankedChocolate[]) {
  const { userId } = await auth();
  if (!userId) return;

  // ✅ Ensure user exists
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId },
  });

  // Remove existing rankings
  await prisma.ranking.deleteMany({
    where: { userId },
  });

  // Convert order → points
  const total = ranked.length;

  await prisma.ranking.createMany({
    data: ranked.map((c, index) => ({
      userId,
      chocolateId: c.id,
      points: total - index,
    })),
  });
}