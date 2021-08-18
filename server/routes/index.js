import express from 'express';
import auth from './auth';

const router = express.Router();

router.use('/api', auth);
export default router;
