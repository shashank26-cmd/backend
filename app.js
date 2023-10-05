
const express=require('express'); // server mil gaya
const app=express(); // server instance
const authRouter=require('./router/authrouter.js')
const DBconnect=require('./config/dbconfig.js');
const cookieParser=require('cookie-parser');
const cors=require('cors')
DBconnect();
app.use(express.json()); //kon batayga mai json data hu   .To parse the incoming request with json payload
app.use(cookieParser());//cookieparser ko pahile karlena kisi bhi route mai jane ke pahile ensure karlena apki cookies pass horhi hai


app.use(cors({ //frontend and backend alag alag jagah hai 
    origin:[process.env.CLIENT_URL], //yeh client ko access dedo
    credentials:true

}));
app.use('/api/auth/',authRouter);
app.use('/',(req,res)=>{
    res.status(200).json({
        data:'JWTauth server upated',
    });
});
module.exports=app;
