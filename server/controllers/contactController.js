import { getTransporter } from '../config/mailer.js';
import { contactEmailTemplate } from '../utils/emailTemplate.js';

export async function submitContact(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body;

    // If email creds aren't set, still acknowledge but log warning
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('[contact] EMAIL_USER / EMAIL_PASS not configured — skipping email send.');
      console.log('[contact] received:', { name, email, phone, subject, message });
      return res.json({
        ok: true,
        message: 'Message received (email delivery is not configured yet).',
      });
    }

    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `"Abeywardana Gems Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: subject
        ? `[Website] ${subject} — from ${name}`
        : `[Website] New message from ${name}`,
      html: contactEmailTemplate({ name, email, phone, subject, message }),
      text: `New contact from ${name} <${email}>\n${phone ? 'Phone: ' + phone + '\n' : ''}${subject ? 'Subject: ' + subject + '\n' : ''}\n${message}`,
    });

    res.json({ ok: true, id: info.messageId, message: 'Message delivered.' });
  } catch (err) {
    err.publicMessage = 'Could not deliver your message right now. Please try again later or use WhatsApp.';
    next(err);
  }
}
