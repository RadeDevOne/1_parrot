import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

import { getSession } from "next-auth/react";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

const handler = nc<NextApiRequest, NextApiResponse>();

// handler.use(verifyUserMiddleware);

handler.get(async (req, res) => {
  const { productId } = req.query;

  res.status(200).json({ productId });

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
