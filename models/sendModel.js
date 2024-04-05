import { model, Schema } from "mongoose";

const passwordResetSchema = new Schema(
  {
    temporaryId: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const PasswordReset = model("passwordReset", passwordResetSchema);

export default PasswordReset;
