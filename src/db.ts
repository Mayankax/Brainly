import mongoose,{model,Schema} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));


const userSchema=new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true}
});

export const UserModel = model('User',userSchema);