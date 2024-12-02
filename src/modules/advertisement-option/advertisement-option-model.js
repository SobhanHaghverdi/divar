import { model, Schema, Types } from "mongoose";

const AdvertisementOptionSchema = new Schema(
  {
    guide: { type: String, trim: true },
    enum: { type: Array, default: undefined },
    required: { type: Boolean, default: false },
    key: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    type: {
      type: String,
      required: true,
      enum: ["number", "string", "array", "boolean"],
    },
  },
  { strict: true }
);

const AdvertisementOption = model(
  "AdvertisementOption",
  AdvertisementOptionSchema,
  "advertisementOptions"
);

export default AdvertisementOption;
