import { model, Schema } from "mongoose";

const AdvertisementSchema = new Schema(
  {
    coordinates: { type: [Number], required: true },
    city: { type: String, required: true, trim: true },
    imagesName: { type: [String], default: undefined },
    title: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      index: true,
      required: true,
    },
  },
  { strict: true }
);

const Advertisement = model("Advertisement", AdvertisementSchema);
export default Advertisement;
