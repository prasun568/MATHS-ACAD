import nodemailer from 'nodemailer';

export async function sendLeadEmail(subject: string, htmlContent: string) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com';

  console.log(`[EMAIL MANAGER] Attempting to send lead email: "${subject}" to <${to}>`);

  // Graceful fallback if SMTP is not set up
  if (!user || !pass) {
    console.warn(
      `[EMAIL MANAGER WARNING] SMTP_USER or SMTP_PASS is not set in environment variables. Email notification skipped.\n` +
      `------------------ DEMO EMAIL BLOCK START ------------------\n` +
      `To: ${to}\n` +
      `Subject: ${subject}\n` +
      `Content:\n${htmlContent.replace(/<[^>]*>/g, '\n')}\n` +
      `------------------- DEMO EMAIL BLOCK END -------------------`
    );
    return { success: true, message: 'SMTP credentials missing. Logged to console.' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // Use SSL for port 465, STARTTLS for port 587
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false // Ignore self-signed cert handshake errors common on custom domain hosting
      }
    });

    const info = await transporter.sendMail({
      from: `"TMMA Lead Alert" <${user}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log(`[EMAIL MANAGER SUCCESS] Message sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[EMAIL MANAGER ERROR] Failed to deliver email via SMTP:', error);
    return { success: false, error };
  }
}
