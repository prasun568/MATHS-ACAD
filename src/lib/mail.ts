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
  provider?: string;
}

/**
 * Sends email via Resend HTTP API (No SMTP / ports needed, works 100% on cloud)
 */
async function sendViaResend({
  apiKey,
  fromName,
  to,
  subject,
  html,
  attachments,
}: {
  apiKey: string;
  fromName: string;
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}): Promise<SendEmailResult> {
  try {
    const fromAddress = process.env.RESEND_FROM || `${fromName} <onboarding@resend.dev>`;
    const payload: any = {
      from: fromAddress,
      to: [to],
      subject,
      html,
    };

    if (attachments && attachments.length > 0) {
      payload.attachments = attachments.map((att) => {
        let contentStr = '';
        if (typeof att.content === 'string') {
          contentStr = att.content.replace(/^data:[^;]+;base64,/, '');
        } else if (Buffer.isBuffer(att.content)) {
          contentStr = att.content.toString('base64');
        }
        return {
          filename: att.filename,
          content: contentStr,
        };
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('[RESEND API ERROR]', data);
      return {
        success: false,
        error: data.message || `Resend error: ${res.statusText}`,
        provider: 'Resend',
      };
    }

    console.log(`[EMAIL MANAGER SUCCESS - RESEND] Sent to <${to}>, ID: ${data.id}`);
    return { success: true, messageId: data.id, provider: 'Resend' };
  } catch (error: any) {
    console.error('[RESEND EXCEPTION]', error);
    return {
      success: false,
      error: error?.message || 'Resend HTTP request failed',
      provider: 'Resend',
    };
  }
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
      connectionTimeout: 10000,
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
 * Verifies if email credentials (Resend or SMTP) are configured
 */
export async function verifySmtp(): Promise<{ ok: boolean; message: string; details?: any }> {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    return {
      ok: true,
      message: 'Resend API Key is configured. Ready for fast HTTP email dispatch.',
      details: {
        provider: 'Resend REST API',
        targetAdmin: process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com',
      },
    };
  }

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS;
  const pass = rawPass?.trim().replace(/\s+/g, '');

  if (!user || !pass) {
    return {
      ok: false,
      message: 'No email service credentials configured. Please configure SMTP_USER/SMTP_PASS (Gmail App Password) or RESEND_API_KEY in Vercel Environment Variables.',
      details: {
        SMTP_USER: user ? `${user.substring(0, 3)}***@***` : 'NOT_SET',
        SMTP_PASS_CONFIGURED: !!pass,
        RESEND_API_KEY_CONFIGURED: !!resendApiKey,
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
          ? 'Gmail rejected credentials. Make sure 2-Step Verification is ON in your Google Account and generate a 16-character App Password (not your regular Gmail password).'
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
  const recipient = to || process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com';

  console.log(`[EMAIL MANAGER] Attempting to send email: "${subject}" to <${recipient}>`);

  // 1. Check for Resend API Key first (fastest and most reliable on serverless)
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    return sendViaResend({
      apiKey: resendApiKey,
      fromName,
      to: recipient,
      subject,
      html,
      attachments,
    });
  }

  // 2. Check for SMTP credentials
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS;
  // Automatically remove spaces from pasted Google App Passwords
  const pass = rawPass?.trim().replace(/\s+/g, '');

  if (!user || !pass) {
    console.warn(
      `[EMAIL MANAGER WARNING] Neither RESEND_API_KEY nor SMTP_USER/SMTP_PASS is set. Email to <${recipient}> skipped.\n` +
      `------------------ DEMO EMAIL BLOCK START ------------------\n` +
      `To: ${recipient}\n` +
      `From: "${fromName}" <${user || 'noreply@themathmatrixacademy.com'}>\n` +
      `Subject: ${subject}\n` +
      `Attachments count: ${attachments ? attachments.length : 0}\n` +
      `------------------- DEMO EMAIL BLOCK END -------------------`
    );
    return {
      success: false,
      warning: 'No email credentials configured. Please set SMTP_USER and SMTP_PASS (or RESEND_API_KEY) in Vercel Environment Variables.',
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

    console.log(`[EMAIL MANAGER SUCCESS - SMTP] Message sent: ${info.messageId} to <${recipient}>`);
    return { success: true, messageId: info.messageId, provider: 'SMTP' };
  } catch (error: any) {
    console.error(`[EMAIL MANAGER ERROR] Failed to deliver email to <${recipient}> via SMTP:`, error);
    return {
      success: false,
      error: error?.message || 'SMTP delivery failed',
      code: error?.code,
      provider: 'SMTP',
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



