// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";

import rClient from "@/lib/redis";

type Data = {
  stuff: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await rClient.set("songzy", "something");

  const stuff = await rClient.get("songzy");

  const session = await getSession({ req });

  session?.expires;
  session?.profile;
  session?.user;
  session?.userId;

  res.status(200).json({ stuff });
}
