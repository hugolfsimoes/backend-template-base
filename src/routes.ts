import { Router } from "express";
import userRoutes from "./modules/User/routes/userRoutes.js";
import authRoutes from "./modules/Auth/routes/authRoutes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;