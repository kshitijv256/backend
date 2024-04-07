import express from "express";
import { userController } from "../../controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/current-user", auth("currentUser"), userController.getCurrentUser);
// router.get("/allusers", userController.getAllUsers);

export default router;
