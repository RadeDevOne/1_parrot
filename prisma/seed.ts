// # THIS FILE IS ALSO GOING TO BE RUN IF YOU DO MIGRATES

import { PrismaClient } from "@prisma/client";
//
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  // WE CAN CREATE BUNCH OF USERS AND BUNCH OF PROFILES
  // WE CAN CREATE ON SUPERADMIN PROFILE
  // CREATE COUPLE OF ADMIN USERS (I DON'T THINK WE WOULD NEED THEM BUT LETS TRY DOING THAT)
  // WE CAN CREATE BUNCH OF PRODUCTS
  // AND CREATE COUPLE OF REVIEWS FOR EACH PRODUCT (WE CAN RANDOMIZE NUMBER OF REVIEWS)
  //
  // CREATING ONE SUPERADMIN
  await prisma.profile.create({
    data: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });