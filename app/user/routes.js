import { Router } from "express";
import config from "../config.js";
import userController from "./controller.js";

const router = new Router();

router.post("/login", async (req, res) => {
  if (req.user?.username) {
    res.status(400).json({ message: "Already logged in." });
  } else {
    const { username, password } = req.body;
    const token = await userController.show(username, password).catch((e) => {
      res.status(400).json({ message: e.message });
    });

    token && res.json({ token });
  }
});

router.post("/register", async (req, res) => {
  if (req.user?.username) {
    res.status(400).json({ message: "Already logged in." });
  } else {
    const newUser = await userController.create(req.body).catch((e) => {
      res.status(400).json({
        message: `${e.message}
              ----------------
            ${config.errors.find((error) => error.code === e.code).message}`,
      });
    });

    const token = await userController.show(
      newUser.username,

      // * Use the password from the request body, not the hashed password.
      req.password
    );

    newUser && res.json(token);
  }
});

router.post("/super", async (req, res) => {
  if (!req.user?.isSuperUser) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    const users = await userController.index();
    res.json(users);
  }
});

export default router;
