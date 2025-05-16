import express, {Router} from "express";
import { createTask } from "../controllers/task/taskController.js";

const router = express.Router();

router.post("/task/create", createTask)

export default router;