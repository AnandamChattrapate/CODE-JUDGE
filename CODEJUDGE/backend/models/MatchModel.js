import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: [true, "Match ID is required"],
      unique: true,
      trim: true,
    },

    players: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserModel",
          required: [true, "Player user is required"],
        },

        result: {
          type: String,
          enum: {
            values: ["won", "lost", "draw"],
            message: "Result must be won, lost, or draw",
          },
          default: "draw",
        },
      },
    ],

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemModel",
      required: [true, "Problem is required"],
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      default: null,
    },

    status: {
      type: String,
      enum: {
        values: ["active", "finished", "cancelled"],
        message: "Invalid match status",
      },
      default: "active",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    submissionsLog: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserModel",
          required: [true, "Submission user is required"],
        },

        verdict: {
          type: String,
          required: [true, "Verdict is required"],
        },

        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const MatchModel = mongoose.model(
  "MatchModel",
  matchSchema
);