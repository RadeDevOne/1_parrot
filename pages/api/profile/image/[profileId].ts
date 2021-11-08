import nc from "next-connect";
import type { Middleware } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

// import type { Product, Favorite } from "@prisma/client";

import prisma from "@/lib/prisma";

import multer from "multer";

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

const ALLOWED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

// IN MEMORY STORAGE FOR IMAGES
const storage = multer.memoryStorage();

//
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      // IF MIME TYPE IS OK
      cb(null, true);
    } else {
      cb(new Error("Wrong mime type for the file!"));
    }
  },
});

const singleUpload = upload.single("image");

//
const singleUploadMiddleware: Middleware<NextApiRequest, NextApiResponse> = (
  req,
  res,
  next
) => {
  // @ts-ignore
  singleUpload(req, res, (err) => {
    if (err) {
      return res
        .status(422)
        .send({ message: "Failed to process the image file!" });
    }

    next();
  });
};

//

// --------
/* const profileBodyValidation = nc<NextApiRequest, NextApiResponse>().put(
  "/api/profile/:profileId",
  validateProfileBody()
); */
// ------------------

const imageFileValidation = nc<NextApiRequest, NextApiResponse>().post(
  "/api/profile/image/:profileId"
);

// MIDDLEWARES
handler.use(validateProfileId);
handler.use(verifyUserMiddleware);

// THIS MIDDLEWARE IS ONLY GOING TO WORK FOR THIS ROUTE
handler.use(imageFileValidation).post(async (req, res) => {
  // @ts-ignore
  // const profile = req.profile as ProfileInsert;

  // console.log({ profile });

  // BECAUSE OF MIDDLEWARE WE SHOUD HAVE req.file

  const file = req.file as File;

  console.log({ file });

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
