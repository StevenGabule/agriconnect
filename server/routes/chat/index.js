import express from 'express';
import { create, getChatUsers, lists } from '../../controllers/ChatController';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

router.post('/chat', requiresSignIn, create);
router.get('/lists', requiresSignIn, lists);
router.get('/:chatId', requiresSignIn, getChatUsers);

export { router as chatRouter };
