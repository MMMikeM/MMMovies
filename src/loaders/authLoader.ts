// const passport = require("passport")
import passport from "passport"
import session from "express-session"
import Strategy from "passport-local"
import * as authServices from "../services/auth"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async ({ app }) => {
  const env: any = dotenv.config().parsed
  // Initialise sessions using passport
  app.use(
    session({
      secret: env.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  )

  passport.use(
    new Strategy(
      { usernameField: "email", passwordField: "password" },
      authServices.authenticateUser
    )
  )

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      })
      return done(null, user)
    } catch (error) {
      return done(error, null)
    }
  })

  return app
}
