# SETTING UP TEST ENVIRONMENT FOR PRISMA

<https://github.com/ctrlplusb/prisma-pg-jest>

FOLLOWING THIS

<https://dev.to/eddeee888/how-to-write-tests-for-prisma-with-docker-and-jest-593i>

<https://dev.to/eddeee888/how-to-write-tests-for-prisma-with-docker-and-jest-593i>

ALSO PRISMA HAS [GOOD GUIDE ON INTEGRATION TESTING](https://www.prisma.io/docs/guides/testing/integration-testing)

IDEA IS THIS

>> Create and run tests in Docker containers. 

THIS WOULD BE OVERKILL I THINK, AT LEAST FOR MY CASE IT WOULD BE

>> Set up and reset the database before and after tests.

I CAN DO THAT BUT I'LL STOP DATBASE CONTAINER SO I DON'T NEED ANY SPECIAL RESET

>> For unit tests, create a Prisma client and disconnect after each test.

# WE NEED TO HAVE `docker` AND `docker-compose` INSTALLED

I THINK ALSO THAT DOCKER COMPOSE IS OVERKILL IN THIS CASE

# FROM DEPENDANIES WE NEED

`prisma` (dev dep) `@prisma/client` (dependancy), WHICH WE ALREADY HAVE

AND WE ALREADY HAVE `typescript` AND `ts-node`

LETS INSTALL THIS PACKAGES

`yarn add --dev @types/jest jest ts-jest`

# I WILL BUILD DOCKER COMPOSE FILE

```
touch docker-compose.yaml
```

```yaml
# ./docker-compose.test.yml
version: "3.9"

services:
  # THIS WAS INTENDED FOR FIRST SERVICE
  # THIS IS A SERVICE OF A CONTAINER WHERE WE TEST OUR APP
  # WE ARE NOT GOING TO DO THAT
  # WE ARE GOING TO HAVE JUST A CONTAINER WITH A DATBASE
  # server:
  #   container_name: fancy-parrot-test-server
  #   build:
  #     context: "."
  #     target: base
  #   environment:
  #     DATABASE_URL: postgresql://themata:schism@localhost:5432/fancy-parrot-test
  #   ports:
  #     - 9999:80
  #   volumes:
  #     - ./src:/usr/src/app
  #     - ./package.json:/usr/src/app/package.json
  #   networks:
  #     - test_vm
  #   depends_on:
  #     - database

  # AS YOU CAN SEE THIS IS THE DATABASE SERVICE
  # FOR THE DATBASE CONTAINER
  # SO THIA REPRESENT OUR DATBASE THAT WE ARE GOING TO USE TO CONNECT
  # DURING TESTS
  db:
    image: postgres:13.3
    restart: always
    container_name: fancy-parrot-test-db
    environment:
      - POSTGRES_USER=themata
      - POSTGRES_PASSWORD=schism
      - POSTGRES_DB=fancy-parrot-test
    # volumes:
    # - ./postgres/data:/var/lib/postgresql/data
    # expose:
    # - 5432
    ports:
      - "5432:5432"
    # networks:
    # - test_vm
# volumes:
#   database:
# networks:
#   test_vm:
```

# LETS ADD ENV VARIABLE FROM WHAT WE ARE GOING TO RUN OUR TESTS

```
touch .env.test
```

```
DATABASE_URL=postgresql://themata:schism@localhost:5432/fancy-parrot-test
```

# LETS ADD SOME SCRIPTS WITH DOCKER COMPOSE COMMANDS

```
code package.json
```

```json
"migrate:init:test": "dotenv -e .env.test -- npx prisma migrate dev --name init",
"docker:up:test": "docker-compose up -d",
"docker:down:test": "docker-compose down",
"pg:test": "yarn docker:up:test && yarn migrate:init:test && dotenv -e .env.test -- jest -i && yarn docker:down:test",
```

YOU CAN CLEARLY SEE WHAT THEY REPRESENT

`docker-compose up -d` WILL START A CONTAINER WITH POSTGRS INSTANCE, `docker-compose down` WILL KILL A CONTAINER

AND WE BUILD OUR SCRIPTS LIKE THAT SO WE CAN RUN TESTS WHEN WE HAVE AN INSTANCE OF POSTGRES, AND WE HAVE ONE IN OUR CONTAINER AND WE ARE GOING TO CONNECT TO THAT INSTANCE, WHILE WE RUN TESTS

**WE ARE ALSO USING `prisma migrte` TO PUSH (BUILD) TABLES, RUN SEEDING AND TO THE NEW DATABESE**

**THIS WILL OFCOURSE GENERATE NEW MIGRATION FILES IN `prisma/migrations` IN OUR CODEBASE WHICH IS NOT IDEAL**

**SO I AM GOING TO CHANGE THAT, LETS NOT RUN MIGRATIONS AT ALL LETS RUN PUSHING TO THE DATBASE AND LETS RUN SEEDING**

```
code package.json
```

```json
"migrate:init:test": "dotenv -e .env.test -- npx prisma migrate dev --name init",
// ADDED THESE TWO
    "p:push:test": "dotenv -e .env.test -- npx prisma db push",
    "p:seed:test" : "dotenv -e .env.test -- npm run ts-node prisma/seed.ts --preview-feature",
    // 
    "docker:up:test": "docker-compose up -d",
    "docker:down:test": "docker-compose down",
    // INSTEAD OF MIGRATIONS USING THIS TWO HERE
    "pg:test": "yarn docker:up:test && yarn p:push:test && yarn p:seed:test && dotenv -e .env.test -- jest -i --no-cache && yarn docker:down:test",
```

**MOST OF THE TIME YOU DON'T NEED SEEDING IN TESTS, BETTER BUILD HELPERS TO SEED DURING TESTS** (I THINK IT IS MORE QUICKER)

LETS BUILD ANOTHER SCRIPT WITHOUT SEEDING

ADDED THIS ONE

```json
"pg:test:no-seed": "yarn docker:up:test && yarn p:push:test && dotenv -e .env.test -- jest -i --no-cache && yarn docker:down:test",
```

# I ALSO ADDED SOME THINGS TO JEST CONFIG

SEE IT BY YOURSELF `jest.config.ts`

IT IS NOT SOMETHING SPECIAL

**BASICALLY ADDED FIX SO JEST CAN PARSE `@/` SYNTAX IN MODULE SYNTAX**

AND ADDED `ts-node` PRESET

## WE NEED API ROUTE WHERE WE WILL USE PRISMA CLIENT

```
code pages/api/EXAMPLE/[bar].ts
```

```ts
import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma/";
// import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { bar } = req.query;

  // OK LETS USE PRISMA CLIENT TO MAKE A Profile RECORD
  // LETS MAKE TWO PROFILE RECORDS

  await prisma.profile.create({
    data: {
      nick: bar as string,
    },
  });

  await prisma.profile.create({
    data: {
      nick: bar as string,
    },
  });

  // LETS TAKE ALL PROFILES (I WANT TO SEE IF seeding HAPPEND)

  const allProfiles = await prisma.profile.findMany();

  console.log(JSON.stringify(allProfiles, null, 2));

  return res.status(200).json(allProfiles);
});

export default handler;

```

# LETS WRITE TEST FOR UPPER ROUTE

- `code __test__/api/EXAMPLE/bar.test.ts`

```ts
import { buildDynamicClient } from "../../../lib/testing/buildDynamicApiClient";

import handler from "../../../pages/api/EXAMPLE/[bar]";

describe("We are testing dynamic route /api/EXAMPLE/[bar]", () => {
  it("returns 200 if everything is ok", async () => {
    const queryParameterValue = "bologna";

    const client = buildDynamicClient("/api/EXAMPLE/[bar]", handler);

    const result = await client(queryParameterValue, "get");

    expect(result.status).toEqual(200);

    expect(result.body).toBeDefined();

    expect(result.body).toBeInstanceOf(Array);

    expect(result.body).toHaveLength(2);
  });
});

```

# LETS TEST THIS

```
yarn pg:test:no-seed
```

TEST PASSED

BUT I SOMETIMES HAVE A PROBLEM WHERE docker-compose down DOESN'T KILL THE CONTAINER

YOU THEN NEED TO RUN AGAIN `docker-compose down`

DON'T USE docker kill IN THIS CASE BECAUSE IT HAPPEN NOT TO WORK

# SO FOR ME IT WOULD BE EASIER THAT I DIDN'T USE DOCKER COMPOSE AT ALL, BUT I'LL KEEP IT

WE SHOULD MAKE A REVISION OF ALL SCRIPTS, TO REFACTOR THEM A LITTLE BIT

I DIDN'T DO MUCH WITH REFACTORING SCRIPTS, BUT SO FAR I'M SATISFIED HOW THINGS WORK

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
