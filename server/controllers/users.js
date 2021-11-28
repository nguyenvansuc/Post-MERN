import UserModel from '../models/userModel.js';
import {checkLogin} from './authentic.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password })
    const result = await UserModel.findOne({ username }).exec();
    console.log(result,'result')
    if (!result) return res.json('Incorrect user');
    console.log(result?.correctPassword,'correct')

    if ((await result.correctPassword(password, result.password))===false) {
      return res.status(400).json('Mat khau sai');
    }

    const resData = { id: result?._id, username: result?.username };
    var token = jwt.sign(resData, 'userToken', { expiresIn: '7d' });
    res.status(200).json({ token: token, user: resData });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    const username = req.body.username;
    console.log(user);
    const result = await UserModel.findOne({ username: username }).exec();
    if (result) {
      res.status(200).json('User already exists. create another username !!!');
    } else {
      // await UserModel.create(user)
      // res.status(200).json(`Successfully created user with username : ${username}`)
      const newUser = new UserModel(user);
      let hi = await newUser.save();
      console.log({ hi });
      res
        .status(200)
        .json(`Successfully created user with username : ${username}`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const changePassword = async (req, res) => {
  try {
    const idUser=req.idUser
    const {password,newPassword} = req.body
    console.log(req.body,'body1111')
    const result = await UserModel.findById(idUser);
    console.log(result,'result')
    if (!result){
      return res.json({message:'User incorrect !'})
    }
    
    if ((await result.correctPassword(password, result.password))===false) {
      return res.json({message:'Password incorrect'});
    }
    const pass = await bcrypt.hash(newPassword, 12);
    console.log(pass)
    const resData=await UserModel.findByIdAndUpdate(idUser,{password:pass})
    console.log(resData,'ress')
    res.status(200).json({message:'completely!'})
  } catch (error) {
    res.status(500).json(error);
  }
};
