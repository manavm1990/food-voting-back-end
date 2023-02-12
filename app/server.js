import express from "express";
import config from "./config.js";
import cuisineRouter from "./cuisine/routes.js";
import decodeUser from "./middleware/decode-user.js";
import userRouter from "./user/routes.js";
import voteLinkRouter from "./vote-link/routes.js";
import restaurantRouter from "./restaurant/routes.js";
import cors from "cors";

const app = express();

// TODO: Limit CORS to only the frontend
app.use(cors());
app.use("/api/cuisines", cuisineRouter);
app.use("/api/restaurants", restaurantRouter);

app.use(express.json());
app.use(decodeUser);
app.use("/api/users", userRouter);
app.use("/api/votelinks", voteLinkRouter);

export default () => {
  app.listen(config.port, () => {
    console.log("Server running: http://localhost:" + config.port);
  });
};
