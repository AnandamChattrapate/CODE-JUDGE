import Redis from "ioredis";

const matchmakingRedis = new Redis({
  host: "megafine-eminent-cool-24966.db.redis.io",
  port: 18760,
  username: "default",
  password: "CVIA290gccLiAKYB0WljtGXgXFf5rQS3"
});

matchmakingRedis.on("connect", () => {
  console.log("Matchmaking Redis Connected");
});

export default matchmakingRedis;