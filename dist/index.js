import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./db.js";
import bcrypt from "bcrypt";
import { z } from "zod";
const app = express();
app.use(express.json());
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
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({
            message: "User created successfully",
            token
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        if (error.name === "ZodError") {
            return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post("/api/v1/signin", (req, res) => {
});
app.post("/api/v1/content", (req, res) => {
});
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content/:id", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3000, () => {
    console.log("https://localhost:3000");
});
//# sourceMappingURL=index.js.map