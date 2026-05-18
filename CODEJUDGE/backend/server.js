import express from 'express'
import {connect} from 'mongoose'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import './config/redis.js'
import {UserRouter} from './routes/UserRouter.js'
import { MatchStateRouter } from "./routes/MatchStateRouter.js";
import {ProblemRouter} from './routes/ProblemRouter.js'
import {SubmissionRouter} from './routes/SubmissionRouter.js'
import { MatchmakingRouter } from "./routes/MatchmakingRouter.js";
import { OnlineUsersRouter } from "./routes/OnlineUsersRouter.js";
import { LeaderboardRouter } from "./routes/LeaderboardRouter.js";
config()



const app=express()
const PORT=process.env.PORT || 5000

// CONNECT TO DATABASE
const connectDB= async()=>{
    try{
        await connect(process.env.DB_URL)
        console.log("====== CONNECTED TO DATABASE SUCCESSFULLY =====")
    }catch(err){
        console.log("DB ERROR : ",err.message)
    }
}
connectDB();

app.use(express.json())
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.send("backend is  running ");
})

// Routes
app.use('/api/auth',UserRouter);
app.use('/api/problems',ProblemRouter);
app.use('/api/submit',SubmissionRouter);
app.use("/api/match",MatchStateRouter);
app.use("/api/matchmaking",MatchmakingRouter);
app.use("/api/online-users",OnlineUsersRouter);
app.use("/api/leaderboard",LeaderboardRouter);
// app.use('/api/match')

app.listen(PORT,()=>{
    console.log("SERVER STARTED ON PORT : ",PORT);
})

// Handling Invalid Routes
app.use((req,res,next)=>{
    //console.log(req)
    res.json({message:`${req.url} is Invalid Path`})
})

// ERROR HANDLING MIDDLEWARE

app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
//   console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;
// && keyValue
  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
    error: `${field} "${value}" already exists`    });
  }

  //  HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});