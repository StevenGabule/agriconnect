import express from 'express';
import {
  index,
  edit,
  update,
  destroy,
  updateReAssign,
  changeStatus,
} from '../../controllers/ConcernController';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

router.get('/concerns', requiresSignIn, index);
router.get('/concern/:id', requiresSignIn, edit);
router.put('/concern/:id', requiresSignIn, update);
router.delete('/concern/:id', requiresSignIn, destroy);

router.put(
  '/admin/advisers/:adviserId/change-status',
  requiresSignIn,
  changeStatus
);

router.put(
  '/admin/a/:adviserId/c/:concernId/re-assign',
  requiresSignIn,
  updateReAssign
);

export default router;
