import { Router } from "express";
import userController from "./controller.js";

const router = Router();

router.get("/", (_, res) => {
  userController
    .index()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
