import { Schema, model } from "mongoose";

const categorySchema = Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

const categoryModel = model("category", categorySchema);

export default categoryModel;
