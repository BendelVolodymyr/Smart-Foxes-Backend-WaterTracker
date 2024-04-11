import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const { API_SECRET_CLOUDINARY, API_KEY_CLOUDINARY, CLOUD_NAME_CLOUDINARY } =
  process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME_CLOUDINARY,
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY,
});

export default cloudinary;
