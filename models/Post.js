import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tegs: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:'User',
      required:true,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Post", PostSchema);