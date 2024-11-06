import userModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exist, please login",
        success: false,
      });
    }
    const UserModel = new userModel({ name, email, password });
    UserModel.password = await bcrypt.hash(password, 10);
    await UserModel.save();
    res.status(201).json({ message: "SignUp Successfull!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const ispasswordMatch = await bcrypt.compare(password, user.password);
      if (ispasswordMatch) {
        const jwtToken = jwt.sign({email: user.email, _id: user._id},
          process.env.JWT_SECRET,
          {expiresIn: "24h"}
        )
        return res.status(201).json({
          message: "Login Successfull!",
          success: true,
          jwtToken,
          email,
          name: user.name,
        });
      } else {
        return res
          .status(403)
          .json({ message: "Invalid Email or Password!", success: false });
      }
    } else {
      return res
        .status(404)
        .json({ message: "User not found, please signup!", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};
export { signup, login };
