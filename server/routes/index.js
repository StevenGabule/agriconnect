import express from 'express';
import auth from './auth';
import profile from './profile';
import concerns from './concerns';
import admin from './admin';
import client from './client';
import chat from './chat';

const router = express.Router();

router.use(auth);
router.use(profile);
router.use(concerns);
router.use(admin);
router.use(client);
router.use(chat);
export default router;
