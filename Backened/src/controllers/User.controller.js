import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Token  Function
const generateAccessToken = async (userId) => {
  try {
    const user = User.findById(userId);
    const Token = user.generateToken();
    User.token = Token;
    User.save({ validateBeforeSave: false });
    return { Token };
  } catch (error) {
    throw new ApiError(400, "Something went wrong while generating token..");
  }
};

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
  const { Token } = generateAccessToken(user._id);
  //Data for sending to frontend without password
  const createdUser = User.findById(user._id).select("-password");

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
    .cookie("Token", Token, options)
    .json(new ApiResponse(200, createdUser, "User Created Successfully..."));
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
  //generate and Access Token
  const { Token } = generateAccessToken(user._id);
  //send cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("Token", Token, options)
    .json(new ApiResponse(200, Token, "User LoggedIn Successfully..."));
});

const LogoutUser = asyncHandler(async (req, res) => {
  //making token undefined
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: [
        {
          token: undefined,
        },
      ],
    });
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie(Token, options)
      .json(new ApiResponse(200, Token, "User loggedout Successfully..."));
  } catch (error) {
    throw new ApiError(400, "Someting went wrong while logout the user..");
  }
});

export { RegisterUser, LoginUser, LogoutUser };
