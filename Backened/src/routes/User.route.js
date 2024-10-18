import { Router } from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();
router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/logout").post(verifyJWT, LogoutUser);

export default router;
