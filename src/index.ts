import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import { userMiddleware } from "./middleware.js";


const app=express();
app.use(express.json({ strict: false }));



const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

app.post("/api/v1/signup", async (req, res) => {
  try {
    // Validate input with Zod
    const parsedData = signupSchema.parse(req.body);
    const { username, password } = parsedData;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Generate salt and hash password
    const saltRounds = 10; // default strength
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user with hashed password
    const user = await UserModel.create({ username, password: hashedPassword });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfullyyy",
      token
    });

  } catch (error:any) {
    console.error("Signup error:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors[0].message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfully",
      token
    });

  } catch (error: any) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { link, type } = req.body;

    // if (!link || !type) {
    //   return res.status(400).json({ message: "Link and type are required" });
    // }

    const content = await ContentModel.create({
      link,
      type,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });

    res.status(201).json({
      message: "Content created successfully",
      content,
    });
  } catch (error) {
    console.error("Content creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/api/v1/content", userMiddleware,async (req,res)=>{
    // @ts-ignore
    const userId=req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate('userId','username' );
    res.json({content});
})

app.delete("/api/v1/content/:id", userMiddleware, async (req, res) => {
  try {
    const contentId = req.params.id;

    const result = await ContentModel.deleteOne({
      _id: contentId,
      //@ts-ignore
      userId: req.userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Content not found or unauthorized" });
    }

    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Delete content error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:shareLink",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("http://localhost:3000");
});