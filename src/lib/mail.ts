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

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: any;
  warning?: string;
  code?: string;
}

/**
 * Creates a configured Nodemailer transporter with connection timeouts
 */
function getTransporter(user: string, pass: string, host?: string, port?: number) {
  const isGmail = !host || host === 'smtp.gmail.com' || user.endsWith('@gmail.com');

  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      connectionTimeout: 10000, // 10 seconds timeout
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return nodemailer.createTransport({
    host: host || 'smtp.gmail.com',
    port: port || 587,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Verifies if SMTP credentials are set and can connect successfully
 */
export async function verifySmtp(): Promise<{ ok: boolean; message: string; details?: any }> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS;
  const pass = rawPass?.trim().replace(/\s+/g, '');

  if (!user || !pass) {
    return {
      ok: false,
      message: 'SMTP credentials missing. SMTP_USER and/or SMTP_PASS are not set in environment variables.',
      details: {
        SMTP_USER: user ? `${user.substring(0, 3)}***@***` : 'NOT_SET',
        SMTP_PASS_CONFIGURED: !!pass,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com',
      },
    };
  }

  try {
    const transporter = getTransporter(user, pass, host, port);
    await transporter.verify();
    return {
      ok: true,
      message: 'SMTP connection verified successfully! Email dispatch is operational.',
      details: {
        user: user.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
        provider: (!host || host === 'smtp.gmail.com' || user.endsWith('@gmail.com')) ? 'Gmail Service' : host,
        targetAdmin: process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com',
      },
    };
  } catch (error: any) {
    const errorMsg = error?.message || 'Failed to authenticate with SMTP server';
    const isBadCredentials = errorMsg.includes('535') || error?.code === 'EAUTH';
    return {
      ok: false,
      message: errorMsg,
      details: {
        code: error?.code,
        command: error?.command,
        response: error?.response,
        hint: isBadCredentials
          ? 'Gmail rejected the credentials. Make sure 2-Step Verification is ON in your Google Account and generate a 16-character App Password (not your regular Gmail password).'
          : 'Check that outbound SMTP traffic (port 465/587) is not blocked and host settings are correct.',
      },
    };
  }
}

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
  fromName = 'The MathMatriX Academy',
}: SendEmailOptions): Promise<SendEmailResult> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS;
  // Automatically remove spaces from pasted Google App Passwords
  const pass = rawPass?.trim().replace(/\s+/g, '');
  const recipient = to || process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com';

  console.log(`[EMAIL MANAGER] Attempting to send email: "${subject}" to <${recipient}>`);

  // Graceful warning if SMTP is not set up
  if (!user || !pass) {
    console.warn(
      `[EMAIL MANAGER WARNING] SMTP_USER or SMTP_PASS is not set in environment variables. Email notification skipped.\n` +
      `------------------ DEMO EMAIL BLOCK START ------------------\n` +
      `To: ${recipient}\n` +
      `From: "${fromName}" <${user || 'noreply@themathmatrixacademy.com'}>\n` +
      `Subject: ${subject}\n` +
      `Attachments count: ${attachments ? attachments.length : 0}\n` +
      `------------------- DEMO EMAIL BLOCK END -------------------`
    );
    return {
      success: false,
      warning: 'SMTP credentials missing. Please set SMTP_USER and SMTP_PASS in Vercel Environment Variables.',
    };
  }

  try {
    const transporter = getTransporter(user, pass, host, port);

    const info = await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: recipient,
      subject,
      html,
      attachments,
    });

    console.log(`[EMAIL MANAGER SUCCESS] Message sent: ${info.messageId} to <${recipient}>`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[EMAIL MANAGER ERROR] Failed to deliver email to <${recipient}> via SMTP:`, error);
    return {
      success: false,
      error: error?.message || 'SMTP delivery failed',
      code: error?.code,
    };
  }
}

export async function sendLeadEmail(
  subject: string,
  htmlContent: string,
  attachments?: EmailAttachment[]
): Promise<SendEmailResult> {
  return sendEmail({
    to: process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com',
    subject,
    html: htmlContent,
    attachments,
    fromName: 'TMMA Lead Alert',
  });
}


