import express from "express";

import {
  updateLeaderboard,
  leaderboard,
  playerRank
}
from "../controllers/LeaderboardController.js";

const router = express.Router();

router.post(
  "/update",
  updateLeaderboard
);

router.get(
  "/",
  leaderboard
);

router.get(
  "/rank/:userId",
  playerRank
);

export const LeaderboardRouter =
  router;