const express = require("express")
const path = require("path")
const passport = require("passport")
const session = require("express-session")
const Strategy = require("passport-local").Strategy
const flash = require("express-flash")
const methodOverride = require("method-override")

const routeFile = require("../routes")
const authServices = require("../services/auth")

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async ({ app }) => {
  // Endpoint to check status
  app.get("/status", (req, res) => {
    res.status(200).end()
  })

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

  // Set views & view engine
  app.set("views", path.join(__dirname, "../views"))
  app.set("view engine", "pug")
  app.use(flash())

  // Serve static files - for images & packages
  app.use(express.static(path.join(__dirname, "../public")))

  // parse encoded requests & custom methods
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(methodOverride("_method"))

  // Start app
  app.listen(3000, () => {
    console.log("Server running")
  })

  // Import routes
  app.use("/", routeFile)

  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      errors: {
        message: err.message,
      },
    })
  })

  return app
}
