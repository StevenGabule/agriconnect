import express from 'express';
import { createSubscriptionHandler } from '../../controllers/subscription.controller';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

router.post(
  '/subscription/customer',
  requiresSignIn,
  createSubscriptionHandler
);
export { router as subscriptionRouter };
