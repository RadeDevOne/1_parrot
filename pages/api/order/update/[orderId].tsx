import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import type { Order, OrderStatus } from "@prisma/client";
// import { getSession } from "next-auth/react";

import type { CartType } from "@/lib/storage";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";
import validateProfileId from "@/middlewares/validateProfileId";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface BodyDataI {
  status?: OrderStatus;
  taxPrice?: string;
  shippingPrice?: string;
  paymentMethod?: string;
  paymentResultId?: string;
  payedAt?: Date;
  deliveredAt?: Date;
}

export interface ResData {
  orderId: string;
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
handler.use(validateProfileId);

// CREATING ORDER

handler /* .use(profileBodyValidation) */
  .put(async (req, res) => {
    // @ts-ignore
    const profile = req.profile as ProfileInsert; // verifyUserMiddleware INSERS THIS
    // console.log({ profile });

    // REDIRECT TO SIGNIN IF THERE IS NO PROFILE
    if (!profile) {
      res.writeHead(302, {
        Location: "/signin",
      });

      return res.status(500).end();
    }
    //
    //
    // -----------------------------------
    //

    const { orderId } = req.query;

    if (typeof orderId === "object") {
      return res
        .status(500)
        .send(
          "orderId is in wrong format (possibly you have unnecessary `/` in order id )"
        );
    }

    //
    // WE CAN PARSE BODY AND UPDATE ORDER

    const body = req.body as BodyDataI;

    if (!body) {
      return res.status(400).send("Body is missing");
    }

    if (Object.keys(body).length === 0) {
      return res.status(400).send("Body has no properties on it");
    }
    //
    console.log({ body });

    // HERE WE CAN UPDATE ORDER
    /* const order = await prisma.order.create({
      data: {
        buyer: {
          connect: { id: profile.id },
        },
      },
    }); */

    // WE WILL SEND ORDER ID
    return res.status(200).json(body);
  });

export default handler;
