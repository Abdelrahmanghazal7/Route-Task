import { Router } from "express";
import * as category from "./category.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/", auth, category.createCategory);

router.get("/", auth, category.getCategories);

router.put("/:id", auth, category.updateCategory);

router.delete("/:id", auth, category.deleteCategory);

export default router;
