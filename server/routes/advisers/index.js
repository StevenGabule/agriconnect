import express from 'express';
import {
  getAdvisersByCat,
  getAdviserByName,
  getShowAdvisers,
  getShowAdviserConcerns,
  getConcernByAdviser,
} from '../../controllers/advicer.controller';
import { requiresSignIn } from '../../middleware';

const router = express.Router();

// requiresSignIn
router.get('/advisers/get-all-advisers', getShowAdvisers);
router.get(
  '/advisers/fetch-adviser-concerns',
  requiresSignIn,
  getShowAdviserConcerns
);
router.post('/get-adviser-by-id/:id', getAdvisersByCat);
router.get('/search-adviser-by-name/:name', getAdviserByName);
router.get('/get-concern-by-adviser/:id', getConcernByAdviser);
export { router as adviserRouter };
