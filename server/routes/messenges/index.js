import express from 'express';
import { create } from '../../controllers/MessageController';

const router = express.Router();

router.post('/message/create', create);

export { router as messageRouter };
