import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { managerOnly } from "../middleware/role.middleware.js";
import { validateTask, validateTaskParams, createTaskSchema, updateTaskSchema, taskIdSchema } from "../validators/task.validator.js";

const router = express.Router();

// Employee routes
router.get("/getAllTasks", getAllTasks);
router.get("/getTask/:id", validateTaskParams(taskIdSchema), getTaskById);
router.post("/createTask", validateTask(createTaskSchema), createTask);
router.put("/updateTask/:id", validateTaskParams(taskIdSchema), validateTask(updateTaskSchema), updateTask);
router.delete("/deleteTask/:id", validateTaskParams(taskIdSchema), deleteTask);

// Manager routes (protected)
router.get("/manager/getAllTasks", managerOnly, getAllTasks);
router.get("/manager/getTask/:id", managerOnly, validateTaskParams(taskIdSchema), getTaskById);
router.post("/manager/createTask", managerOnly, validateTask(createTaskSchema), createTask);
router.put("/manager/updateTask/:id", managerOnly, validateTaskParams(taskIdSchema), validateTask(updateTaskSchema), updateTask);
router.delete("/manager/deleteTask/:id", managerOnly, validateTaskParams(taskIdSchema), deleteTask);

export default router;
