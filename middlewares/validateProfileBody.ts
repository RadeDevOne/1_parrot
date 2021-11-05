import type { Middleware } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import profileSchema from "@/lib/validations/profileSchema";

import { getSession } from "next-auth/react";

import prisma from "@/lib/prisma";

const validateProfileBody: () => Middleware<NextApiRequest, NextApiResponse> =
  () => async (req, res, next) => {
    //
    //
    //
    // IF WE ARE NOT HAVING ANY FIELD IN OUR BODY LETS THROW

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send("You must provide at least one field");
    }

    try {
      await profileSchema.validate(req.body);

      return next();
    } catch (err) {
      console.error(err);

      // @ts-ignore
      return res.status(500).send(err.message);
    }
  };

export default validateProfileBody;

/* 

const verifyUser:  = async (
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
 */
