import buildDynamicRoute from "./util/buildDynamicRoute";
import apiClient from "./apiClient";
import type {
  /* NextApiHandler, */ NextApiRequest,
  NextApiResponse,
} from "next";

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => any | void;

/**
 *
 * @param bracketedPath "/foo/[bar]/foo" or "/foo/[bar]"
 */
export const buildDynamicClient = (
  bracketedPath: string,
  handler: HandlerType
) => {
  /**
   * * @param pathItem string to be passed as [bar]
   */
  return (pathItem: string) => {
    // return apiClient(handler, )
  };
};

export const buildStaticClient = () => {
  //
  //
};
