import leaderboardRedis from "../config/leaderboardRedis.js";

export const updatePlayerRating =
  async ({
    userId,
    rating
  }) => {

    await leaderboardRedis.zadd(
      "leaderboard",
      rating,
      userId
    );

    return true;
  };

export const getTopPlayers =
  async () => {

    return await leaderboardRedis.zrevrange(
      "leaderboard",
      0,
      9,
      "WITHSCORES"
    );
  };

export const getPlayerRank =
  async userId => {

    return await leaderboardRedis.zrevrank(
      "leaderboard",
      userId
    );
  };