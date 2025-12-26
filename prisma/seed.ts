import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const chocolates = [
    {
      name: "Black Coffee (Dark)",
      imageUrl: "/chocolates/dark_black_coffee.jpg",
    },
    {
      name: "Coconut Caramel (Dark)",
      imageUrl: "/chocolates/dark_coconut_caramel.jpg",
    },
    {
      name: "Double Hazelnut Crunch (Dark)",
      imageUrl: "/chocolates/dark_double_hazelnut_crunch.jpg",
    },
    {
      name: "Fennel Pollen Caramel (Dark)",
      imageUrl: "/chocolates/dark_fennnel_pollen_caramel.jpg",
    },
    {
      name: "German Chocolate (Dark)",
      imageUrl: "/chocolates/dark_geman_chocolate.jpg",
    },
    {
      name: "Hazelnut Butter (Dark)",
      imageUrl: "/chocolates/dark_hazelnut_butter.jpg",
    },
    {
      name: "Peppermint Stick (Dark)",
      imageUrl: "/chocolates/dark_peppermint_stick.jpg",
    },
    {
      name: "Pralined Hazelnuts and Salted Vanilla Caramel (Dark)",
      imageUrl: "/chocolates/dark_pralined_hazelnuts_and_salted_vanilla_caramel.jpg",
    },
    {
      name: "Turtle (Dark)",
      imageUrl: "/chocolates/dark_turtle.jpg",
    },
    {
      name: "Double Hazelnut Crunch (Milk)",
      imageUrl: "/chocolates/milk_double_hazelnut_crunch.jpg",
    },
    {
      name: "German Chocolate (Milk)",
      imageUrl: "/chocolates/milk_german_chocolate.jpg",
    },
    {
      name: "Mocha (Milk)",
      imageUrl: "/chocolates/milk_mocha.jpg",
    },
    {
      name: "Salted Vanilla Caramel (Milk)",
      imageUrl: "/chocolates/milk_salted_vanilla_caramel.jpg",
    },
    {
      name: "Turtle (Milk)",
      imageUrl: "/chocolates/milk_turtle.jpg",
    },
    {
      name: "Mocha Moons (White)",
      imageUrl: "/chocolates/white_mocha_moons.jpg",
    },
    {
      name: "Prassian Fruit Ganache (White)",
      imageUrl: "/chocolates/white_passion_fruit_ganache.jpg",
    },
  ];

  for (const chocolate of chocolates) {
    await prisma.chocolate.upsert({
      where: { name: chocolate.name },
      update: {},
      create: chocolate,
    });
  }
}

main()
  .then(() => {
    console.log("🍫 Chocolates seeded");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });