import express from "express";
import { login,logOut,signUp } from "../controllers/auth.controller.js";

const router = express.Router();

// Signup Route
router.post("/signup", signUp);
router.post("/login",login);
router.get("/logout",logOut)

export default router;