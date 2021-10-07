import { createServer } from "http";
import type { IncomingMessage, ServerResponse } from "http";
import { apiResolver } from "next/dist/server/api-utils";
import type { NextApiHandler } from "next";
import supertest from "supertest";

const testClient = (handler: NextApiHandler) => {
  const serverRequestListener = async (
    req: IncomingMessage,
    res: ServerResponse
  ) => {
    // eslint-disable-next-line
    // @ts-ignore
    return apiResolver(
      req,
      res,
      undefined,
      handler,
      // eslint-disable-next-line
      // @ts-ignore
      {},
      /* {previewModeEncryptionKey: "", previewModeId: "", previewModeSigningKey: ""} */ undefined
    );
  };

  const server = createServer(serverRequestListener);

  return supertest(server);
};

export default testClient;
