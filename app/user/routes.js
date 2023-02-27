import { Router } from "express";
import voteLinkController from "../vote-link/controller.js";
import userController from "./controller.js";

const router = new Router();

router.post("/login", async (req, res) => {
  if (req.user?.username) {
    res.status(400).json({ message: "Already logged in." });
  } else {
    const { username, password } = req.body;
    const token = await userController.show(username, password).catch((err) => {
      parseInt(err.code) ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });

    token && res.json({ token });
  }
});

router.post("/register", async (req, res) => {
  if (req.user?.username)
    return res.status(400).json({ message: "Already logged in." });

  const newUser = await userController.create(req.body).catch((err) => {
    if (err.code === "P2002" && err.meta?.target?.includes("username"))
      // This 'return' only exits the catch block, not the entire function.
      return res.status(400).json({ message: "Username already exists." });

    res.json({ message: err.message });
  });

  // If the user was not created, return.
  if (!newUser.username) return;

  const token = await userController.show(
    newUser.username,

    // * Use the password from the request body, not the hashed password.
    // It's in the request body because we are creating a new user.
    req.body.password
  );

  res.json({ token });
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
    await voteLinkController.destroyBySuperUser(req.params.id);
    await userController.delete(req.params.id);

    res.status(204).end();
  }
});

export default router;
