import mongoose,{model,Schema} from 'mongoose';

mongoose.connect("mongodb+srv://mayankbansal818:t7o0FxFSW4eIS5HF@cluster0.y6py1wo.mongodb.net/brainly")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));


const userSchema=new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true}
});

export const UserModel = model('User',userSchema);