import express from 'express';
import { index } from '../../controllers/ClientController';
import { requiresSignIn } from '../../middleware';
const router = express.Router();

router.get('/client', requiresSignIn, index);

export default router;
