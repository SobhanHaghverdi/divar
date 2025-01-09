import { model, Schema, Types } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    imageName: { type: String, required: true, trim: true },
    parent: { type: Types.ObjectId, ref: "Category", index: true },
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

function autoPopulate(next) {
  this.populate([{ path: "children" }]);
  next();
}

CategorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);
const Category = model("Category", CategorySchema);

export default Category;
