import express from 'express';
import { login, register } from '../../controllers/authController';

const router = express.Router();

router.get('/api', (_, res) => {
  res.json({
    message: 'Welcome to agriconnect api',
  });
});

router.post('/register', register);
router.post('/login', login);

export default router;
