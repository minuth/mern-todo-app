import { createToken } from "../common/utils/jwt.utils.js";
import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { ServiceError } from "../common/error.js";

//register user
export const registerUser = async (param) => {
  const { name, email, password } = param;
  //check if user already exists
  const exists = await userModel.findOne({ email });
  if (exists) {
    throw new ServiceError("User already exists", 400);
  }
  if (
    validator.isEmpty(name) ||
    validator.isEmpty(email) ||
    validator.isEmpty(password)
  ) {
    throw new ServiceError("Please enter all fields", 400);
  }
  if (!validator.isEmail(email)) {
    throw new ServiceError("Please enter a valid email", 400);
  }
  if (!validator.isLength("6")) {
    throw new ServiceError("Password length must be 6", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({ name, email, password: hashedPassword });
  const user = await newUser.save();
  const token = createToken({ id: user._id });

  return { user: mapUserDto(user), token };
};

//login user
export const loginUser = async (param) => {
  const { email, password } = param;
  if (!email || !password) {
    throw new ServiceError("PPlease enter all fields", 400);
  }
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new ServiceError("User does not exist", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ServiceError("Invalid credentials", 400);
  }
  const token = createToken({ id: user._id });
  return { user: mapUserDto(user), token };
};

export const getUser = async (param) => {
  const { userId } = param;
  const user = await userModel.findOne({ _id: userId });
  return mapUserDto(user);
};

const mapUserDto = (user) => {
  return { id: user._id, name: user.name, email: user.email };
};
