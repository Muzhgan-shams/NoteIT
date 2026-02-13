import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoute.js";
import rateLimit from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares. order matters
app.use(
  cors({
    origin: "http://localhost:5173", // Vite port
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(rateLimit);

// Routes
app.use("/api/notes", notesRoutes);

// app listening to port
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port 5000");
  });
});
