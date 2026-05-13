import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
<<<<<<< HEAD
import userRoutes from "./routes/user.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";
=======
import taskRoutes from "./routes/task.routes.js";
>>>>>>> 2776801 (feat: implement task management functionality with CRUD operations and validation)

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api/users", userRoutes);

// Error Middleware
app.use(errorMiddleware);

export default app;