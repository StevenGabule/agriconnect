import express from 'express';
import { login, register } from '../../controllers/authController';

// const { validate } = require('../../validators/index');
// const { rules: rulesRegister } = require('../../validators/auth/register');

const router = express.Router();

router.get('/api', (_, res) => {
  res.json({
    message: 'Welcome to agriconnect api',
  });
});

router.post('/register', register);
router.post('/login', login);

export default router;
