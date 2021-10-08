# SETTING UP TEST ENVIRONMENT FOR PRISMA

***
***

IMPORTANT!

THESE ARE SOME HELPFUL REPOS TO BE AVARE OF

**BUT NOW I AM NOT GOING TO USE THEM BECAUSE THEY ARE USING REAL DATBASE WHILE TESTING (THEY ARE ALL SETTING REAL INSTANCE OF DATBASE INSIDE DOCKER CONTAINER)**

<https://github.com/ctrlplusb/prisma-pg-jest>

<https://dev.to/eddeee888/how-to-write-tests-for-prisma-with-docker-and-jest-593i>

ALSO PRISMA HAS [GOOD GUIDE ON INTEGRATION TESTING](https://www.prisma.io/docs/guides/testing/integration-testing)

I AM NOT GOING TO USE UPPER EXAMPLE BECAUSE I AM IN A HURRY

AND MOCKING Prisam CLIENT SHOULD BE ENOUGH FOR ME

**MAYBE IN THE FUTURE YOU CAN SET REAL DATABASE FOR TESTING**

IF YOU REMEBER, FOR MONGO THIS IS EASIER BECAUSE UNLIKE WITH POSTGRES, WITH MONGO YOU CAN RUN IN MEMORY MONGODB INSTANCE

***
***


PUTTING THIS ON HOLD I DON'T HAVE TIME NOW


***
***
***
***
***
***
***
***

# OK LETS MOCK PRISMA CLIENT

WE ARE USING OFFICIAL DOCKS FROM PRISMA

<https://www.prisma.io/docs/guides/testing/unit-testing#mocking-the-prisma-client>

FIRST LETS INSTALL THIS:

```
yarn add jest-mock-extended --dev
```

# NOW LETS CREATE A FILE FOR OUR PRISMA CLIENT THAT IS GOING TO BE USED WHILE TESTING

```
touch prisma_client_for_test.ts
```

```ts
// PRISM CLIENT TO BE USED IN TESTING
// LODED BY SINGLETON
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

```

# LETS CREATE SINGLETON

```
touch singleton.ts
```

```ts
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";
import { DeepMockProxy } from "jest-mock-extended/lib/cjs/Mock";

import prisma from "./prisma_client_for_test";

// HEE WE NEED PATH TO OUR PRISMA CLIENT
// BECAUSE WE ARE MOCKING IT
jest.mock("./lib/prisma/index.ts", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

```








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
