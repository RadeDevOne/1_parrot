// I CREATED THIS DECLARATION BECAUSE
// BY USING CALLBACKS AND EVENTS IN HERE: pages/api/auth/[...nextauth].ts
// I MENAGED TO DEFINE THE EXTENDING OF session OBJECT
// I INJECTED MORE TUFF
import type { Session as Ses } from "next-auth";
import type { Profile } from "@prisma/client";

interface SessStuff {
  expires?: Ses["expires"];
  user?: Ses["user"];
  profile?: Profile;
  userId?: string;
}

type SesForUseSess =
  | {
      data: SessionStuff;
      status: "authenticated";
    }
  | {
      data: null;
      status: "unauthenticated" | "loading";
    }
  | {
      data: SessionStuff;
      status: "authenticated";
    }
  | {
      data: null;
      status: "loading";
    };

declare module "next-auth/react" {
  function useSession(): SesForUseSess;
  function getSession(
    options?: GetSessionOptions | undefined
  ): Promise<SessStuff | null>;
}
