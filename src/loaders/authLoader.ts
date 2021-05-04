const passport = require("passport")
const session = require("express-session")
const Strategy = require("passport-local").Strategy
const authServices = require("../services/auth")
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async ({ app }) => {
  // Initialise sessions using passport
  app.use(
    session({
      secret: "SuperSecure",
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
