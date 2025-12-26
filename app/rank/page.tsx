import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RankClient from "./RankClient";

export const dynamic = "force-dynamic";

export default async function RankPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // 1️⃣ Fetch all chocolates
  const chocolates = await prisma.chocolate.findMany({
    orderBy: { name: "asc" },
  });

  // 2️⃣ Fetch this user's saved rankings
  const savedRankings = await prisma.ranking.findMany({
    where: { userId },
    include: { chocolate: true },
    orderBy: { points: "desc" },
  });

  // 3️⃣ Extract ordered chocolates
  const initialRanked = savedRankings.map((r) => r.chocolate);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Rankings 🍫</h1>

      <RankClient
        chocolates={chocolates}
        initialRanked={initialRanked}
      />
    </main>
  );
}