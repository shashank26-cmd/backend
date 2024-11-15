const mongoose=require('mongoose');
const {Schema}=mongoose;
const JWT=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const userSchema=new Schema({
    name:{
        type:String,
        // validation 3 jaagha pe add krskte hai 1 client jaha react likha tha ,2 controller,3 db store krte samay joh yaha karrahe hai
        required:[true,'user name is required'],
        minlength:[5,'name must be greater then 5'],
        maxlength:[20,'max length should be less than 20'],
        trim:true // start space trim
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        lowercase:true,
        unique:[true,'already present']

    },
    password:{
        type:String,
        select:false
    },
  forget_password:{
        type:String,
    },
    forgetPasswordExpiryDate:{
       type:Date,
    }
  },  {
        timestamps:true,
    }
   );

// pre is middleware
   userSchema.pre('save',async function(next){ //koi save karaha hao toh ek function  trigger hoga
    
    // if pass not modified so age but if modify then this.pass wala line
    if (!this.isModified('password')){
        return next();
   }
this.password=await bcrypt.hash(this.password,10);
return next();
})

// our work is to generate token and store in cookie 


// in schema mongoose give one special thing u can define custom method if u want

//jwt generate method

   userSchema.methods={
    jwtToken(){
        return JWT.sign(
            {id: this._id,email: this.email},
            process.env.SECRET,
            { expiresIn: '24h'}

        )
    }}
    const userModel=mongoose.model('user',userSchema); //collection at db name as user and schema used for user is user schema
    module.exports=userModel;
// ek schema define hua hai kisiko user related info read ya write krni hai woh isss structure mai dena chaiye