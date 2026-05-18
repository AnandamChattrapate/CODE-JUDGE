import matchmakingRedis from "../config/matchmakingRedis.js";

export const joinMatchmakingQueue = async ({
  userId,
  rating
}) => {

  await matchmakingRedis.zadd(
    "matchmakingQueue",
    rating,
    userId
  );

  return true;
};

export const findNearbyPlayers = async (
  rating
) => {

  return await matchmakingRedis.zrangebyscore(
    "matchmakingQueue",
    rating - 100,
    rating + 100
  );
};

export const leaveMatchmakingQueue = async (
  userId
) => {

  await matchmakingRedis.zrem(
    "matchmakingQueue",
    userId
  );

  return true;
};

export const getQueueCount = async () => {

  return await matchmakingRedis.zcard(
    "matchmakingQueue"
  );
};