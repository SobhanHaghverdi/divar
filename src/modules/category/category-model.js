import { model, Schema, Types } from "mongoose";

const CategorySchema = new Schema(
  {
    parent: { type: Types.ObjectId, ref: "Category" },
    name: { type: String, required: true, trim: true },
    parents: { type: [Types.ObjectId], ref: "Category", default: undefined },
    slug: {
      type: String,
      trim: true,
      index: true,
      required: true,
      lowercase: true,
    },
  },
  { strict: true, toJSON: { virtuals: true }, versionKey: false, id: false }
);

CategorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

const Category = model("Category", CategorySchema);

export default Category;
