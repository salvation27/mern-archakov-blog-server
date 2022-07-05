import express from "express";
import { registerValidator, loginValidator } from "./validations/auth.js";
import { getMe, login, register,createPost, getAllPosts,getOnePost,deletePost,updatePost ,getAllTegs} from "./controllers/index.js";
import {postCreateValidation} from './validations/post.js'
import multer from 'multer'
import {handleValidationErrors ,checkAuth} from './utils/index.js'
import cors from 'cors'

import  './connectDB.js'


const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({storage})

// учим приложение распозновать формат json
app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"));

// валидируем данные которые приходят с формы

app.post("/auth/login", loginValidator,handleValidationErrors, login);
app.post("/auth/register", registerValidator, handleValidationErrors, register);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get("/tegs", getAllTegs);
app.get("/posts/", getAllPosts);
app.get("/posts/tegs", getAllTegs);
app.get("/posts/:id", getOnePost);
app.post("/posts", checkAuth, postCreateValidation,handleValidationErrors, createPost);
app.delete("/posts/:id", checkAuth, deletePost);
app.patch("/posts/:id", checkAuth,postCreateValidation, handleValidationErrors, updatePost);




app.listen(1234, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok7");
});
