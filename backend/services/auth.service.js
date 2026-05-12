import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUserService = async (data) => {
    const { name, email, password, role } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    const token = generateToken(user._id);

    return {
        user,
        token
    };
};

export const loginUserService = async (data) => {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id);

    return {
        user,
        token
    };
};