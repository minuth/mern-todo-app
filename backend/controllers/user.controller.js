import userModel from "../models/user.model.js";
import { getUser, loginUser, registerUser } from "../services/user.service.js";

//login user
const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

//register user
const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(error.code ?? 500).json({ message: error.message });
  }
};

//get user info
const info = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await getUser({ userId });
    res.status(200).json({ user });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
export const userController = { login, register, info };
