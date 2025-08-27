import express from "express";
import { login, logOut, register } from "../controllers/user.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logOut);
router.route('/me').get(protectedRoute, (req, res) => {
    return res.status(200).json({ success: true, userId: req.id });
});

export default router;