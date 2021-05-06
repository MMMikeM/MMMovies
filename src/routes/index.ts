const routes = require("express").Router()
import * as searchController from "../services/search"
import * as authController from "../services/auth"
import * as movieController from "../services/movies"
import * as authMiddleware from "./middlewares/auth"
const passport = require("passport")

routes.get("/", authMiddleware.getLanding)

routes.get("/search", authMiddleware.checkAuth, searchController.moviePage)

routes.post("/search", authMiddleware.checkAuth, searchController.searchMovie)

routes.post("/save", authMiddleware.checkAuth, searchController.saveMovie)

routes.get("/to_watch", authMiddleware.checkAuth, movieController.toWatch)

routes.get("/login", authController.getLogin)

routes.post(
  "/login",
  authMiddleware.checkNotAuth,
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
