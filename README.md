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

# I WILL BUILD DOCKER COMPOSE FILE

```
touch docker-compose.yaml
```

```yaml
# ./docker-compose.test.yml
version: "3.9"


services:
  # THIS FIRST SERVICE, WE NEED DATBASE CONNECTION STRING HERE
  # OF A DATBASE WE WANT TO CONNECT
  # THIS IS A SERVICE OF A CONTAINER WHERE WE TEST OUR APP
  # FOT FOR NOW WE ARE NOT GOING TO DO THAT
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

# I ALSO ADDED SOME THINGS TO JEST CONFIG

SEE BY YOURSELF `jest.config.ts`

## LETYS USE PRISMA IN SOME OF OUR TESTS

```

```



















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
RUN yarn p:generate
```

AS YOU SEE WE GENERATE SCHEMA WITH LAST COMMAND

# WE NEED DOCKER COMPOSE SINCE WE ARE GOING TO HAVE TWO CONTAINER

WE NEED TO WRITE SERVICES CONFIGS FOR UPPER CONTAINER (base CONTAINER), AND SERVICE FOR CONTEINER WHERE WE ARE GOING TO RUN OUR POSTGRES INSTANCE FOR TESTING

```
touch docker-compose.test.yml
```

```yml
# ./docker-compose.test.yml
version: "3.7"

services:
  # THIS FIRST SERVICE, WE NEED DATBASE CONNECTION STRING HERE
  # OF A DATBASE WE WANT TO CONNECT
  # THIS IS A SERVICE OF A CONTAINER WHERE WE TEST OUR APP
  server:
    build:
      context: "."
      target: base
    environment:
      DATABASE_NAME: fancy-parrot
      # PRISMA LOADS THIS ENV VARIABLE ((IT IS SPECIFIED IN SCHEMA))
      DATABASE_URL: postgresql://themata:schism@localhost:5432/fancy-parrot
    ports:
      - 9999:80
    volumes:
      - ./src:/usr/src/app/src
      - ./package.json:/usr/src/app/package.json
    networks:
      - test_vm
    depends_on:
      - database

  # AS YOU CAN SEE THIS IS THE DATABASE SERVICE
  # SO THI REPRESENT OUR DATBASE THAT WE ARE GOING TO USE TO CONNECT
  # DURING TESTS
  database:
    image: postgres:13.3
    restart: always
    environment:
      - POSTGRES_USER=themata
      - POSTGRES_PASSWORD=schism
      - POSTGRES_DB=fancy-parrot
    volumes:
      - ./postgres/data:/var/lib/postgresql/data
    expose:
      - 5432
    ports:
      - "54320:5432"
    networks:
      - test_vm
volumes:
  database:
networks:
  test_vm:
```

## LETS NOW USE DOCKER COMPOSE COMMAND TO DOWNLOAD AND BUILD UPPER IMAGES

```
docker-compose -f docker-compose.test.yml build --no-cache
```

YOU WILL SEE ALL FROM DOWNLOADING IMAGES TO BUILDING CONTAINERS, INSTALLING NODE MODULES, ALL THAT STUFF THAT HAPPENS; EVERYTHING SIMILAR THAT HAPPENS WHEN WE RUNNED KUBERNETES WITH kubectl IF YOU REMEBER


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
