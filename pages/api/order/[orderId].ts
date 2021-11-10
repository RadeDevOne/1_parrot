import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import type { Order } from "@prisma/client";
// import { getSession } from "next-auth/react";

import type { CartType } from "@/lib/storage";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface ResData {
  something: "something";
}

// todo (DONE: CartType IMPORTED)
// export type OrderDataType = someType
//

// --------
/* const profileBodyValidation = nc<NextApiRequest, NextApiResponse>().put(
  "/api/profile/:profileId",
  validateProfileBody()
); */
// ------------------

// MIDDLEWARES
handler.use(verifyUserMiddleware);

handler /* .use(profileBodyValidation) */
  .post(async (req, res) => {
    // @ts-ignore
    // const profile = req.profile as ProfileInsert; // verifyUserMiddleware INSERS THIS
    // console.log({ profile });

    const data = req.body as CartType;

    const { orderId } = req.query;

    if (typeof orderId === "object") {
      return res
        .status(500)
        .send(
          "order id is in wrong format (possibly you have unnecessary `/` in order id )"
        );
    }

    if (!data) {
      return res.status(400).send("Body is missing");
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).send("Body has no data on it");
    }
    console.log(data);

    // HERE WE CAN CREATE ORDER

    // HERE WE CAN CREATE ORDER ELEMENTS

    return res.status(200).json({ data, orderId });
    // return res.status(200).json(data);
  });

export default handler;
