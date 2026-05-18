import {
  joinMatchmakingQueue,
  findNearbyPlayers,
  leaveMatchmakingQueue,
  getQueueCount
}
from "../services/matchmakingService.js";

export const joinQueue = async (
  req,
  res,
  next
) => {

  try {

    const {
      userId,
      rating
    } = req.body;

    await joinMatchmakingQueue({
      userId,
      rating
    });

    res.json({
      success: true,
      message: "Joined matchmaking queue"
    });

  } catch (err) {
    next(err);
  }
};

export const findMatch = async (
  req,
  res,
  next
) => {

  try {

    const { rating } = req.query;

    const players =
      await findNearbyPlayers(
        Number(rating)
      );

    res.json({
      success: true,
      players
    });

  } catch (err) {
    next(err);
  }
};

export const leaveQueue = async (
  req,
  res,
  next
) => {

  try {

    const { userId } = req.body;

    await leaveMatchmakingQueue(
      userId
    );

    res.json({
      success: true,
      message: "Left matchmaking queue"
    });

  } catch (err) {
    next(err);
  }
};

export const queueCount = async (
  req,
  res,
  next
) => {

  try {

    const count =
      await getQueueCount();

    res.json({
      success: true,
      count
    });

  } catch (err) {
    next(err);
  }
};