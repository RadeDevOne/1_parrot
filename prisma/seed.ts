import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  // I ADDED THIS
  await prisma.paymentResult.create({
    data: {
      paymentId: "666",
      paymentProvider: "PayPal",
    },
  });

  console.log("SEEDING IN HERE");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
