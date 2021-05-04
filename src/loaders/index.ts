const express = require("express")
const path = require("path")
const flash = require("express-flash")
const methodOverride = require("method-override")

const routeFile = require("../routes")

export default async ({ app }) => {
  // Endpoint to check status
  app.get("/status", (req, res) => {
    res.status(200).end()
  })

  // import the authentication loader
  await require("./authLoader").default({ app })

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

  // neater error handling
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
