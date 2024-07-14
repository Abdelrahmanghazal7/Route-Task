import userModel from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import { AppError } from "../../utils/classError.js";

// =========================================== REGISTRATION ===========================================

const registration = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return next(new AppError("user already exist", 400));
  }

  // Hash the password
  const hash = bcrypt.hashSync(password, 8);

  // Create a new user
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  res.status(200).json({ msg: "done", user });
};

export const signUp = asyncHandler(registration);

// =========================================== LOGIN ===========================================

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  // Check if user exist
  if (!user) {
    return next(new AppError("invaild user", 409));
  }

  // Compare passwords
  if (!bcrypt.compareSync(password, userModel.password)) {
    return next(new AppError("password incorrect", 400));
  }

  // Generate JWT token
  const payload = {
    user: {
      email,
    },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).json({ token });
};

export const signIn = asyncHandler(login);
