import type { Middleware } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";

import prisma from "@/lib/prisma";

const verifyUser: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  const { productId } = req.query;
  //
  //
  //
  //
  next();
};

export default verifyUser;
