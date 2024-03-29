import { Schema, model } from 'mongoose';
// потрібно уточнити що ще будем передавати!
const watersSchema = new Schema(
  {
    waterRate: {
      type: String,
      required: [true, 'waterRate is required'],
    },
    waterVolume: {
      type: String,
      required: [true, 'waterVolume is required'],
    },
    date: {
      type: String,
      required: [true, 'date is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

export const Waters = model('watersDays', watersSchema);
