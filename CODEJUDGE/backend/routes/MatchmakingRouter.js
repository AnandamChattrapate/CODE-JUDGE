import express from "express";

import {
  joinQueue,
  findMatch,
  leaveQueue,
  queueCount
}
from "../controllers/MatchmakingController.js";

const router = express.Router();

router.post(
  "/join",
  joinQueue
);

router.get(
  "/find",
  findMatch
);

router.delete(
  "/leave",
  leaveQueue
);

router.get(
  "/count",
  queueCount
);

export const MatchmakingRouter =
  router;