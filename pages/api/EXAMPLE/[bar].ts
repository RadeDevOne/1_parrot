import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  // WE CAN NOW TAKE QUERYSTRING FROM     req.query
  const { bar } = req.query;

  await prisma.review.create({
    data: {
      comment: "",
      rating: 2,
      productId: "",
      profileId: "",
    },
  });

  // console.log({ KVERI: req.query });

  return res.status(200).json({ baz: `hello 666 ${bar}` });
});

export default handler;
