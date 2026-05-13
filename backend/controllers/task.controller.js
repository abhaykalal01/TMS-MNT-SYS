import Task from "../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      owner: req.user._id // Assuming auth middleware sets req.user
    };
    const task = new Task(taskData);
    const savedTask = await task.save();
    return res
      .status(201)
      .json({ message: "Task created successfully", data: savedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to create task", error: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch tasks", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Task fetched successfully", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch task", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Task updated successfully", data: updatedTask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to update task", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Task deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to delete task", error: error.message });
  }
};
