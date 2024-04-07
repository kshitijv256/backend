import express, { Express, NextFunction, Request, Response } from "express";
import v1 from "./routes/v1";
import cors from "cors";
import passport from "passport";
import { errorConverter, errorHandler } from "./middlewares/error";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import { jwtStrategy } from "./config/passport";
import mongoose from "mongoose";
import { Message } from "./models/message";
import "dotenv/config";
import { userController } from "./controllers";

const app: Express = express();

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// parse json request body
app.use(express.json());
// accept image uploads
app.use(express.static("public"));

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// mongo messages routes
const connect = async () => {
  await mongoose.connect(`${process.env.MONGO_DB_URL}`);
  console.log("mongo connected");
};

connect();
app.get(
  "/messages",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await Message.find();
      res.send(messages);
    } catch {
      res.sendStatus(404);
    }
  }
);

app.post("/sendMessage", async (req, res) => {
  const msg = req.body;
  const message = new Message(msg);
  message.save();
  res.send(msg);
});

app.get("/allusers", userController.getAllUsers);

// v1 api routes
app.use("/api/v1", v1);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

/* Main Route */
app.get("/", (_: Request, res: Response, next: NextFunction) => {
  try {
    throw new Error("This is an error");
  } catch (error) {
    next(error);
  }
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle errors
app.use(errorHandler);

export default app;
