import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachment: String,
    likeCount: {
      type: Array,
      default:[],
      required: true,
    },
    idUser:{
      type: String,
      required: true,
      default:"6194cfd18a69542d307ce053",
    },
    username:{
      type:String,
      default:"Anonymous",
      required: true
    },
    category:{
      type:Array,
      required: true,
      default:['other']
    },
    imageUrl:{
      type: String,
      required: true,
      default:"https://images.wallpaperscraft.com/image/single/girl_book_text_169236_1920x1080.jpg"
    }
  },
  { timestamps: true },
  {collection:'posts'},
);

const PostModel = mongoose.model('Post', PostSchema);
export default PostModel;
