import express from 'express';
import { create, getMessageChat } from '../../controllers/MessageController';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

router.post('/message', requiresSignIn, create);
router.get('/chats/:chatId/message', requiresSignIn, getMessageChat);

export { router as messageRouter };
