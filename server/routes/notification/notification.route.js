import express from 'express';
import { createToken } from '../../controllers/notification.controller';

const router = express.Router();

router.post('/notification/create', createToken);

export { router as notificationRoute };
