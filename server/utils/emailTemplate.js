export function contactEmailTemplate({ name, email, phone, subject, message }) {
  const safe = (s) => (s || '').toString().replace(/</g, '&lt;');
  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; background:#f6f8fc; padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e3e8f1;">
        <div style="background:#0b1530;color:#fff;padding:24px 28px;">
          <div style="font-size:13px;letter-spacing:.25em;text-transform:uppercase;color:#c9a14a;">New Contact Form Submission</div>
          <h1 style="margin:6px 0 0;font-size:22px;font-family:Georgia,serif;">Abeywardana Gems</h1>
        </div>
        <div style="padding:28px;">
          <p style="margin:0 0 18px;color:#354063;">You received a new message through your website contact form.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#6b7794;width:120px;">Name</td><td style="padding:8px 0;color:#0b1530;font-weight:600;">${safe(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7794;">Email</td><td style="padding:8px 0;color:#0b1530;"><a href="mailto:${safe(email)}" style="color:#2f4cdb;text-decoration:none;">${safe(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#6b7794;">Phone</td><td style="padding:8px 0;color:#0b1530;">${safe(phone)}</td></tr>` : ''}
            ${subject ? `<tr><td style="padding:8px 0;color:#6b7794;">Subject</td><td style="padding:8px 0;color:#0b1530;">${safe(subject)}</td></tr>` : ''}
          </table>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e3e8f1;">
            <div style="font-size:12px;color:#6b7794;letter-spacing:.15em;text-transform:uppercase;margin-bottom:8px;">Message</div>
            <div style="color:#0b1530;line-height:1.6;white-space:pre-wrap;">${safe(message)}</div>
          </div>
        </div>
        <div style="background:#f6f8fc;padding:16px 28px;font-size:12px;color:#6b7794;text-align:center;">
          Sent from abeywardanagems.com · ${new Date().toLocaleString()}
        </div>
      </div>
    </body>
  </html>`;
}
