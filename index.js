require('dotenv').config(); // to access .env
const PORT=process.env.PORT || 6009;

const app=require('./app');
app.listen(PORT,()=>{
    console.log(`server is at http://localhost:${PORT}`);
});