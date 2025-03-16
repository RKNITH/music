import express from "express";
import {login, register} from '../controllers/authController.js'
const router = express.Router();

router.post("/login", login); //login route
router.post("/register", register); //register route

export default router;
