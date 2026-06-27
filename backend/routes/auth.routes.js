import express from "express";
import { signUp } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup Route
router.post("/signup", signUp);

export default router;