import JWT from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookie?.Token || req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      res.status(401).json({
        message: "Unauthorized request..",
      });
    }

    const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = User.findById(decodedToken._id).select("-password -token");
    if (!user) {
      res.status(401).json({
        message: "Invalid Access Token..",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Access Token..",
    });
  }
});
