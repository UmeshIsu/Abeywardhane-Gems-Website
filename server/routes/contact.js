import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateContact } from '../middleware/validateContact.js';
import { submitContact } from '../controllers/contactController.js';

const router = Router();

// Tighter limit for the contact form to prevent abuse
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many submissions. Please try again in an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, validateContact, submitContact);

export default router;
