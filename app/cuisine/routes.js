import { Router } from "express";
import userController from "./controller.js";

const router = Router();

router.get("/", (_, res) => {
  userController
    .index()
    .then((cuisines) => {
      res.json(cuisines);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
