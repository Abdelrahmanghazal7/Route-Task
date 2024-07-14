import { Schema, model } from "mongoose";

const taskSchema = Schema({
  title: String,
  body: String,
  type: { type: String, enum: ["text", "list"] },
  listItems: [String],
  isPublic: Boolean,
  category: { type: Schema.Types.ObjectId, ref: "category" },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

const taskModel = model("task", taskSchema);

export default taskModel;
