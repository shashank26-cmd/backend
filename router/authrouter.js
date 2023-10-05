const express=require('express');
const { signup,signin,getUser,logout }=require('../controller/control.js');
const jwtAuth = require('../middlewarre/jwtAuth.js');
const authRouter=express.Router();

authRouter.post('/signup',signup); // entity create so post
authRouter.post('/signin',signin);
authRouter.get('/user',jwtAuth,getUser); //authenticate karenge jwt token ko waha se kuch info nikalenge uske badd getuser par bhejengej {getuser pahuchne se paile sabse pahile jwt ke pass jaye}
authRouter.get('/logout',jwtAuth,logout);//simple delete token or cookie ko invalid krdes
module.exports=authRouter;