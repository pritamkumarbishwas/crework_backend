import { Router } from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Task routes
router.route("/").get(verifyJWT, getTasks);
router.route("/").post(verifyJWT, createTask);

router.route("/:id").get(verifyJWT, getTaskById)
router.route("/:id").patch(verifyJWT, updateTask)
router.route("/:id").delete(verifyJWT, deleteTask);

export default router;
