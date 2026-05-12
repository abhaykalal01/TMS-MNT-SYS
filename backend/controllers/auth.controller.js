import {
    registerUserService,
    loginUserService
} from "../services/auth.service.js";

export const registerUser = async (req, res) => {
    try {
        const data = await registerUserService(req.body);

        res.status(201).json({
            success: true,
            message: "User registered",
            data
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const data = await loginUserService(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};