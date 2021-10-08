# SETTING UP TEST ENVIRONMENT FOR PRISMA

<https://github.com/ctrlplusb/prisma-pg-jest>

FOLLOWING THIS

<https://dev.to/eddeee888/how-to-write-tests-for-prisma-with-docker-and-jest-593i>

<https://dev.to/eddeee888/how-to-write-tests-for-prisma-with-docker-and-jest-593i>

ALSO PRISMA HAS [GOOD GUIDE ON INTEGRATION TESTING](https://www.prisma.io/docs/guides/testing/integration-testing)

SUMMARY

>> Create and run tests in Docker containers.
>> Set up and reset the database before and after tests.
>> For unit tests, create a Prisma client and disconnect after each test.
>> For functional tests, start a server and close it after each test.

# WE NEED TO HAVE `docker` AND `docker-compose` INSTALLED

DO THAT

# FROM DEPENDANIES WE NEED

`prisma` (dev dep) `@prisma/client` (dependancy), WHICH WE ALREADY HAVE

AND WE ALREADY HAVE `typescript` AND `ts-node`

LETS INSTALL THIS PACKAGES

`yarn add --dev @types/jest jest node-fetch ts-jest`

# DOCKER CONTAINER FOR MIGRATIONS AND TESTS

I GUESS THIS CONTAINER IS FOR OUR CODEBASE

AND WE AR GOING TO RUN TESTS AND MIGRATIONS IN THIS CONTAINER

```
touch Dockerfile
```

```dockerfile
FROM node:14.18.0-alpine3.11 AS base
WORKDIR /usr/src/app
RUN apk update \ 
  && apk add bash \
  && rm -rf /var/cache/apk/*
COPY . . 
RUN yarn install --frozen-lockfile
RUN yarn prisma generate
```

# WE NEED DOCKER COMPOSE SINCE WE ARE GOING TO HAVE TWO CONTAINER

WE NEED TO WRITE SERVICES CONFIGS FOR UPPER CONTAINER (base CONTAINER), AND SERVICE FOR CONTEINER WHERE WE ARE GOING TO RUN OUR POSTGRES INSTANCE FOR TESTING

```
touch docker-compose.test.yml
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
