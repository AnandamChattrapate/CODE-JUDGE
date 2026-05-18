import matchmakingRedis from "../config/matchmakingRedis.js";

export const createMatchState = async ({
  matchId,
  playerA,
  playerB
}) => {

  const matchState = {
    matchId,

    playerA: {
      userId: playerA,
      testsPassed: 0,
      totalTests: 0,
      submitted: false
    },

    playerB: {
      userId: playerB,
      testsPassed: 0,
      totalTests: 0,
      submitted: false
    },

    status: "ongoing",

    winner: null,

    startedAt: Date.now()
  };

  await matchmakingRedis.set(
    `match:${matchId}`,
    JSON.stringify(matchState)
  );

  return matchState;
};

export const getMatchState = async matchId => {

  const data = await matchmakingRedis.get(
    `match:${matchId}`
  );

  if (!data) return null;

  return JSON.parse(data);
};

export const updatePlayerSubmission = async ({
  matchId,
  userId,
  testsPassed,
  totalTests
}) => {

  const data = await matchmakingRedis.get(
    `match:${matchId}`
  );

  if (!data) {
    throw new Error("Match not found");
  }

  const matchState = JSON.parse(data);

  // PLAYER A
  if (
    matchState.playerA.userId === userId
  ) {

    matchState.playerA.testsPassed =
      testsPassed;

    matchState.playerA.totalTests =
      totalTests;

    matchState.playerA.submitted = true;
  }

  // PLAYER B
  else if (
    matchState.playerB.userId === userId
  ) {

    matchState.playerB.testsPassed =
      testsPassed;

    matchState.playerB.totalTests =
      totalTests;

    matchState.playerB.submitted = true;
  }

  // DECIDE WINNER
  if (
    matchState.playerA.submitted &&
    matchState.playerB.submitted
  ) {

    matchState.status = "finished";

    if (
      matchState.playerA.testsPassed >
      matchState.playerB.testsPassed
    ) {

      matchState.winner =
        matchState.playerA.userId;
    }

    else if (
      matchState.playerB.testsPassed >
      matchState.playerA.testsPassed
    ) {

      matchState.winner =
        matchState.playerB.userId;
    }

    else {
      matchState.winner = "draw";
    }
  }

  await matchmakingRedis.set(
    `match:${matchId}`,
    JSON.stringify(matchState)
  );

  return matchState;
};