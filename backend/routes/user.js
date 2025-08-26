import express from "express";
import { login, logOut, register } from "../controllers/user.js";

const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logOut);

export default router;