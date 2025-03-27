import express from "express";
import { signup } from "../controllers/auth.controllers.ts";

const router = express.Router();

router.post('/signup', signup);
// router.get('/login', signup);

export default router;