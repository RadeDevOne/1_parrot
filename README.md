# BUILD SEEDING LOGIC

DON'T FORGET TO USE UNSPLASH URL FOR PICTURES FOR PRODUCTS

CHANGE OF PLAN, WE ARE NOT GOING TO USE MOCKAROO FOR MOCK DATA

WE WILL GENERATE DATA (WE DON'T WANT TO LOAD JSON FILES AND LOOP THROUGH THEM), **WE WILL USE [faker](https://www.npmjs.com/package/faker)**

```
yarn add faker
```

```
yarn add @types/faker
```

WE WILL BE USING THIS TUTORIAL:

<https://www.youtube.com/watch?v=7RrgSh4k3nM>

WHICH IS GREAT BECAUSE IT USING FAKER; BUT MAYBE IT IS A BIT OUTDATED

SO WE ARE GOING TO FOLLOW [OFFICIAL SEEDING DOCUMENTATION](https://www.prisma.io/docs/guides/database/seed-database)(BUT THIS DOESN'T SHOW THE EXAMPLE)

I ALSO FOUND THIS EXAMPLE:

IT IS 25 DAYS OLD: (SHOULD WORK)

<https://github.com/prisma/prisma-examples/blob/latest/typescript/graphql-nextjs/prisma/seed.ts>

# FIRST WE NEED TO OVERRIDE `ts-node` BY ADDING ONE SCRIPT TO `package.json`; AND WE OLSO NEED TO ADD ANOTHER THING TO `package.json`

WE WILL ADD THIS SCRIPT TO `package.json`

```json
"ts-node": "ts-node --compiler-options \"{\\\"module\\\":\\\"commonjs\\\"}\""
```

WE DID THIS SO WE CAN USE ESM IMPORTS IN A FILE WE ARE GOING TO EED FROM

AND WE WILL WE WILL ADD THIS IN SAME FILE (`package.json`)

WE ARE NOT ADDING THIS AS A SCRIPT, I'M JUST PUTTING IN TOP LEVEL IN `package.json` FILE

YOU CAN ADD THIS JUST BEFORE SCRIPTS

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

# FIRST LET'S SKAFFOLD SEEDING FILE

```
touch prisma/seed.ts
```

```ts
import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  //
  // WE ARE GOING TO PRINT SOMETHING OUT FOR NOW
  // TO SEE IF THIS IS GOING TO RUN AT ALL

  console.log("SEEDING IN HERE");
  //
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

# WE MUST START DEVELOPMENT INSTANNCE OF POSTGRES

```
yarn postgres:dev
```

WE NEED TO APPLY SCHEMA ON OUR VIRGIN DATABASE

```
yarn prisma:db:push:dev
```

APARENTLY IT WORKED BECAUSE WE HAVE SEEN TEXT PRINTED OUT

# LETS ACTUALLY TEST SEEDING BY CREATING ONE RECORD

`PaymentResult` IS SMALLEST AND DOESN'T HAVRE SOME REQUIRED FOREIGN KEYS (TRY FIRST WITH HIM)

```
code prisma/seed.ts
```

```ts
import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
  // I ADDED THIS
  await prisma.paymentResult.create({
    data: {
      paymentId: "666",
      paymentProvider: "PayPal",
    },
  });

  console.log("SEEDING IN HERE");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

```

OK, RUN AGAIN SEEDING SCRIPT

```
yarn prisma:seed:dev
```

TEXT WAS PRINTED IN TERMINAL

LETS OPEN A PRISMA STUDIO

```
yarn prisma:studio:dev
```

I OPENED STUDIO AND I CAN SEE THAT WE ACTUALLY CREATED ONE `PaymentResult` RECORD

# WE CAN NOW USE FAKER TO SEED MORE DATA


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

 -->
