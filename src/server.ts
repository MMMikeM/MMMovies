const loaders = require("./loaders");
const express = require("express");

const port = process.env.PORT || 3000;

const startServer = async () => {
  const app = express();
  await require("./loaders").default({ app });
};

startServer();
