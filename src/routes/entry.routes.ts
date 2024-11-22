import express from 'express';
import { logEntry, getEntries, editEntry, deleteEntry } from '../controllers/entryController';
import authMiddleware from '../middleware/auth.mw';

const entryRouter = express.Router();

entryRouter.use(authMiddleware);
entryRouter.post('/', logEntry);
entryRouter.get('/', getEntries);
entryRouter.put('/:entryId', editEntry);
entryRouter.delete('/:entryId', deleteEntry);

export default entryRouter;