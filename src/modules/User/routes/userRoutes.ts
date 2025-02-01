import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const router = Router();

router.post("/create", UserController.create);

export default router;
