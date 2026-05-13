import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import protect from "../middleware/auth.middleware.js";
import { managerOnly } from "../middleware/role.middleware.js";
import { validateTask, validateTaskParams, createTaskSchema, updateTaskSchema, taskIdSchema } from "../validators/task.validator.js";

const router = express.Router();

// Employee routes
router.get("/getAllTasks", protect, getAllTasks);
router.get("/getTask/:id", protect, validateTaskParams(taskIdSchema), getTaskById);
router.post("/createTask", protect, validateTask(createTaskSchema), createTask);
router.put("/updateTask/:id", protect, validateTaskParams(taskIdSchema), validateTask(updateTaskSchema), updateTask);
router.delete("/deleteTask/:id", protect, validateTaskParams(taskIdSchema), deleteTask);

// Manager routes (protected)
router.get("/manager/getAllTasks", protect, managerOnly, getAllTasks);
router.get("/manager/getTask/:id", protect, managerOnly, validateTaskParams(taskIdSchema), getTaskById);
router.post("/manager/createTask", protect, managerOnly, validateTask(createTaskSchema), createTask);
router.put("/manager/updateTask/:id", protect, managerOnly, validateTaskParams(taskIdSchema), validateTask(updateTaskSchema), updateTask);
router.delete("/manager/deleteTask/:id", protect, managerOnly, validateTaskParams(taskIdSchema), deleteTask);

export default router;
