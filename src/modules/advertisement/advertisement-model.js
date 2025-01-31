import { model, Schema } from "mongoose";

const AdvertisementSchema = new Schema(
  {
    options: Object,
    city: { type: String, trim: true },
    amount: { type: Number, default: 0 },
    address: { type: String, trim: true },
    province: { type: String, trim: true },
    district: { type: String, trim: true },
    coordinates: { type: [Number], required: true },
    imagesName: { type: [String], default: undefined },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      index: true,
      required: true,
    },
  },
  { strict: true, timestamps: true }
);

const Advertisement = model("Advertisement", AdvertisementSchema);
export default Advertisement;
