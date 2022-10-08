import authRoutes from "./auth.js";
import tokenRoutes from "./token.js";
import userRoutes from "./token.js";
import { Router } from "express";

const router = Router();

router.use("/api/identity", authRoutes);
router.use("/api/identity/refresh", tokenRoutes);
router.use("/api/user", userRoutes);

export default router;