import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function RankPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        My Rankings 🍫
      </h1>
    </main>
  );
}