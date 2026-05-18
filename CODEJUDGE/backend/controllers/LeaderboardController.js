import {
  updatePlayerRating,
  getTopPlayers,
  getPlayerRank
}
from "../services/leaderboardService.js";

export const updateLeaderboard =
  async (
    req,
    res,
    next
  ) => {

    try {

      const {
        userId,
        rating
      } = req.body;

      await updatePlayerRating({
        userId,
        rating
      });

      res.json({
        success: true,
        message:
          "Leaderboard updated"
      });

    } catch (err) {
      next(err);
    }
  };

export const leaderboard =
  async (
    req,
    res,
    next
  ) => {

    try {

      const players =
        await getTopPlayers();

      res.json({
        success: true,
        players
      });

    } catch (err) {
      next(err);
    }
  };

export const playerRank =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { userId } =
        req.params;

      const rank =
        await getPlayerRank(
          userId
        );

      res.json({
        success: true,
        rank
      });

    } catch (err) {
      next(err);
    }
  };