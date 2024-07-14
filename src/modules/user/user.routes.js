import { Router } from "express";
import * as users from "./user.controller.js";

const router = Router();

router.post("/signUp", users.signUp);

router.post("/signIn", users.signIn);

export default router;
