const { model, Schema, Types } = require("mongoose");

const AdvertismentSchema = new Schema(
  {
    coordinates: { type: [Number], required: true },
    city: { type: String, required: true, trim: true },
    imagesName: { type: [String], default: undefined },
    title: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: Types.ObjectId,
      ref: "Category",
      index: true,
      required: true,
    },
  },
  { strict: true }
);

const Advertisment = model("Advertisment", AdvertismentSchema);
export default Advertisment;
