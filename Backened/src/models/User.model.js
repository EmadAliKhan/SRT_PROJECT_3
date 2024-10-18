import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    ConfirmPassword: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true }
);

// Encrypt the password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// checking The Password
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
//generate Token
UserSchema.methods.generateToken = async function () {
  return JWT.sign(
    {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lasName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("user", UserSchema);
