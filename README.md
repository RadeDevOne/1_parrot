# TESTING SETUP

WE WOULD LIKE TO TEST MANY THINGS BUT WE ARE GOING TO START A LITTLE BIT SIMPLER THAN AFTER THT WE WILL GO INTO MORE ADVANCED THINGS

```
yarn add --dev @types/jest jest
```

WE ALREDY INSTALLED `ts-node` BEFORE, JUST KNO IT IS NEEDED TOO

# GENERETING JEST CONFIG

```
yarn jest --init
```

PICK TO CLEAR MOCKS BETWEEN TEST, PICK NODE, PICK BABEL WHEN PROMPTED

MEYBE WE ARE GOING TO CHANE SOME SSTUFF IN THIS FILE

# MAKE A TEST SCRIPT AND YOU CAN DEFINE EXECUTION OF THAT SCRIPT ALSO INSIDE BUILD SCRIPT

```
code package.json
```

```json
"build": "next build && yarn test",
"test": "jest --watchAll --no-cache",
```

# LETS TRY EXECUTING THIS SCRIPT DESPITE WE DON THAVE ANY TESTS

```
yarn test
```

IT CHECKED 72 FILES DIDN;T FIND ANY TEST AND IT EXITET WITH ERROR CODE 1

# LETS CREATE SOME TEST; YOU CAN CALL IT 'MOCK TEST' BECAUSE WE JUST WANT TO SEE IF TEST IS GOING TO BE PROCESSED

```
mkdir tests 
```

```
mkdir tests/api && touch tests/api/banana.test.ts
```

```ts
test("calculate something", () => {
  const foo = 8;
  const bar = 6;

  expect(foo + bar).toEqual(14);
});
```

**WE CAN START TEST SUITE**

```
yarn test
```

IT WORKS



***
***
***
***






UNLIKE HOW ITS DONE WITH MONGODB, YOU CAN'T HAVE IN MEMORY POSTGRES INSTANCE

THE THING WE ARE GOING TO USE IS THROWAWAY POSTGRES INSTNCE

**WE RE GOING TO CREATE AND RUN TESTS IN DOCKER CONTAINER**

WE INSTALLED DOCKER COMPOSE ([link](https://docs.docker.com/compose/install/))

# LETS INSTALL PACKAGES WE NEED

```
yarn add --dev @types/jest jest node-fetch ts-jest
```

WE ALREADY INSTALLED: (typescript, ts-node AND THE REST OF THE STUFF) FROM BEFORE

# HERE IS SOME "WORKFLOW FOR THE TESTING"

WE ARE GOING TO DO [SIMILAR WORKFLOW](https://dev.to/eddeee888/how-to-write-tests-for-prisma-with-docker-and-jest-593i)

>> Create and run tests in Docker containers.
>> Set up and reset the database before and after tests.
>> For unit tests, create a Prisma client and disconnect after each test.
>> For functional tests, start a server and close it after each test.

# SO WE FIRST NEED TO CREATE CONTAINER THAT IS GOING TO BE A NODE 

- `touch Dockerfile`

```dockerfile
FROM node:14.18.0-alpine3.11 AS base
WORKDIR /usr/src/app
RUN apk update \
  && apk ass bash \
  && rm -rf /var/cache/apk/*
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn prisma generate
```





WE WILL FOLLOW THIS TUTORIAL 

LETS NOW CREATE DOCKER COMPOSE YAML FILE

```
touch docker-compose.test.yml
```

```yml

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
