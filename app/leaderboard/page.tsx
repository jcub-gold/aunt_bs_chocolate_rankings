export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export default async function LeaderboardPage() {
  const leaderboard = await prisma.ranking.groupBy({
    by: ["chocolateId"],
    _sum: {
      points: true,
    },
    orderBy: {
      _sum: {
        points: "desc",
      },
    },
  });

  const chocolates = await prisma.chocolate.findMany({
    where: {
      id: {
        in: leaderboard.map((l) => l.chocolateId),
      },
    },
  });

  const chocolateMap = new Map(
    chocolates.map((c) => [c.id, c])
  );

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Chocolate Leaderboard 🏆
      </h1>

      <ol className="list-decimal list-inside space-y-2">
        {leaderboard.map((entry, index) => {
          const chocolate = chocolateMap.get(entry.chocolateId);
          if (!chocolate) return null;

          return (
            <li key={chocolate.id}>
              <span className="font-medium">{chocolate.name}</span>{" "}
              — {entry._sum.points} pts
            </li>
          );
        })}
      </ol>
    </main>
  );
}