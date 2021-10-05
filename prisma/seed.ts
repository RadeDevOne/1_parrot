// # THIS FILE IS ALSO GOING TO BE RUN IF YOU DO MIGRATES

import { PrismaClient } from "@prisma/client";
import type { Profile, Product, Review } from "@prisma/client";
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
    data: {
      nick: "pneuma",
      role: "SUPERADMIN",
    },
  });
  // LETS NOT CREATE User RECORDS, WE ONLY NEED Profile
  // SINCE WE ONLY WANT BUNCH OF Profiles AND ALSO BUNCH OF
  // Products AND WE WANT Reviews
  // BECAUSE WE WANT TO SEE BUNCH OF PRODUCTS WHERE BUNCH OF PROFILES LEFT A REVIEW

  const generateProfilesData = () => {
    const numberOfProfiles = 20;

    const profilesData: Profile[] = [];

    for (let i = 0; i < numberOfProfiles; i++) {
      profilesData.push({
        city: "",
        country: "",
        nick: "",
        postalCode: "",
        streetAddress: "",
        role: "USER",
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: "",
      });
    }
  };

  await prisma.profile.createMany({
    data: [{}],
  });

  // FIRST WE WILL CREATE PROFILES
  // 30 SHOULD BE ENOUGH
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
