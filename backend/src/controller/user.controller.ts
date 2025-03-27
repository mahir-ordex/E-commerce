import { Request, Response, CookieOptions } from "express";
import JWT from "jsonwebtoken";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: "none" as "none",
  secure: true,
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: "All fields are required" });
    return;
  }

  try {
    if (await User.findOne({ email })) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "consumer",
    });

    const refreshToken = JWT.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "30d" }
    );
    const accessToken = JWT.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res
      .status(201)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json({
        msg: "User registered successfully",
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        accessToken,
      });
  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return 
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ msg: "Invalid credentials" });
      return 
    }

    // Generate tokens
    const refreshToken = JWT.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "30d" }
    );
    const accessToken = JWT.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store refresh token in the database
    user.refreshToken = refreshToken;

    // Check if it's the first login
    const isFirstLogin = user.firstLogin;
    if (isFirstLogin) {
      user.firstLogin = false; // Update firstLogin to false
    }

    await user.save();

    res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json({
        msg: "User logged in successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isFirstLogin,
        },
        accessToken,
      });
  } catch (err: any) {
    console.error("Error in signIn:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};


export const signOut = async (req: Request, res: Response): Promise<void> => {
  res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json({ msg: "User logged out successfully" });
};
