import express from "express";
import userRouter from "./src/modules/user/user.routes.js";
import categoryRouter from "./src/modules/category/category.routes.js";
import taskRouter from "./src/modules/task/task.routes.js";
import connectionDB from "./db/connectionDB.js";
import { AppError } from "./src/utils/classError.js";
import { globalErrorHandling } from "./src/utils/globalErrorHandling.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

connectionDB();

app.use(express.json());

app.use("/user", userRouter);

app.use("/categories", categoryRouter);

app.use("/tasks", taskRouter);

app.use("*", (req, next) => {
  return next(new AppError(`invalid url ${req.originalUrl}`, 404));
});

app.use(globalErrorHandling);

app.listen(port, () => console.log(`app running on port ${port}`));
