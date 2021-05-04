const routes = require("express").Router();
import { PrismaClient } from "@prisma/client";
import * as searchController from "../controllers/search";
import * as authController from "../controllers/auth";

const prisma = new PrismaClient();

routes.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.render("index", {
    title: "MMMovies",
    message: JSON.stringify(users),
  });
});

routes.get("/search", searchController.moviePage);

routes.post("/search", searchController.searchMovie);

routes.get("/to_watch", (req, res) => {
  res.render("towatch", {
    title: "MMMovies to watch",
    message: "You have navigated to things!!!",
  });
});

routes.get("/watched", (req, res) => {
  res.render("watched", {
    title: "MMMovies I have watched",
    message: "You have navigated to things!!!",
  });
});

routes.get("/login", authController.getLogin);

routes.post("/login", authController.postLogin);

routes.get("/sign_up", authController.getSignUp);

routes.post("/sign_up", authController.postSignup);

routes.get("/reset", (req, res) => {
  res.render("reset");
});

module.exports = routes;
