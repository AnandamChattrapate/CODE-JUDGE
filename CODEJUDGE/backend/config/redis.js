// import IORedis from "ioredis";

// const redisConnection = new IORedis({
//   host: "redis-12766.crce276.ap-south-1-3.ec2.cloud.redislabs.com",
//   port: 12766,
//   username: "default",
//   password: "S02QkRVx8SGuOkUroukMAs8ke1rSrjU1",

//   maxRetriesPerRequest: null
// });

// redisConnection.on("connect", () => {
//   console.log("Redis Connected");
// });

// redisConnection.on("error", (err) => {
//   console.log("Redis Error:", err.message);
// });

// export default redisConnection;
import IORedis from "ioredis";

const redisConnection =
  new IORedis({

    host:
      "redis-12766.crce276.ap-south-1-3.ec2.cloud.redislabs.com",

    port: 12766,

    username: "default",

    password:
      "S02QkRVx8SGuOkUroukMAs8ke1rSrjU1",

    maxRetriesPerRequest: null,

    enableReadyCheck: false,

    lazyConnect: true,

    connectTimeout: 10000,

    retryStrategy(times) {

      console.log(
        `Redis Retry: ${times}`
      );

      return Math.min(
        times * 100,
        3000
      );
    },

    reconnectOnError(err) {

      console.log(
        "Redis reconnecting..."
      );

      return true;
    }
  });

// CONNECT
redisConnection.on(
  "connect",
  () => {

    console.log(
      "Redis Connected"
    );
  }
);

// READY
redisConnection.on(
  "ready",
  () => {

    console.log(
      "Redis Ready"
    );
  }
);

// ERROR
redisConnection.on(
  "error",
  err => {

    console.log(
      "Redis Error:",
      err.message
    );
  }
);

// CLOSE
redisConnection.on(
  "close",
  () => {

    console.log(
      "Redis Connection Closed"
    );
  }
);

// RECONNECTING
redisConnection.on(
  "reconnecting",
  () => {

    console.log(
      "Redis Reconnecting..."
    );
  }
);

export default redisConnection;