# TESTING: USING `supertest`

I FOUND THIS [HELPFUL SOLUTION](https://github.com/KennFatt/nextjs-api-routes-testing) (ALL THE CREDITS GOES TO THAT PERSON)

WE ARE GOING TO USE supertest

```
yarn add supertest @types/supertest --dev
```

WE ARE ALREADY USING `next-connect` SO WE DON'T NEED TO INSTALL THIS; SAME GOES FOR `jest` AND `@types/jest`, WE ALREDY HAVE THEM TOO 

# WE NEED TO ALTER OUR BABEL CONFIGURATION A LITTLE BIT, AND THIS IS JUST FOR TEST ENVIRONMENT

```
code .babelrc.js
```

```js
module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      },
      ,
    ],
  ],
  plugins: ["@emotion/babel-plugin", "babel-plugin-macros", "superjson-next"],
  // I ADDED THIS----------------
  env: {
    test: {
      presets: [
        [
          "next/babel",
          {
            "preset-env": {
              modules: "commonjs",
            },
          },
        ],
      ],
    },
  },
};

```

# NOW WE WILL CREATE OUR TESTING UTILITY, THAT USES `supertest` AND SOME OTHER THINGS 

```
mkdir lib/testing && touch lib/testing/apiClient.ts
```

WE WILL TRY MOCKING req AND res

```ts
import { createServer } from "http";
import type { IncomingMessage, ServerResponse } from "http";
import { apiResolver } from "next/dist/server/api-utils";
import type {
  /* NextApiHandler, */ NextApiRequest,
  NextApiResponse,
} from "next";
import supertest from "supertest";

type HandlerType = (req: NextApiRequest, res: NextApiResponse) => any | void;

const testClient = (handler: HandlerType) => {
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
      /* {previewModeEncryptionKey: "", previewModeId: "", previewModeSigningKey: ""} */
      undefined
    );
  };

  const server = createServer(serverRequestListener);

  return supertest(server);
};

export default testClient;
```

# LETS BUILD API ROUTE WE WANT TO TEST

```
touch pages/api/foo.ts
```

```ts
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  return res.status(200).send("hello 666");
});

export default handler;
```

# LETS WRITE TEST FOR API ROUTE WE MADE

```
mkdir -p __test__/api && touch __test__/api/foo.test.ts
```

```ts
import apiClient from "../../lib/testing/apiClient";
import handler from "../../pages/api/foo";

describe("Testing GET for /api/foo", () => {
  it("returns 200 if everything is right", async () => {
    const result = await apiClient(handler).get("/api/foo");

    expect(result.status).toEqual(200);

    expect(result.text).toEqual("hello 666");
  });
});
```

## WE CAN RUN TEST

```
yarn test
```

TEST DID PASS

# I WANT TO TRY TEST WITH DYNAMIC ROUTE

FOR EXAMBLE WE CAN TEST `[bar].ts`








<!-- ## STYLING

USING TAILWIND TOGETHER WITH EMOTION (**TWIN MACRO BY ben-rogerson**)

twin.macro with emotion (explained)

<https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion>


typescript emotion example (very nice, has more stuff) (maybe is missing something but it is a good starter to build upon):

<https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion-typescript>

**THESE ARE THE DOCS FOR TWIN MACRO**

<https://github.com/ben-rogerson/twin.macro/tree/master/docs>

**MUST READ**: (UNDER RESOURCS)

<https://github.com/ben-rogerson/twin.macro#resources>

MOST IMPORTAT THING (AT LEAST FOR ME): USE `css={[tw``]}` FOR DYNAMIC STYLES, AND USE `tw=""` OTHERVISE

## ANIMATIONS AND TRANSITIONS

FRAMER MOTION (SOMETIMES I DON'T LIKE HOW IT WORKS BECAUSE IT TENDS TO RANDOMLY SETS display PROPERTY) (IF YOU ARE ANIMATING SIZES)

## COLOR MODE

next-themes

# STATE MANGEMENT

xstate @xstate/react

# AUTHENTICATION

next-auth

# DATABASES

PRODUCTION: `PostgreSQL 13.3` ON `Supabase`

DEVELOPMENT: `PostgreSQL 13.3` SPINNED UP WITH DOCKER

ORM: Prisma

Redis 5.0.8:

PRODUCTION: `Upstash`

DEVELOPMENT: `Another Docker Container`

# EXPIRATION SERVICE, MAYBE ALSO, "SPECIAL CART SERVICE"

USING `BullMQ`


 -->

 <!-- 

## IDEAS

`WE SHOULD BUILD ECHO API (LIKE A STREAMING SERVER BUT MANUAL)`

WE SHOULD PUT CART IN A DETABSE, INSTEAD OF LOCAL STORAGE (BECAUSE IF WE USE THIS SERVER SIDE WE CAN EXPIRE CART, WE CAN DESTROY CART OBJECT)

MAYBE CART SHOULD BE KEPT IN REDIS, AND EXPIRE AFTER 3 HOURS IF LEFT TO BE STALE

WE NEED A STEP TO CHECK IF MAYBE SOMEONE BOUGHT SOMETHING AND STUFF IN CART IS MISSING (WHEN THAT HAPPENS USER SHOULD BE GIVEN THE INFO THAT "SOMEONE BOUGHT PRODUCT AS HE WAS FILLING CART", HE SHOULDN'T HAV ANY OPTIONS TO DO, JUST INFO AND WE LOWER HIS PRODUCT COUNT, OR IF THERE IS NONE WE REMOVE THE PRODUCT)
(LOW COUNT PRODUCTS SHOULD BE MARKED AS `HOT` OR WE SHOULD HAVE INFO: "HURRY UP, ONLY 10 LEFT IN STOCK") 

ORDER MARKED AS EXPIRED

CHECKING STOCK

CHECKING STOCK EVERY TIME USERS ADD TO CART

WHEN SEEDING YOU SHOULD SHOW ONE PRODUCT NOT IN STOCK AND THEN ONE PRODUCT IN STOCK AND SO ON AND SO ON (FOR EASIER DEVELOPMENT)


ADD TWO SCRIPTS FOR STARTING DEV DATBASES

AND OTHER FOR KILLING DATBASES, BECAUSE WE CAN KILL CONTAINER BY NAME, NOT JUST BY HIS ID 

FOR IMAGE UPLOAD USE CLOUDINARY


IMPLEMENT FAVORITE PRODUCTS OR WISHLIST 


 -->
