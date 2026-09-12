import { NextResponse } from 'next/server';
import { verifySmtp, sendEmail } from '@/lib/mail';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const shouldSendTest = url.searchParams.get('send') === 'true';

  const verification = await verifySmtp();

  if (!verification.ok) {
    return NextResponse.json(
      {
        status: 'error',
        message: verification.message,
        details: verification.details,
        instructions: {
          step1: 'Go to your Google Account (themathmatrixacademy@gmail.com) -> Security.',
          step2: 'Ensure 2-Step Verification is turned ON.',
          step3: 'Search for "App Passwords" in your Google Account settings.',
          step4: 'Create an App Password named "TMMA Website" and copy the 16-character code (e.g., abcd efgh ijkl mnop).',
          step5: 'In your Vercel Project Settings > Environment Variables, add:',
          variables: {
            SMTP_USER: 'themathmatrixacademy@gmail.com',
            SMTP_PASS: 'your 16 character app password without spaces',
            ADMIN_EMAIL: 'themathmatrixacademy@gmail.com',
          },
          step6: 'Trigger a redeploy in Vercel.',
        },
      },
      { status: 200 }
    );
  }

  let sendResult = null;
  if (shouldSendTest) {
    const adminEmail = process.env.ADMIN_EMAIL || 'themathmatrixacademy@gmail.com';
    sendResult = await sendEmail({
      to: adminEmail,
      subject: '✅ The MathMatriX Academy: Live Test Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #2D3748; background-color: #F7FAFC;">
          <div style="max-width: 550px; margin: 0 auto; background: #FFFFFF; border-radius: 8px; padding: 24px; border: 1px solid #E2E8F0; border-top: 4px solid #B8860B;">
            <h2 style="color: #061320; margin-top: 0;">🎉 Email Delivery is Operational!</h2>
            <p style="font-size: 14px; color: #4A5568;">
              Your SMTP credentials on <strong>The MathMatriX Academy</strong> website are successfully connected.
            </p>
            <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; padding: 14px; margin: 16px 0;">
              <p style="margin: 0; font-size: 13.5px; color: #166534; font-weight: 600;">
                All website form submissions will now arrive directly into this inbox:
              </p>
              <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 13px; color: #15803D;">
                <li>Free Academic Assessment Bookings from parents</li>
                <li>Educator / Mentor Job Applications</li>
                <li>General Contact Enquiries</li>
              </ul>
            </div>
            <p style="font-size: 12px; color: #718096; margin-bottom: 0;">
              Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>
        </div>
      `,
      fromName: 'TMMA System Verification',
    });
  }

  return NextResponse.json(
    {
      status: 'success',
      message: verification.message,
      details: verification.details,
      testEmailDispatched: shouldSendTest,
      sendResult,
      tip: shouldSendTest
        ? 'A live test email was dispatched to your inbox. Check Spam/Promotions if not visible in Primary.'
        : 'To send a live test email to the academy inbox, open: /api/test-email?send=true',
    },
    { status: 200 }
  );
}
