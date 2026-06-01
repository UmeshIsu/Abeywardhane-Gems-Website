import { Router } from 'express';
import { listBlogs, getBlog } from '../controllers/blogsController.js';

const router = Router();
router.get('/', listBlogs);
router.get('/:slug', getBlog);

export default router;
