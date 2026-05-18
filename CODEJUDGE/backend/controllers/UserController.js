import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await User.create({
      username,
      email,
      passwordHash,
      avatar,
    });

    // Remove password from response
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      rating: newUser.rating,
      wins: newUser.wins,
      losses: newUser.losses,
      afk: newUser.afk,
      avatar: newUser.avatar,
      solvedProblems: newUser.solvedProblems,
      createdAt: newUser.createdAt,
      
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// LOGIN 

export const login = async(req,res) => {
    try {
    console.log("body :", req.body);

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Compare password
    const isMatched = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isMatched) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      payload: {
        _id: user._id,
        username: user.username,
        email: user.email,
        rating: user.rating,
        wins: user.wins,
        losses: user.losses,
        avatar: user.avatar,
        solvedProblems: user.solvedProblems,
        token:token,
      },
    });

  } catch (err) {
    console.log("ERROR : ",err.message);
  }
}
 