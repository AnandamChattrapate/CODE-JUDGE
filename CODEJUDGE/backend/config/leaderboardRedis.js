import Redis from "ioredis";

const leaderboardRedis = new Redis({
  host: "megafine-eminent-cool-24966.db.redis.io",
  port: 18760,
  username: "default",
  password: "CVIA290gccLiAKYB0WljtGXgXFf5rQS3"
});

leaderboardRedis.on("connect", () => {
  console.log("Leaderboard Redis Connected");
});

export default leaderboardRedis;