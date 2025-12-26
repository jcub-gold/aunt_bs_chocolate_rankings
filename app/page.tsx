"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-100 to-white dark:from-black dark:to-zinc-900 px-6">
      
      {/* Ambient background glows */}
      <div className="absolute -top-32 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl dark:bg-pink-500/20" />
      <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-500/20" />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-5xl font-extrabold text-center mb-6 tracking-tight text-black dark:text-white"
      >
        Aunt B&apos;s 2025 Holiday
        <br />
        Chocolate Ratings 🍫🎄🕎
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 mb-10 max-w-md text-center text-lg text-zinc-600 dark:text-zinc-400"
      >
        Rank your favorites and see what everyone loves most.
      </motion.p>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 rounded-2xl bg-white/80 dark:bg-zinc-900/80 p-4 shadow-2xl backdrop-blur"
      >
        <Image
          src="/chocolates/milk_double_hazelnut_crunch.jpg"
          alt="Holiday Chocolate"
          width={360}
          height={360}
          className="rounded-xl"
          priority
        />
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="relative z-10 mt-10 flex gap-4"
      >
        <Link href="/rank">
          <Button size="lg" className="rounded-full">
            Start Ranking
          </Button>
        </Link>

        <Link href="/leaderboard">
          <Button size="lg" variant="outline" className="rounded-full">
            View Leaderboard
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}