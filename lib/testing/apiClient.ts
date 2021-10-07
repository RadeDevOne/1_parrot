import { createServer } from "http";
import type { IncomingMessage, ServerResponse } from "http";
import { apiResolver } from "next/dist/server/api-utils";
import type {
  /* NextApiHandler, */ NextApiRequest,
  NextApiResponse,
} from "next";
import supertest from "supertest";

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => any | void;

/**
 *
 * @param handler Your handler you created with next-connect
 * @param queryParameter string (optional (you don't need it for non-dynamic routes))
 * @returns client you can use to test result of your request
 * @description !!!! IMPORTANT !!!! For dynamic routes you must
 * do like this
 * `
 *  await tetstClient(handler, queryParameter)
 *      this is important
 *                         .get(`/api/some/${queryParameter}`)
 *
 *        SO YOU NEED TO PASS PARAMETER ON TWO DIFFERENT PLACES
 *
 * `
 */
const testClient = (handler: HandlerType, queryParameter?: string) => {
  const serverRequestListener = async (
    req: IncomingMessage,
    res: ServerResponse
  ) => {
    // console.log({ REQUEST: req });

    // eslint-disable-next-line
    // @ts-ignore
    return apiResolver(
      req,
      res,
      queryParameter,
      handler,
      // eslint-disable-next-line
      // @ts-ignore
      {},
      /* {previewModeEncryptionKey: "", previewModeId: "", previewModeSigningKey: ""} */
      undefined
    );
  };

  const server = createServer(serverRequestListener);

  return supertest(server);
};

export default testClient;
