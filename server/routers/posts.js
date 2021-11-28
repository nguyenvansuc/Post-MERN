import express from 'express';
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
  likePost,getFavoritePost,getMyPosts
} from '../controllers/posts.js';
import {checkLogin} from '../controllers/authentic.js'

const router = express.Router();

router.get('/details/:id',getPost)

router.get('/', getAllPosts);

router.post('/', createPost);

router.put('/update', updatePost);

router.delete('/delete/', deletePost);

router.post('/like',likePost)

router.get('/favorite',checkLogin,getFavoritePost)

router.get('/myPosts',checkLogin,getMyPosts)
export default router;
