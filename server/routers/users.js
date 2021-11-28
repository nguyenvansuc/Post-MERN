import express from 'express';
import * as postController from '../controllers/users.js'
import { checkLogin } from '../controllers/authentic.js';

const router=express.Router()

router.post('/',postController.getUser)
router.post('/create/',postController.createUser)
// router.use(protect);
router.post('/password/',checkLogin,postController.changePassword)
// router.use(isAdmin);
// router.post('/admin/',protect,postController.changePassword)
export default router