import { Router } from "express";
import restaurantController from "./controller.js";

const router = Router();

router.get("/", (req, res) => {
  restaurantController
    .getRandomRestaurant(req.query)
    .then((restaurant) => {
      res.json(restaurant);
    })
    .catch((err) => {
      err.code ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });
});

export default router;
