import asyncHandler from "../utils/asyncHandler.js";

import {
    registerUserService,
    loginUserService
} from "../services/auth.service.js";

const sanitizeUser = (user) => {
    if (!user) return null;
    const userObject = user.toObject ? user.toObject() : user;
    const { password, __v, ...cleanUser } = userObject;
    return cleanUser;
};

export const registerUser = asyncHandler(async (req, res) => {
    const data = await registerUserService(req.body);

    res.status(201).json({
        success: true,
        message: "User registered",
        data: {
            user: sanitizeUser(data.user),
            token: data.token
        }
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const data = await loginUserService(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            user: sanitizeUser(data.user),
            token: data.token
        }
    });
});