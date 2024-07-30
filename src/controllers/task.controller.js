import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get all tasks for a user
const getTasks = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    if (!tasks || tasks.length === 0) {
        throw new ApiError(404, 'No tasks found');
    }

    return res.status(200).json(new ApiResponse(200, tasks, 'Tasks fetched successfully'));
});

// Create a new task
const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority, deadline } = req.body;
    const userId = req.user._id;

    // Check if mandatory fields are provided and not empty
    if (!title?.trim()) {
        throw new ApiError(400, 'Title is required');
    }

    if (!status?.trim()) {
        throw new ApiError(400, 'Status is required');
    }

    const task = new Task({
        userId,
        title,
        description,
        status,
        priority,
        deadline
    });

    await task.save();

    return res.status(201).json(new ApiResponse(201, task, 'Task created successfully'));
});

// Get a single task by ID
const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        throw new ApiError(404, 'Task not found');
    }

    return res.status(200).json(new ApiResponse(200, task, 'Task fetched successfully'));
});


const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, deadline } = req.body;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
        throw new ApiError(404, 'Task not found or not authorized');
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.deadline = deadline || task.deadline;

    await task.save();

    return res.status(200).json(new ApiResponse(200, task, 'Task updated successfully'));
});

const changeStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
        throw new ApiError(404, 'Task not found or not authorized');
    }

    task.status = status || task.status;
    await task.save();

    return res.status(200).json(new ApiResponse(200, task, 'Task Status Change successfully'));
});

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
        throw new ApiError(404, 'Task not found or not authorized');
    }

    await task.deleteOne();

    return res.status(200).json(new ApiResponse(200, null, 'Task deleted successfully'));
});

export {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    changeStatus,
    deleteTask
};
