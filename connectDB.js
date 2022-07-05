import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://molotok27:molotok27@cluster0.qhaihuk.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("соединилось с монго");
  })
  .catch((e) => {
    console.log("ошибка соединения с монго", e);
  });
