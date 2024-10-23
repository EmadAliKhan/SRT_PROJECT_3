import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const RegisterUser = asyncHandler(async (req, res) => {
  // Getting user detail from frontend
  const { firstName, lastName, email, password, ConfirmPassword } = req.body;

  //checking validataion
  if (!(firstName && lastName && email && password && ConfirmPassword)) {
    throw new ApiError(400, "All Fields are required...!");
  }

  //checking if user already exist
  const existedUser = await User.findOne({
    $or: [{ email }, { password }],
  });

  if (existedUser) {
    throw new ApiError(
      400,
      "user with this email and password already exists..."
    );
  }
  // Send data to database
  const user = User.create({
    firstName,
    lastName,
    email,
    password,
  });
  //Access the token
  // Generating token
  const token = await jwt.sign(
    { id: user._id, firstName, lastName, email },
    "jsonwebtokentkey",
    {
      expiresIn: "30d",
    }
  );
  //Data for sending to frontend without password
  const createdUser = await User.findById(user._id).select("-password");

  if (createdUser) {
    throw new ApiError(400, "something went wrong while registering the user");
  }

  //send cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("Token", token, options)
    .json(
      new ApiResponse(200, createdUser, token, "User Created Successfully...")
    );
});
const LoginUser = asyncHandler(async (req, res) => {
  // getting data from frontend
  const { email, password } = req.body;
  //   checking validation
  if (!(email && password)) {
    throw new ApiError(400, "All fields are required...!");
  }
  //Checking for existed  user
  const user = await User.findOne({
    $or: [{ email }, { password }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist...");
  }
  //checking password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid Password...");
  }
  // Generating token
  const token = await jwt.sign({ id: user._id }, "jsonwebtokentkey", {
    expiresIn: "30d",
  });
  //send cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("Token", token, options)
    .json(new ApiResponse(200, token, "User LoggedIn Successfully..."));
});

const LogoutUser = asyncHandler(async (req, res) => {
  try {
    // Set the user's token to undefined in the database
    const { id } = req.body;
    await User.findByIdAndUpdate(id, { token: undefined });

    // Options for clearing the cookie
    const options = {
      httpOnly: true,
      secure: true,
    };

    // Clear the cookie (assuming the cookie name is "Token")
    return res
      .status(200)
      .clearCookie("Token", options)
      .json(new ApiResponse(200, null, "User logged out successfully"));
  } catch (error) {
    throw new ApiError(400, "Something went wrong while logging out the user.");
  }
});

export { RegisterUser, LoginUser, LogoutUser };
