const routes = require("express").Router()
import { PrismaClient } from "@prisma/client"
import * as searchController from "../controllers/search"
import * as authController from "../controllers/auth"
const passport = require("passport")

const prisma = new PrismaClient()

routes.get("/", authController.getLanding)

routes.get("/search", searchController.moviePage)

routes.post("/search", searchController.searchMovie)

routes.get("/to_watch", (req, res) => {
  res.render("towatch", {
    title: "MMMovies to watch",
    message: "You have navigated to things!!!",
  })
})

routes.get("/watched", (req, res) => {
  res.render("watched", {
    title: "MMMovies I have watched",
    message: "You have navigated to things!!!",
  })
})

routes.get("/login", authController.getLogin)

routes.post(
  "/login",
  authController.checkNotAuth,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
)

routes.get("/sign_up", authController.getSignUp)

routes.post("/sign_up", authController.postSignup)

routes.get("/reset", (req, res) => {
  res.render("reset")
})

routes.delete("/logout", (req, res) => {
  console.log("signingout!")
  req.logOut()
  res.redirect("/login")
})

module.exports = routes
