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

  // console.log({ favorite });

  /* const cookies = req.cookies;

  console.log({ cookies });

  const cartAndKeys = parseCartFromCookie(cookies);

  console.log({ cartAndKeys });

  if (cartAndKeys) {
    const { cart, keys } = cartAndKeys;
    console.log(cart[keys[0]].id);
  }

  return res.status(200).send("hello 666"); */
});

export default handler;
