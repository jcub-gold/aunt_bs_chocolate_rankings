import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black px-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
        Aunt B&apos;s 2025 Holiday Chocolate Ratings 🍫🎄
      </h1>

      <Image
        src="/chocolates/milk_double_hazelnut_crunch.jpg"   // 👈 replace with your actual image path
        alt="Aunt B"
        width={400}
        height={400}
        className="rounded-lg shadow-lg"
        priority
      />
    </main>
  );
}