import { Router } from 'express';
import { listGems, getGem } from '../controllers/gemsController.js';

const router = Router();
router.get('/', listGems);
router.get('/:id', getGem);

export default router;
