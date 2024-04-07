import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import {
  tokenService,
  userService,
  authService,
  emailService,
} from "../services";
import exclude from "../utils/exclude";
import { User } from "@prisma/client";

const getCurrentUser = catchAsync(async (req, res) => {
  const user = req.user as User;
  res.send(user);
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.send(users);
});

export default {
  getCurrentUser,
  getAllUsers,
};
