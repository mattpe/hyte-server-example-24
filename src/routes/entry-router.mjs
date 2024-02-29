import express from 'express';
import {body} from 'express-validator';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(
    authenticateToken,
    body('entry_date').isDate(),
    body('mood').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('weight').optional().isFloat({min: 30, max: 200}),
    body('sleep_hours').optional().isInt({min: 0, max: 24}),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    validationErrorHandler,
    postEntry,
  );

entryRouter.route('/:id').get(getEntryById).put(putEntry).delete(deleteEntry);

export default entryRouter;
