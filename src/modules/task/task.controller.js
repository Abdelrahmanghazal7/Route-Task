import taskModel from "../../../db/models/task.model.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";

// =========================================== Create task ===========================================

const createT = async (req, res) => {
  const { title, body, type, listItems, isPublic, category } = req.body;
  const task = new taskModel({
    title,
    body,
    type,
    listItems,
    isPublic,
    category,
    user: req.user._id,
  });
  await task.save();
  res.status(201).send(task);
};

export const createtask = asyncHandler(createT);

// =========================================== Get categories (with optional filtering and sorting) ===========================================

const getT = async (req, res) => {
  const {
    sortBy,
    filterByCategory,
    filterByVisibility,
    page = 1,
    limit = 10,
  } = req.query;
  const query = {};
  if (filterByCategory) query.category = filterByCategory;
  if (filterByVisibility) query.isPublic = filterByVisibility === "public";

  const tasks = await taskModel
    .find(query)
    .sort(sortBy ? { title: sortBy } : {})
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.send(tasks);
};

export const getTasks = asyncHandler(getT);

// =========================================== Update task ===========================================

const updateT = async (req, res) => {
  const task = await taskModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.send(task);
};

export const updatetask = asyncHandler(updateT);

// =========================================== Delete task ===========================================

const deleteT = async (req, res) => {
  await taskModel.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.status(204).send();
};

export const deletetask = asyncHandler(deleteT);
