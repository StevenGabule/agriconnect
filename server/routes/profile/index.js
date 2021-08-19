import express from 'express';
import { showProfile } from '../../controllers/ProfileController';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

router.get('/profile', requiresSignIn, showProfile);

export default router;
