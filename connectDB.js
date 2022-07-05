import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("соединилось с монго");
  })
  .catch((e) => {
    console.log("ошибка соединения с монго", e);
  });
