const express = require("express");
const path = require("path");
const passport = require("passport");

const routeFile = require("../routes");
const { applyPassportStrategy } = require("../services/auth");

export default async ({ app }) => {
  // Endpoint to check status
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  // Apply passport strategy
  applyPassportStrategy(passport);

  // Set views & view engine
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "pug");

  // Serve static files - for images & packages
  app.use(express.static(path.join(__dirname, "../public")));

  // parse encoded requests
  app.use(express.urlencoded({ extended: true }));

  // Start app
  app.listen(3000, () => {
    console.log("Server running");
  });

  // Import routes
  app.use("/", routeFile);

  // Handle not found pages
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  return app;
};
