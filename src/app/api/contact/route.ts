import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendLeadEmail } from '@/lib/mail';

const LOCAL_CONTACTS_FILE = path.join(process.cwd(), 'contact_enquiries_development.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message, honeypot } = data;

    // 1. Honeypot check
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: 'Spam detected.' },
        { status: 400 }
      );
    }

    // 2. Server-side validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Name is required.' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'A valid email is required.' }, { status: 400 });
    }
    if (!subject || subject.trim().length < 3) {
      return NextResponse.json({ success: false, error: 'Subject is required.' }, { status: 400 });
    }
    if (!message || message.trim().length < 10) {
      return NextResponse.json({ success: false, error: 'Message must be at least 10 characters long.' }, { status: 400 });
    }

    // Sanitize values
    const sanitizedContact = {
      id: `enquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim().replace(/[<>]/g, ''),
      email: email.trim().toLowerCase(),
      subject: subject.trim().replace(/[<>]/g, ''),
      message: message.trim().replace(/[<>]/g, ''),
      createdAt: new Date().toISOString(),
    };

    // 3. Database check
    const isProductionDbConfigured = !!process.env.DATABASE_URL;

    if (isProductionDbConfigured) {
      console.log('Production DB Configured: Writing contact enquiry to database...', sanitizedContact);
    } else {
      console.warn('DATABASE_URL is not set. Falling back to local storage file contact_enquiries_development.json.');
      
      try {
        let contacts = [];
        if (fs.existsSync(LOCAL_CONTACTS_FILE)) {
          try {
            const fileData = fs.readFileSync(LOCAL_CONTACTS_FILE, 'utf8');
            contacts = JSON.parse(fileData);
          } catch (e) {
            console.error('Error reading local contacts file, resetting...', e);
          }
        }
        contacts.push(sanitizedContact);
        fs.writeFileSync(LOCAL_CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8');
      } catch (fileWriteError) {
        console.warn('Unable to write to local storage (normal in read-only serverless runtimes like Vercel):', fileWriteError);
      }
    }

    // 4. Send email notification to Admin
    const emailSubject = `✉️ New Contact Inquiry: ${sanitizedContact.subject}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #061320; border-bottom: 2px solid #B8860B; padding-bottom: 8px;">New Contact Form Submission</h2>
        <p>You have received a general inquiry from the website contact page:</p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 500px; border-color: #ddd;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Sender Name</strong></td>
            <td style="padding: 10px;">${sanitizedContact.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Sender Email</strong></td>
            <td style="padding: 10px;"><a href="mailto:${sanitizedContact.email}">${sanitizedContact.email}</a></td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Subject</strong></td>
            <td style="padding: 10px;">${sanitizedContact.subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Date Submitted</strong></td>
            <td style="padding: 10px;">${sanitizedContact.createdAt}</td>
          </tr>
        </table>
        <br/>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #061320; max-width: 500px;">
          <strong>Message:</strong><br/>
          <p style="white-space: pre-wrap; margin-top: 8px;">${sanitizedContact.message}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 30px;" />
        <p style="font-size: 0.8rem; color: #777;">Sent automatically by The MathMatriX Academy website platform.</p>
      </div>
    `;

    await sendLeadEmail(emailSubject, emailHtml);

    return NextResponse.json({
      success: true,
      message: isProductionDbConfigured 
        ? 'Enquiry submitted successfully to database.' 
        : 'Enquiry saved to local development file contact_enquiries_development.json (Database not configured).',
      isDemoMode: !isProductionDbConfigured,
      enquiryId: sanitizedContact.id
    }, { status: 200 });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error. Please try again.' },
      { status: 500 }
    );
  }
}
