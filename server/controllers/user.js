import bcrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import User from "../models/user.js"
import dotenv from "dotenv";


dotenv.config();
const secret = process.env.SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrpt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    if (error.message === "User doesn't exist") {
      return res.status(404).json({ message: "User doesn't exist" });
    } else if (error.message === "Invalid credentials") {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }

  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords dont match" });
    const hashedPassword = await bcrpt.hash(password, 12);
    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

  }
}
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that Id');
  await User.findByIdAndRemove(id);
  res.json({ message: 'User Account Deleted Succesfully' })
}

export const profile = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, email, followers, following, _id } = await User.findById(id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json({ name, email, followers, following, _id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const followUser = async (req, res) => {
  const { id } = req.params; // logged-in user can follow the user with this id
  if (!req.userId) return res.json({ message: "Unathenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No person with that Id");
  const userToFollow = await User.findById(id);
  const loggedUser = await User.findById(req.userId);

  const index = userToFollow.followers.findIndex(
    (userId) => userId === String(req.userId)
  );

  if (index === -1) {
    userToFollow.followers.push(req.userId);
    loggedUser.following.push(id);
  } else {
    userToFollow.followers = userToFollow.followers.filter(
      (userId) => userId !== String(req.userId)
    );
    loggedUser.following = loggedUser.following.filter(
      (id_1) => id_1 !== String(id)
    );
  }

  await User.findByIdAndUpdate(req.userId, loggedUser, { new: true });
  const updatedUserToFollow = await User.findByIdAndUpdate(id, userToFollow, {
    new: true,
  });

  res.json({ userToFollow: updatedUserToFollow });
};
