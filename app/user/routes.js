import { Router } from "express";
import userController from "./controller.js";

const router = new Router();

router.post("/login", async (req, res) => {
  if (req.user?.username) {
    res.status(400).json({ message: "Already logged in." });
  } else {
    const { username, password } = req.body;
    const token = await userController.show(username, password).catch((err) => {
      err.code ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });

    token && res.json({ token });
  }
});

router.post("/register", async (req, res) => {
  if (req.user?.username) {
    res.status(400).json({ message: "Already logged in." });
  } else {
    const newUser = await userController.create(req.body).catch((err) => {
      err.code ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });

    if (newUser) {
      const token = await userController.show(
        newUser.username,

        // * Use the password from the request body, not the hashed password.
        // It's in the request body because we are creating a new user.
        req.body.password
      );

      res.json({ token });
    }
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

// TODO: Remove their VoteLinks too.
router.delete("/super/:id", async (req, res) => {
  if (!req.user?.isSuperUser) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    userController.delete(req.params.id).then(() => {
      // Use 'end' instead of 'json' to send an empty response.
      res.status(204).end();
    });
  }
});

export default router;
