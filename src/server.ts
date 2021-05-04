import express from "express"

const startServer = async () => {
  const app = express()
  await require("./loaders").default({ app })
}

startServer()
