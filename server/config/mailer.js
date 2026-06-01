import nodemailer from 'nodemailer';

let cached;

export function getTransporter() {
  if (cached) return cached;

  cached = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // STARTTLS on port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return cached;
}

export async function verifyMailer() {
  try {
    const t = getTransporter();
    await t.verify();
    return true;
  } catch (err) {
    console.error('Mail transporter verification failed:', err.message);
    return false;
  }
}
