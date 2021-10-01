import express from 'express';
import {
  adminConcernsHandler,
  adminConcernsFetchHandler,
  adminGetAdvisers,
  adminGetAdvisersClient,
  adminGetAllSubscribers,
  adminGetAllUsers,
  adminAdvicerAllClient,
  adminGetAllUserPost,
  getAllSubcribersHandler,
} from '../../controllers/admin.controller';
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

router.get('/concerns', index); // requiresSignIn,
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

router.get('/admin/concerns/posted', requiresSignIn, adminConcernsHandler);

router.get(
  '/admin/concerns/posted/:id',
  requiresSignIn,
  adminConcernsFetchHandler
);

router.get('/admin/advisers', requiresSignIn, adminGetAdvisers);

router.get(
  '/admin/advisers/clients/:id',
  requiresSignIn,
  adminGetAdvisersClient
);

router.get('/admin/subscribers', requiresSignIn, adminGetAllSubscribers);
router.get('/admin/users/account', requiresSignIn, adminGetAllUsers);

router.get(
  '/admin/advisers/client/:adviserId',
  requiresSignIn,
  adminAdvicerAllClient
);

router.get('/admin/customer/all/:id', requiresSignIn, adminGetAllUserPost);

router.get('/admin/reports', requiresSignIn, getAllSubcribersHandler);

export default router;
