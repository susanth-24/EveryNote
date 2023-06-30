import express from "express";
import { signin, signup, profile, followUser, deleteUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/profile/:id', profile);
router.patch('/follow/:id', auth, followUser);
router.delete('/:id', auth, deleteUser)

export default router;