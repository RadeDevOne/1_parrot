# TESTING: USING `supertest`

I FOUND THIS [HELPFUL SOLUTION](https://github.com/KennFatt/nextjs-api-routes-testing) (ALL THE CREDITS GOES TO THAT PERSON; I ONLY BUILT UPON THAT)

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

/**
 *
 * @param handler Your handler you created with next-connect
 * @param queryParameterName dynamic part of the route (optional (omit this for static paths))
 * @param queryParameterNameValue value dynamic part of the route (optional (omit this for static paths))
 * @returns client you can use to test result of your request
 * @description !!!! IMPORTANT !!!! For dynamic routes you must
 * do like this
 * `
 *  await tetstClient(handler, queryParameterName, queryParameterValue)
 *      this is important
 *                         .get(`/api/some/${queryPatrameterValue}`)
 *
 *        SO YOU NEED TO PASS PARAMETER ON TWO DIFFERENT PLACES
 *        WHEN WE CREATE CLIENT AND WE USE get post put delete
 *        AND SIMILAR
 * `
 */
const testClient = (
  handler: HandlerType,
  queryParamName?: string,
  queryParamNameValue?: string
) => {
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
      queryParamName && queryParamNameValue
        ? { [queryParamName]: queryParamNameValue }
        : undefined,
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

THIS DOESN'T LOOK SO NICE, BUT LETS TRY IT OUT

# LETS BUILD STATIC API ROUTE WE WANT TO TEST

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

OK WE CAN NOW TRY TESTING DYNAMIC ROUTE

# I WANT TO TRY TEST WITH DYNAMIC ROUTE, WHICH WILL BE A BIT TEDIOUS BECAUSE YOU NEED TO PASS QUERY PARAMETER WHEN YOU CREATE apiClient (A LITTLE BIT HARD TO REMEBER) AND WHEN YOU PASS ROUTE STRING INSIDE `.get()` OR `post()` OR SOMETHING ELSE

FOR EXAMBLE WE CAN TEST `api/EXAMPLE/[barId].ts`

`pages/api/EXAMPLE/[bar].ts`

```ts
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  // SE WE HAVE HERE A     req.query
  const { bar } = req.query;

  return res.status(200).json({ baz: `hello 666 ${bar}` });
});

export default handler;

```

HERE IS THE TEST

`__test__/api/EXAMPLE/bar.test.ts`

```ts
import apiClient from "../../../lib/testing/apiClient";
import handler from "../../../pages/api/EXAMPLE/[bar]";

describe("We are testing dynamic route /api/EXAMPLE/[bar]", () => {
  it("returns 200 if everything is ok", async () => {
    // THIS IS A BIT PROBLEMATIC TO MEMORIZE
    // WE USE THIS VARIABLE HERE
    const queryParameterValue = "bologna";

    // SO WE CAN PASS IT HERE
    const result = await apiClient(handler, "bar", queryParameterValue).get(
      // AND ALSO SO WE CAN PASS IT HERE
      `/api/EXAMPLE/${queryParameterValue}`
    );

    // console.log(result);

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("baz");

    expect(result.body.baz).toEqual("hello 666 bologna");
  });
});
```

TEST PASS HERE, BUT I DON'T LIKE HOW WE USE THIS, IT SHOULD LOOK SIMPLER, WE SHOULD ONLY PASS THINGS ONCE

SO LETS BUILD HELPERS

# SO IT IS BETTER TO BUILD HELPERS AND REFACTOR TESTS TO USE HELPERS

**YOU NEED TO KEEP IN MIND THAT SOMETIMES FOLDERS CAN BE DYNAMIC PART OF THE ROUTE IN NEXTJS**

SO I BUILT SOME UTILITY FUNCTIONS FOR THAT PURPOSE

BUT AT THE END I UILD CLIENT FOR DYNAMIC ROUTES OF NEXTJS API

AT THE END I MANGED THAT CLIENT FOR DYNAMIC ROUTES IS USED LIKE THIS

JUST LOOK AT THE TEST

```
code __test__/api/EXAMPLE/bar.test.ts
```

```ts
// INSREAD OF THIS WE USED EARLIER
// import { testClient } from "../../../lib/testing/apiClient";
// WE USE THIS
import { buildDynamicClient } from "../../../lib/testing/buildDynamicApiClient";

import handler from "../../../pages/api/EXAMPLE/[bar]";

describe("We are testing dynamic route /api/EXAMPLE/[bar]", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameterValue = "bologna";

    // INSTEAD OF THIS
    /* const result = await testClient(handler, "bar", queryParameterValue).get(
      `/api/EXAMPLE/${queryParameterValue}`
    ); */

    // WE BUILT A CLIENT WITH ROUTE ORIGINAL NAME (WITH [])
    // AND WITH handler
    const client = buildDynamicClient("/api/EXAMPLE/[bar]", handler);

    // WE MAKE THE REQUEST, AND YOU PASS A METHONG TOO
    const result = await client(queryParameterValue, "get");

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("baz");

    expect(result.body.baz).toEqual("hello 666 bologna");
  });
});
```

TEST HAVE PASSED, SO THIS IS OK APPROACH I THINK

HERE IS HOW TO TEST WHILE SENDING BODY, IN CASE OF POST REQUEST

```ts
import { buildDynamicClient } from "../../../../lib/testing/buildDynamicApiClient";

import handler from "../../../../pages/api/EXAMPLE/[foo]/baz";

describe("We are testing dynamic route /api/EXAMPLE/[foo]/baz", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameterValue = "bologna";

    const client = buildDynamicClient("/api/EXAMPLE/[foo]/bar", handler);
    // YOU MUST PASS A Record AS A BODY (STRINGS ARE "ACTING OUT")
    const result = await client(queryParameterValue, "post", { a: "data" });

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("baz");

    expect(result.body.baz).toEqual("hello 666 bologna");
  });
});
```

THIS IS HOW I SET UP COOKIES, WHILE TESTING

```ts
import { buildDynamicClient } from "../../../../lib/testing/buildDynamicApiClient";

import handler from "../../../../pages/api/EXAMPLE/[foo]/baz";

describe("We are testing dynamic route /api/EXAMPLE/[foo]/baz", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameterValue = "bologna";

    const client = buildDynamicClient("/api/EXAMPLE/[foo]/bar", handler);

    const result = await client(
      queryParameterValue,
      "post",
      { a: "data" },
      // HEADERS ARE THIRD ARGUMENT
      { "content-type": "application/json", cookie: "cookie stuff" }
    );

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();
    expect(result.body).toHaveProperty("baz");

    expect(result.body.baz).toEqual("hello 666 bologna");
  });
});
```

# MAYBE MY SOLUTION ISN'T THAT GOOD BECAUSE OF SMALL NUMBER OF OPTIONS YOU CAN SET

I DON'T SEE CAS WHERE I WPOULD USE ANY OTHER OPTIONS (**I MEAN SETTING SOMETHING ELSE BESIDES BODY OR A COOKIE**)

***

YOU CAN ALWAYS USE ONLY `lib/testing/apiClient.ts` IF YOU WANT TO SET MORE OPTIONS

***

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
