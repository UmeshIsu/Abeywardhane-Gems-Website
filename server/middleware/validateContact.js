import validator from 'validator';

export function validateContact(req, res, next) {
  const { name, email, message } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter a valid name.' });
  }
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ error: 'Please enter a longer message.' });
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: 'Some fields are too long.' });
  }

  // Trim everything before passing forward
  req.body.name = name.trim();
  req.body.email = email.trim();
  req.body.message = message.trim();
  if (req.body.phone) req.body.phone = req.body.phone.toString().trim();
  if (req.body.subject) req.body.subject = req.body.subject.toString().trim();

  next();
}
