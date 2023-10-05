const mongoose=require('mongoose');
const MONGODB_URL=process.env.MONGODB_URL;
const DBconnect=()=>{
    mongoose
    .connect(MONGODB_URL) // path of mongo
    .then((conn)=>console.log(`connect to db:${conn.connection.host}`))
    .catch((err)=>{
        console.log(err.message);
    })
    }
module.exports=DBconnect;