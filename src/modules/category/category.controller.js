import categoryModel from "../../../db/models/category.model.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";

// =========================================== Create category ===========================================

const createC = async (req, res) => {
  const { name } = req.body;
  const category = new categoryModel({ name, user: req.user._id });
  await category.save();
  return res.status(201).json({ msg: "done", category });
};

export const createCategory = asyncHandler(createC);

// =========================================== Get categories (with optional filtering and sorting) ===========================================

const getC = async (req, res) => {
  const { sortBy, filterByName } = req.query;
  const query = { user: req.user._id };
  if (filterByName) query.name = filterByName;

  const categories = await categoryModel
    .find(query)
    .sort(sortBy ? { name: sortBy } : {});
  res.send(categories);
};

export const getCategories = asyncHandler(getC);

// =========================================== Update category ===========================================

const updateC = async (req, res) => {
  const category = await categoryModel.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.send(category);
};

export const updateCategory = asyncHandler(updateC);

// =========================================== Delete category ===========================================

const deleteC = async (req, res) => {
  await categoryModel.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  res.status(204).send();
};

export const deleteCategory = asyncHandler(deleteC);
