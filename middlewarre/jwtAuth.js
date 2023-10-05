const JWT=require('jsonwebtoken');
const jwtAuth=(req,res,next)=>{
const token=(req.cookies&&req.cookies.token)||null; //token nikalte hai req.coookies use karehe hai uske ander ka token nikalne ke liye sara ka sar data sevilised form mai ata hai kisi ns kisi  ko isko json form mai convert karna padega taki token nikal and read kkarske  toh yeh karta kon hia basically kon providee karta hai cookie ko pass and json mai convert karske taki appp usko.token karke acces karsko woh karta hao cookie parse
if(!token){
return res.status(400).json({
    success:false,
    message:"user not authorized"
})
}//token raha toh usko check karnge valid hai ki nhi and sahi hai toh info nikalo aur age pass
try{
const payload=JWT.verify(token,process.env.SECRET);
req.user={ id: payload.id, email: payload.email }; //info  mai req mai send kardta hu toh ow jabh middleware ke throuht get user mai jara hai toh uski info controll ke get user mai accessible hojygi woh req.user.id mais

}catch(e){
    return res.status(400).json({
        success:false,
        message:e.message
    })
}
next(); // important ek process se dusre and tesre mai jane ke kam ata hai agar apne next nhi lika toh wahi atak jaoge
}
module.exports=jwtAuth;