import express from 'express';
import { create } from '../../controllers/ConcernController';
import { requiresSignIn } from '../../middleware';
import { userFile } from '../../middleware/fileUpload';

const router = express.Router();

router.post('/concern', requiresSignIn, userFile, create);

export default router;
