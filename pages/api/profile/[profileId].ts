import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

// import type { Product, Favorite } from "@prisma/client";

import prisma from "@/lib/prisma";
// import { getSession } from "next-auth/react";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

export interface BodyDataI {
  name?: string;
  email?: string;
  streetAddress: string;
  city: string;
  postalCode?: string;
  country?: string;
  regionOrState?: string;
}

const handler = nc<NextApiRequest, NextApiResponse>();

// MIDDLEWARES
// AUTHENTICATION MIDDLEWARE
handler.use(verifyUserMiddleware);

handler.put(async (req, res) => {
  // @ts-ignore
  const profile = req.profile as ProfileInsert;

  // console.log({ profile });

  const data = req.body as BodyDataI;

  const { profileId } = req.query;

  if (typeof profileId === "object") {
    return res
      .status(500)
      .send(
        "profile id is in wrong format (possibly you have unnecessary `/` in product id )"
      );
  }

  if (!data) {
    return res.status(400).send("Body is missing");
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).send("Body has no data on it");
  }

  // WE SHOULD HERE VALIDATE BODY DATA

  // HERE WE CAN UPDATE PROFILE
  /* const updatedProfile = await prisma.profile.update({
    where: {
      id: profileId
    },
    data
  }) */

  return res.status(200).json({ profileId, data });
});

export default handler;
