import express from 'express';
import { create } from '../../controllers/ChatController';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

router.post('/chat', requiresSignIn, create);

export default router;
