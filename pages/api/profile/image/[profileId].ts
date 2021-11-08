import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

// import type { Product, Favorite } from "@prisma/client";

import prisma from "@/lib/prisma";
import type { Profile } from "@prisma/client";
// import { getSession } from "next-auth/react";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

// import validateProfileBody from "@/middlewares/validateProfileBody";

import validateProfileId from "@/middlewares/validateProfileId";

import type { ProfileDataType } from "@/lib/validations/profileSchema";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface ResData {
  updatedProfile: Profile;
}

export type BodyDataTypeI = ProfileDataType;

// --------
/* const profileBodyValidation = nc<NextApiRequest, NextApiResponse>().put(
  "/api/profile/:profileId",
  validateProfileBody()
); */
// ------------------

// MIDDLEWARES
handler.use(validateProfileId);
handler.use(verifyUserMiddleware);

// THIS MIDDLEWARE IS ONLY GOING TO WORK FOR THIS ROUTE
handler.post(async (req, res) => {
  // @ts-ignore
  // const profile = req.profile as ProfileInsert;

  // console.log({ profile });

  const body = req.body;

  const data = req.body as ProfileDataType;

  const { profileId } = req.query;

  console.log({ profileId, body });

  if (typeof profileId === "object") {
    return res
      .status(500)
      .send(
        "profile id is in wrong format (possibly you have unnecessary `/` in product id )"
      );
  }

  return res.status(200).json({ data: "my boy fandiolo", body });
});

export default handler;
