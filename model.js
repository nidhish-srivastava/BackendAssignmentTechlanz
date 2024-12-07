import { model, Schema } from "mongoose";

const metadataSchema = new Schema({
  filename: { type: String, required: true },
  size: { type: Number, required: true }, // size in bytes
  mimeType: { type: String, required: true },
},{
    timestamps : true
});

export const Metadata = model("Metadata", metadataSchema);
