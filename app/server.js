import express from "express";
import config from "./config.js";
import cuisineRouter from "./cuisine/routes.js";

const app = express();

app.use("/api/cuisines", cuisineRouter);

export default () => {
  app.listen(config.port, () => {
    console.log("Server running: http://localhost:" + config.port);
  });
};
