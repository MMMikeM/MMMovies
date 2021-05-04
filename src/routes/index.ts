const routes = require("express").Router()
import * as searchController from "../services/search"
import * as authController from "../services/auth"
const passport = require("passport")

routes.get("/", authController.getLanding)

routes.get("/search", authController.checkAuth, searchController.moviePage)

routes.post("/search", authController.checkAuth, searchController.searchMovie)

routes.get("/to_watch", authController.checkAuth, (req, res) => {
  res.render("towatch", {
    title: "MMMovies to watch",
    message: "You have navigated to things!!!",
  })
})

routes.get("/watched", authController.checkAuth, (req, res) => {
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

routes.get("*", (req, res) => {
  res.render("notfound")
})

module.exports = routes
