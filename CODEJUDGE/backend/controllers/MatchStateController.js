import {
  createMatchState,
  getMatchState,
  updatePlayerSubmission
}
from "../services/matchStateService.js";

export const createMatch = async (req,res) => {

  try {
    // console.log("create match body ",req);
    const {
      matchId,
      playerA,
      playerB
    } = req.body;

    const match =
      await createMatchState({
        matchId,
        playerA,
        playerB
      });

    res.json({
      success: true,
      match
    });

  } catch (err) {
    console.log("error in match making :",err.message);
  }
};

export const fetchMatchState = async (
  req,
  res,
  next
) => {

  try {

    const { matchId } = req.params;

    const match =
      await getMatchState(matchId);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: "Match not found"
      });
    }

    res.json({
      success: true,
      match
    });

  } catch (err) {
    next(err);
  }
};

export const updateSubmission = async (
  req,
  res,
  next
) => {

  try {

    const {
      matchId,
      userId,
      testsPassed,
      totalTests
    } = req.body;

    const updatedMatch =
      await updatePlayerSubmission({
        matchId,
        userId,
        testsPassed,
        totalTests
      });

    res.json({
      success: true,
      match: updatedMatch
    });

  } catch (err) {
    next(err);
  }
};