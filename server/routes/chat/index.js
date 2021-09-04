import express from 'express';
import {
  changeChatName,
  create,
  getChatUsers,
  lists,
  getChats,
} from '../../controllers/ChatController';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

router.post('/chat', requiresSignIn, create);
router.get('/chats/:chatId', requiresSignIn, getChats);
router.get('/lists', requiresSignIn, lists);
router.get('/:chatId', requiresSignIn, getChatUsers);
router.put('/:chatId', requiresSignIn, changeChatName);

export { router as chatRouter };
