import Router from "express";
import VoteLinkController from "./controller.js";

const router = Router();

router.get("/", (req, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
  }

  VoteLinkController.index(req.user.id)
    .then((voteLinks) => {
      res.json(voteLinks);
    })
    .catch((err) => {
      err.code ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });
});

router.get("/:url", (req, res) => {
  VoteLinkController.show(req.params.url)
    .then((voteLink) => {
      res.json(voteLink);
    })
    .catch((err) => {
      err.code ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });
});

// Create a new vote link - get back the url
router.post("/", (req, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
  }

  VoteLinkController.create(req.user.id, req.body.name)
    .then((voteLink) => {
      res.json({
        name: voteLink.name,
        url: voteLink.url,
      });
    })
    .catch((err) => {
      err.code ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });
});

router.put("/:url/vote", (req, res) => {
  VoteLinkController.vote(req.params.url, req.body.cuisine)
    .then((voteLink) => {
      res.json({
        name: voteLink.name,
        votes: voteLink.votes,
      });
    })
    .catch((err) => {
      err.code ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });
});

router.put("/:url/deactivate", (req, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
  }

  VoteLinkController.deactivate(req.params.url, req.user.id)
    .then((voteLink) => {
      res.json(voteLink);
    })
    .catch((err) => {
      err.code ? res.status(err.code) : res.status(500);
      res.json({ message: err.message });
    });
});

export default router;
