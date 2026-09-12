import nodemailer from 'nodemailer';

export interface EmailAttachment {
  filename: string;
  content: any;
  contentType?: string;
}

export interface SendEmailOptions {
  to?: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
  fromName?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
  fromName = 'The MathMatriX Academy',
}: SendEmailOptions) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipient = to || process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com';

  console.log(`[EMAIL MANAGER] Attempting to send email: "${subject}" to <${recipient}>`);

  // Graceful fallback if SMTP is not set up
  if (!user || !pass) {
    console.warn(
      `[EMAIL MANAGER WARNING] SMTP_USER or SMTP_PASS is not set in environment variables. Email notification skipped.\n` +
      `------------------ DEMO EMAIL BLOCK START ------------------\n` +
      `To: ${recipient}\n` +
      `From: "${fromName}" <${user || 'noreply@mathmatrix.com'}>\n` +
      `Subject: ${subject}\n` +
      `Content:\n${html.replace(/<[^>]*>/g, '\n')}\n` +
      `Attachments count: ${attachments ? attachments.length : 0}\n` +
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
        rejectUnauthorized: false, // Ignore self-signed cert handshake errors common on custom domain hosting
      },
    });

    const info = await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: recipient,
      subject,
      html,
      attachments,
    });

    console.log(`[EMAIL MANAGER SUCCESS] Message sent: ${info.messageId} to <${recipient}>`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL MANAGER ERROR] Failed to deliver email to <${recipient}> via SMTP:`, error);
    return { success: false, error };
  }
}

export async function sendLeadEmail(
  subject: string,
  htmlContent: string,
  attachments?: EmailAttachment[]
) {
  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com',
    subject,
    html: htmlContent,
    attachments,
    fromName: 'TMMA Lead Alert',
  });
}

