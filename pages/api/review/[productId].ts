import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import type { Profile } from "@prisma/client";
// import { getSession } from "next-auth/react";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

// import validateProfileId from "@/middlewares/validateProfileId";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface ResData {
  some: boolean;
}

export type BodyDataTypeI = { some: boolean };

// --------
/* const profileBodyValidation = nc<NextApiRequest, NextApiResponse>().put(
  "/api/profile/:profileId",
  validateProfileBody()
); */
// ------------------

// MIDDLEWARES
// handler.use(validateProfileId);
handler.use(verifyUserMiddleware);

handler./* use(profileBodyValidation). */ post(async (req, res) => {
  // @ts-ignore
  const profile = req.profile as ProfileInsert;

  // console.log({ profile });

  const data = req.body; /* as  */

  const { productId } = req.query;

  if (typeof productId === "object") {
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

  // return res.status(200).json({  });
});

export default handler;
