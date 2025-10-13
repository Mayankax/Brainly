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


const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    shareLink: { type: String, unique: true, sparse: true }
})

export const ContentModel=model('Content',ContentSchema);