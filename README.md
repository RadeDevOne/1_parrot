# DEVELOPMENT DATABASE

WE ARE GOING TO USE POSTGRESQL DATBASE WITH PRISMA

WE WILL USE ONE DATABASE FOR DEVELOPMENT AND OTHER FOR PRODUCTION

WE CAN SPECIFY URLS OF THESE DATBASES INSIDE `.env.production.local` AND `.env.development.local`

**PRISMA NEEDS `DATABASE_URL` SO WE ARE GOING TO SET THAT**

**FOR PRODUCTION WE ARE USING `SUPABASE` POSTGRES DATABASE SO I TOOK A URL FROM DASBOARD AND INSERTED INSIDE STRING SO OUR ENV VARIABLE IS LOOKING LIKE THIS**

```
cat .env.production.local
```

```
DATABASE_URL=postgresql://postgres:[PASSWORD YOU ADDED WHEN YOU CREATED SUPABASE PROJECT]@db.dsgdgkgkfhfgd.supabase.co:5432/postgres
```

AND THAT IS IT FOR PRODUCTION

I ALREADY RUNNED EVERYTHING TO TEST THAT WE CAN CONNECT TO PRODUCTION DATBASE

WHAT I DID IS:

I BACKED UP gitignore BECAUSE THIS COMMAND TENDS TO OVERWRITE IT (SO I CAN PUT IT BACK AFTER RUNNING THE COMMAND)

```
npx prisma init
```

**THIS GENERATED PRISMA STUFF IN OUR PROJECT, AND I ADDED SOME THINGS INS**

I ADDED SOME THINGS IN A SCHEMA (SOME next-auth STUFF)

LETS PUSH THOSE CHANGES

```
yarn prisma:db:push:prod
```

EVERYTHING WENT WELL

## FOR DEVELOPMENT WE ARE GOING TO USE POSTGRESQL INSTANCE THAT IS RUNNING INSIDE DOCKER CONTAINER, SO YOU NEED TO INSTAL DOCKER

[HOW TO INSTALL DOCKER YOU CAN SEE HERE](https://docs.docker.com/engine/install/ubuntu/) (DON'T FORGET TO RUN [docker login](https://docs.docker.com/engine/reference/commandline/login/))) (TRY USING WITH sudo IF SOMETHING GETS WRONG)

WHEN WE DID THAT LETS RUN CONTAINER WITH POSTGRESS INSTANCE

**BUT BEFORE THAT LETS FIND OUT WHAT POSTGRES INSTANCE IS USING SUPABASE, BECAUSE WE WANT TO HAVE PRODUCTION AND DEVELOPMENT DATBASES WITH SAME VERSIONS**

GO TO THE DASBOARD OF YOUR SUPABASE PROJECT AND **GO TO `SQL EDITOR` CLICK ON `+ New Query` AND RUN THIS QUERY**

```sql
SELECT version();
```

YOU WILL GET THE VERSION

AT TIME I WAS DOING THIS VERSION WAS `13.3`

SO WE AARE GOING TO USE SAME VERSION FOR OUR DEVELOPMENT DATBASE

IF YOU FORGOT HOW TO RUN POSTGRES INSTANCE WITH DOCKER [CHECK THIS](https://github.com/Rade58/databases-playground/tree/1_0_1_PostgreSQL)

***
IMPORTANT!!

**RUN docker COMMANDS WITH `sudo` IF YOU GET PERMISSION ERROR**

****

```
sudo docker run --name fancy-parrot -e POSTGRES_PASSWORD=schism -p 5432:5432 -d --rm postgres:13.3
```

```
sudo docker ps
```

WE HAVE A RUNNING CONTAINER

```bash
CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS          PORTS                                       NAMES
49719ebf4e4f   postgres:13.3   "docker-entrypoint.s…"   22 seconds ago   Up 19 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   fancy-parrot
```

## LETS FORM A LINK FOR OUR DEVELOPMENT DATABASE

THIS IS A TEMPLATE: `postgresql://${user}:${pass}@localhost:5432/${dbName}`

SO OUR LINK IS: (WE DIDN'T SPECIFY USERNAME SO WE WILL PUT `postgres` AS A USER)

`postgresql://postgres:schism@localhost:5432/fancy-parrot`

**LETS SPECIFY THIS LINK AS A ENVIROMENT VARIIABLE INSIDE `.env.development.local`**

```
code .env.development.local
```

```
DATABASE_URL=postgresql://postgres:schism@localhost:5432/fancy-parrot
```

# WE HAVE A DEVELOPMENT DATBASE RUNNING INSIDE OF CONTAINER (I ALSO ADDED SOME THINGS IN SCHEMA AND EARLIER (I EXPLAINED THAT)), LETS NOW PUSH OUR CHANGES

THIS SHOULD DO EVERYTHING (WE DIDN'T RUN INITIALIZATION COMMAND BECAUSE WE ALREADY DID THAT HEN WE WERE DOING THINGS AROUND PRODUCTION DATABASE)

I WROTE A SCRIPT SO WE CAN PUSH SCHEMA STUFF TO DEVELOPMENT DATBASE ONLY

```
yarn prisma:db:push:dev
```

LETS NOW OPEN DATABASE SHELL TO SEE IF WE HAVE TABLES ACORDING TO SCHEMA

```
sudo docker exec -it -u postgres fancy-parrot psql
```

WE ARE INSIDE SHELL

LETS CONNECT TO A DATABASE

```
\l
```

```
\c fancy-parrot
```

LETS LIST IF WE HAVE SOME TABLES

```
\d
```

AND THIS IS A VITNES THAT OUR PRISMA SCHEMA DID ACTUALLY APPLIED

```
                List of relations
 Schema |        Name         | Type  |  Owner   
--------+---------------------+-------+----------
 public | Account             | table | postgres
 public | Session             | table | postgres
 public | User                | table | postgres
 public | VerificationRequest | table | postgres
(4 rows)
```

<!-- ---- ---- ---- ---- -->

# WORK IN PROGRESS

## STYLING

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

## STATE MANGEMENT

xstate @xstate/react

