import PostsModel from '../models/postsModel.js';
import UserModel from '../models/userModel.js';

export const getPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await PostsModel.findById(id).exec();
    res.status(200).json(result);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

export const getAllPosts = async function (req, res) {
  try {
    // const post=new PostsModel({
    //     title:"tess5",
    //     content:"irene",
    //     imageUrl:"https://c4.wallpaperflare.com/wallpaper/397/282/460/irene-red-velvet-k-pop-bae-joo-hyun-singer-hd-wallpaper-thumb.jpg",
    //     category:["flower","natural"]
    // })
    // post.save()
    
    let { category, title,idFavoriteUser } = req?.query;
    let filters = {};
    if (category) {
      category = { category: { $in: [category] } };
    }
    if (title) {
      title = { title: { $regex: title, $options: 'i' } };
    }
    if(idFavoriteUser){
      idFavoriteUser={likeCount:{$in:[idFavoriteUser]}}
    }
    filters = Object.assign({}, filters, category, title,idFavoriteUser);
    console.log(filters, 'filter');
    const allPosts = await PostsModel.find(filters);
    res.status(200).json(allPosts);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = req.body;
    console.log('post', newPost);
    if (!newPost?.category) {
      delete newPost.category;
      const post = new PostsModel(newPost);
    const result= await post.save();
      res.status(200).json(result);
      return;
    }
    const listCategory = newPost?.category.split(',');
    console.log('list', listCategory);
    const post = new PostsModel({...newPost,category: listCategory});
    const result= await post.save();
    res.status(200).json('Add success !');
  } catch (error) {
    console.log('error', error);
    res.status(500).json(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const updatePost = req.body;
    const newPost = await PostsModel.findOneAndUpdate(
      { _id: updatePost._id },
      updatePost,
      { new: true }
    );
    res.status(200).json(newPost);
  } catch (error) {
    console.log('error', error);
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = req.body;
    const deletePost = await PostsModel.deleteOne({ _id: post._id });
    res.status(200).json(deletePost);
  } catch (error) {
    console.log('error', error);
    res.status(500).json(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const idPost = req.body.idPost;
    const idUser = req.body.idUser;
    const result = await PostsModel.findById(idPost);
    if (result) {
      const check = result?.likeCount.includes(idUser);
      var newLikeCount = [...result?.likeCount];
      if (!check) {
        newLikeCount = result?.likeCount.concat([idUser]);
      } else {
        newLikeCount = result?.likeCount.filter((item) => item !== idUser);
      }
      await PostsModel.findByIdAndUpdate(idPost, { likeCount: newLikeCount });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).json(error);
  }
};

export const getFavoritePost=async(req, res) => {
  try {
    const idUser = req.idUser
    console.log(idUser,'idUser');
  const result= await PostsModel.find({likeCount:{$in:[idUser]}});
  console.log(result,'result')
  res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getMyPosts=async (req,res) => {
  try {
    const idUser = req.idUser
    console.log(idUser,'idUser');
  const result= await PostsModel.find({idUser:idUser});
  console.log(result,'result')
  res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
}

