import express from "express";

import {
  createMatch,
  fetchMatchState,
  updateSubmission
}
from "../controllers/MatchStateController.js";

const router = express.Router();

// CREATE MATCH
router.post(
  "/create",
  createMatch
);

// GET MATCH STATE
router.get(
  "/:matchId",
  fetchMatchState
);

// UPDATE SUBMISSION RESULT
router.post(
  "/submission",
  updateSubmission
);

export const MatchStateRouter = router;