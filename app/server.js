import express from "express";
import config from "./config.js";
import cuisineRouter from "./cuisine/routes.js";
import decodeUser from "./middleware/decode-user.js";
import userRouter from "./user/routes.js";

const app = express();

app.use("/api/cuisines", cuisineRouter);

app.use(express.json());
app.use(decodeUser);
app.use("/api/users", userRouter);

export default () => {
  app.listen(config.port, () => {
    console.log("Server running: http://localhost:" + config.port);
  });
};
