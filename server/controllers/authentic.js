import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'

export const protect = async function (req, res, next) {
  try {
    let token;

    if (
      req.header.authorization &&
      req.header.authorization.startWith('Bearer')
    ) {
      token = req.header.authorization.split(' ')[1];
    }
    if (token) {
      jwt.verify(token, 'userToken', function (err, decoded) {
        // err
        if (err) {
        }
        console.log({ decoded });
        const user = UserModel.findById(decoded.id);
        if (!user) {
          return res.status(400).json({ message: 'User khong ton tai' });
        }
        //user = {thang}
        req.user = user;
        next();
        // decoded undefined
      });
      next();
    }
    console.log('No token')
    res.status(400).json('Chua dang nhap');
  } catch (error) {}
};
export const isAdmin = function (req, res, next) {
  const user = req.user;
  if(!user.roles){

  }
  next();
};


export const checkLogin=async(req, res, next)=> {
try {
  console.log('1')
  let token=null;
  console.log(req.headers.authorization,'xxx')
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log({token},'token')
  }
  if(token==='null') {
    console.log('1')
    return res.status(401).json({ message:'No Logged in !'});
  }
  jwt.verify(token,'userToken',function(error, decode){
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx')
    if(error) {
      return res.status(400).json({message:error})
    }
    const idUser=decode?.id
    req.idUser= idUser
    next()
  })
} catch (error) {
  return res.status(400).json({message:error})
}
}