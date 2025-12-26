"use client";

import { useState } from "react";
import { saveRanking } from "./actions";

type Chocolate = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function RankClient({
  chocolates,
  initialRanked,
}: {
  chocolates: Chocolate[];
  initialRanked: Chocolate[];
}) {
  const [ranked, setRanked] = useState<Chocolate[]>(initialRanked);

  const [unranked, setUnranked] = useState<Chocolate[]>(
    chocolates.filter(
      (c) => !initialRanked.some((r) => r.id === c.id)
    )
  );
  const [adding, setAdding] = useState(false);

  const [inserting, setInserting] = useState<Chocolate | null>(null);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [mid, setMid] = useState<number | null>(null);

  function handleChoice(preferInserting: boolean) {
    if (mid === null || inserting === null) return;

    const newLow = preferInserting ? low : mid + 1;
    const newHigh = preferInserting ? mid : high;

    if (newLow >= newHigh) {
      const updated = [...ranked];
      updated.splice(newLow, 0, inserting);

      setRanked(updated);
      setUnranked(unranked.filter((c) => c.id !== inserting.id));
      setInserting(null);
      setAdding(false);
      setMid(null);

      // 🔹 autosave
      saveRanking(updated);
      return;
    }

    setLow(newLow);
    setHigh(newHigh);
    setMid(Math.floor((newLow + newHigh) / 2));
  }

  // 🔹 COMPARISON MODE
  if (inserting && mid !== null) {
    const opponent = ranked[mid];

    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Which do you prefer?
        </h2>

        <div className="flex gap-8">
          <button
            className="border p-4 rounded w-64"
            onClick={() => handleChoice(true)}
          >
            <img src={inserting.imageUrl} className="mb-2" />
            {inserting.name}
          </button>

          <button
            className="border p-4 rounded w-64"
            onClick={() => handleChoice(false)}
          >
            <img src={opponent.imageUrl} className="mb-2" />
            {opponent.name}
          </button>
        </div>
      </div>
    );
  }

  // 🔹 NORMAL LEADERBOARD MODE
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Leaderboard</h2>

        {ranked.length === 0 ? (
          <p className="text-gray-500">
            You haven’t ranked any chocolates yet.
          </p>
        ) : (
          <ol className="list-decimal list-inside space-y-1">
            {ranked.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ol>
        )}
      </section>

      <section>
        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Add a chocolate
          </button>
        ) : (
          <div>
            <h3 className="font-medium mb-2">
              Choose a chocolate to rank
            </h3>

            <ul className="space-y-1">
              {unranked.map((c) => (
                <li key={c.id}>
                  <button
                    className="underline"
                    onClick={() => {
                      if (ranked.length === 0) {
                        const updated = [c];

                        setRanked(updated);
                        setUnranked(unranked.filter((x) => x.id !== c.id));
                        setAdding(false);

                        // 🔹 autosave FIRST ranking
                        saveRanking(updated);
                      } else {
                        setInserting(c);
                        setLow(0);
                        setHigh(ranked.length);
                        setMid(Math.floor(ranked.length / 2));
                      }
                    }}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}