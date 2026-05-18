import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
    },

    rating: {
      type: Number,
      default: 1000,
      min: [0, "Rating cannot be negative"],
    },

    wins: {
      type: Number,
      default: 0,
      min: [0, "Wins cannot be negative"],
    },

    losses: {
      type: Number,
      default: 0,
      min: [0, "Losses cannot be negative"],
    },

    afk: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    solvedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProblemModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;