# Movies

## How to use:

First pull the project using:

`git clone https://github.com/MMMikeM/MMMovies.git`

Start the container composition, set up the database and (hopefully) seed the db

`make initialise`

Drop the volumes, reset the db

`make down_with_volume`

## About this project

I've given myself a challenge to build something new and learn along the way. I have opted to build this project using an MVC approach, instead of using RESTful services and React/NextJS. This is partly due to the increased obfuscation of MVC, preventing endpoints from being exposed.

## Important sourcesp

- [Ideal NodeJS Project Structure](https://softwareontheroad.com/ideal-nodejs-project-structure/#architecture)
- [Prisma many-to-many: Explicit vs implicit](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)
- [User Auth in NodeJS with PassportJS](https://www.freecodecamp.org/news/learn-to-implement-user-authentication-in-node-apps-using-passport-js/)

### I am planning to learn 📚

- MVC in NodeJS and how to use templating engines
- Many-to-many relations
- Auth, using JWTs, assisted with argon2

### Challenges that I have run into are 💪🏻

- Dated documentation in libraries
- Asynchronous iteration
- Auth has a steep learning curve
- Caching data between gets and posts
- _Not_ spending a bunch of time making it look good

### Things that I'm super excited about 🍾

- Getting smart with my Makefile and Docker - I've usually managed dbs pretty manually using PGAdmin
