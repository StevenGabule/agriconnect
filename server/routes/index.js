import express from 'express';
import auth from './auth';
import profile from './profile';
import concerns from './concerns';
import admin from './admin';
import client from './client';
import { chatRouter } from './chat';
import { messageRouter } from './messenges';
import { adviserRouter } from './advisers';
import { contactRouter } from './contact/index.contact';
import { notificationRoute } from './notification/notification.route';
import { subscriptionRouter } from './subscription/index.route';

const router = express.Router();

router.use(auth);
router.use(profile);
router.use(concerns);
router.use(admin);
router.use(client);
router.use(chatRouter);
router.use(messageRouter);
router.use(adviserRouter);
router.use(contactRouter);
router.use(notificationRoute);
router.use(subscriptionRouter);

export default router;
