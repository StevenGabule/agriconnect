import express from 'express';
import { getAdvisersByCat } from '../../controllers/advicer.controller';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

// requiresSignIn
router.post('/get-adviser-by-id/:id', getAdvisersByCat);

export { router as adviserRouter };
