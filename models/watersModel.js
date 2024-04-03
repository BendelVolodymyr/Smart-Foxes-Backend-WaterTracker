import { model, Schema } from "mongoose";

const waterSchema = new Schema(
  {
    dateAdded: {
      type: Date,
      require: true,
    },
    waterRate: {
      type: Number,
      require: true,
      min: 0,
      max: 5000,
    },
    waterVolume: {
      type: Number,
      require: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false }
);

const Water = model("watersDays", waterSchema);

export default Water;
