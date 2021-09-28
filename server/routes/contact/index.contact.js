import express from 'express';
import {
  createContactHandler,
  updateContactHandler,
  getContactsHandler,
  getContactsAllHandler,
} from '../../controllers/contact.controller';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

router.get('/contact/all', getContactsAllHandler);
router.get('/contact/customer', requiresSignIn, getContactsHandler);
router.post('/contact/customer', requiresSignIn, createContactHandler);
router.put('/contact/customer/:id', requiresSignIn, updateContactHandler);

export { router as contactRouter };
