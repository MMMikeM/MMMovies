# Movies

## How to use:

First pull the project using:

`git clone https://github.com/MMMikeM/MMMovies.git`

Start the container composition, set up seed the db

`make initialise`

Drop volumes, reseed the db

`make refresh`

## About this project

I've given myself a challenge to build something new and learn along the way. I have opted to build this project using an MVC approach, instead of using RESTful services and React/NextJS. This is partly due to the increased obfuscation of MVC, preventing endpoints from being exposed.

<img src="https://raw.githubusercontent.com/MMMikeM/MMMovies/main/docs/MMMovies.jpg" width="100%" />

## Important sources

- [Ideal NodeJS Project Structure](https://softwareontheroad.com/ideal-nodejs-project-structure/#architecture)
- [Prisma many-to-many: Explicit vs implicit](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)
- [User Auth in NodeJS with PassportJS](https://www.freecodecamp.org/news/learn-to-implement-user-authentication-in-node-apps-using-passport-js/)

### I am planning to learn 📚

- MVC in NodeJS and how to use templating engines
- Many-to-many relations
- Auth, ~~using JWTs~~ using, assisted with argon2

### Challenges that I have run into are 💪🏻

- Dated documentation in libraries
- Asynchronous iteration
- Auth has a steep learning curve - particularly in MVC JS land.
- Caching data between gets and posts
- _Not_ spending a bunch of time making it look good

### Things that I'm super excited about 🍾

- Getting smart with my Makefile and Docker - I've usually managed dbs pretty manually using PGAdmin
