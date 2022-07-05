import PostModel from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось статьи",
    });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id; // берем этот параметр из роута ":id" может быть любой
    // для просмотров испоьзуем не findOne
    PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось вернуть статью",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
        }
        res.json(doc);
      }
    )
      .populate("user")
      .exec();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось статьи",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id; // берем этот параметр из роута ":id" может быть любой

    PostModel.findByIdAndDelete({
      _id: postId,
    },(err,doc)=>{
      if(err){
          console.log(err);
          res.status(500).json({
            message: "Не удалось удалить статью",
          });
      }
      if(!doc) {
          return res.status(404).json({
            message: "Статья не найдена",
          });
      }
      res.json({
        message: "Статья удалена",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удить статью",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tegs: req.body.tegs.split(','),
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать пост",
    });
  }
};


export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tegs: req.body.tegs.split(','),
        user: req.userId,
      }
    );
    res.json({
      message: "Статья обновлена",
    });
  } catch (err) {
     console.log(err);
     res.status(500).json({
       message: "Не удалось обновить пост",
     });
  }
};


export const getAllTegs = async (req,res)=> {
   try {
     const posts = await PostModel.find().limit(5).exec();
     const tegs = posts.map(item=>item.tegs.flat().slice(0,5))
     res.json(tegs);
   } catch (err) {
     console.log(err);
     res.status(500).json({
       message: "Не удалось получить теги",
     });
   }
}