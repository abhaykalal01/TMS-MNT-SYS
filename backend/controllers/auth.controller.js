import asyncHandler from "../utils/asyncHandler.js";

import {
    registerUserService,
    loginUserService
} from "../services/auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {
    const data = await registerUserService(req.body);

    res.status(201).json({
        success: true,
        message: "User registered",
        data
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const data = await loginUserService(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data
    });
});