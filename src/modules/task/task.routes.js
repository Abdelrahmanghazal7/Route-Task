import { Router } from "express";
import * as task from "./task.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/", auth, task.createtask);

router.get("/", auth, task.getTasks);

router.put("/:id", auth, task.updatetask);

router.delete("/:id", auth, task.deletetask);

export default router;
