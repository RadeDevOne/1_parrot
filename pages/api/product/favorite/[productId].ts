import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

// import { getSession } from "next-auth/react";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

const handler = nc<NextApiRequest, NextApiResponse>();

// MIDDLEWARES
// AUTHENTICATION MIDDLEWARE
handler.use(verifyUserMiddleware);

// JUST TO KNOW (THIS SHOULD BE POST BECAUSE WE ARE TRYING TO CREATE NEW RECORD)
// IN THE TERMS OF GETTING RECORD :
// (WE ARE GOING TO GET RECORD IN GET SERVER SIDE PROPS)
// AGAIN, ONLY SIGNED IN USER SHOULD SEE THE HEART BUTTON

handler.get(async (req, res) => {
  // IF EVERYTHING WENT WELL WITH AUTHENTICATION PROFILE SHOUD BE ON REQUEST
  // @ts-ignore
  const profile = req.profile as ProfileInsert;

  const { productId } = req.query;

  if (typeof productId === "object") {
    return res
      .status(500)
      .send(
        "product id is in wrong format (possibly you have unnecessary `/` in product id )"
      );
  }

  // FIRST WE NEED TO CHECK IF USER ALREADY ADDED PRODUCT TO THE FAVORITES

  const existingFavorite = await prisma.favorite.findFirst({
    where: {
      productId,
      profileId: profile.id,
    },
    select: {
      id: true,
    },
  });

  if (existingFavorite) {
    return res.status(400).send("Product already added to favorites!");
  }

  // WE CREATE FAVORITE HERE
  const favorite = await prisma.favorite.create({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      profile: {
        connect: {
          id: profile.id,
        },
      },
    },
  });

  res.status(200).json({ favorite });
});

export default handler;
