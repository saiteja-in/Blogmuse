import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import cookieParser from "cookie-parser";
import commentRoute from './routes/comment.route.js'
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
//used to parse the incoming json requests
app.use(express.json());
//parse the imcoming cookies
app.use(cookieParser())

const PORT = process.env.PORT

app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/post",postRoute);
app.use("/api/comment",commentRoute);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
