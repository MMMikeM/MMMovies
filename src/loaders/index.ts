import express from "express"
import path from "path"
import flash from "express-flash"
import methodOverride from "method-override"

const routeFile = require("../routes/index")

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

  // const port = process.env.PORT || 3000

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
