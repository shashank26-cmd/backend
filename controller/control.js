const userModel = require("../model/userSchema.js");
const emailValidator=require('email-validator');
const bcrypt=require('bcryptjs');
// const jwt=require('jsonwebtoken');


const signup=async(req,res,next)=>{
    const{ name,email,password,confirmPassword }=req.body; // send me this info in req.body
    console.log(name,email,password,confirmPassword);
    if(!name||!email||!password||!confirmPassword){
        return res.status(400).json({
            success:false,
            message:"everything is not present"
        
        })
    }
    const validEmail=emailValidator.validate(email)
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:" give email properly "
        
        })
    }
    if(password !== confirmPassword)
{
    return res.status(400).json({
        success:false,
        message:"password is not right"
    
    })
}  ; 

try{
    //  kisine   body mai send kiya hai so responsibility to save the data
        const userInfo=userModel(req.body);// instance
        const result=await userInfo.save(); //save data  directly 
        return res.status(200).json({
            success:true,
            data:result //data save kiya upar now send data as response
        });
    }
 catch(e){
    if(e.code === 11000){ //dublicate entry
        return res.status(400).json({
          success:false,
          message:'user already exist '
        })
    }
    return res.status(400).json({
        success:false,
        message:e.message
    })
 }


}


const signin=async(req,res)=>{
    const { email, password }=req.body;

if(!email || !password){
    return res.status(400).json({
success:false,
message:"Every field is mandatory"

    })

    }
  try{
    const user=await userModel
    .findOne({
        email
    })
    .select('+password'); // explicitly password mang raha hai

 if(!user||!(await bcrypt.compare(password,user.password))){//encypt passs and sadha pass compare
    return res.status(400).json({
        success:false,
        message:"USER DOES NOT EXIST OR PASSWORD DOEST NOT MATCH"
        
            })
        
 }   

// generate token

// cookie bar bar req leke jata hai uske ander token rhta hai 

 const token=user.jwtToken();// this is defined at schemma

 user.password=undefined;

 const cookieOption={
    maxAge:24*60*60*1000,
    httpOnly:true //u cannot access through js
 };


 // in res i need to save token in cookie


 res.cookie("token",token,cookieOption);
 res.status(200).json({
    success:true,
    data:user
 })

} catch(e){
    res.status(400).json({
success:false,
message:e.message
    })
}}



const getUser=async(req,res,next)=>{
const userId=req.user.id;  //user ki info kon dega  and validate kon raha hai login hai ki nhi so we use middleware
try{
    // if login hi mera token exist karta hai so info lake dedunga
const user=await userModel.findById(userId);
return res.status(200).json({
    success:true,
    data:user
});
}
catch(e){
    return res.status(400).json({
        success:false,
      message:e.message
    });
}
}

const logout=(req,res,next)=>{
try{
    const cookieOption={
        expires:new Date(),
        httpOnly:true
    };
    res.cookie("token",null,cookieOption); //token null set 
    res.status(200).json({
        success:true,
       message:"Logged Out"
    });
}catch(e){
     res.status(400).json({
        success:false,
      message:e.message
    });
}
}
module.exports={
    signup : signup,
    signin : signin,
    getUser:getUser,
    logout:logout,
}