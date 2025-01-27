import express from "express";
import userRoutes from '../modules/User/routes/userRoutes.ts';
import authRoutes from '../modules/Auth/routes/authRoutes.ts';
const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
