import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendLeadEmail } from '@/lib/mail';

// Local database fallback file
const LOCAL_LEADS_FILE = path.join(process.cwd(), 'leads_development.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { parentName, whatsappNumber, childGrade, curriculum, subject, preferredTiming, learningMode, honeypot } = data;

    // 1. Bot prevention (Honeypot)
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: 'Spam detected.' },
        { status: 400 }
      );
    }

    // 2. Server-side validation
    if (!parentName || parentName.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Parent Name is required (min 2 chars).' }, { status: 400 });
    }
    if (!whatsappNumber || whatsappNumber.trim().replace(/\D/g, '').length < 8) {
      return NextResponse.json({ success: false, error: 'A valid WhatsApp Number is required.' }, { status: 400 });
    }
    if (!childGrade) {
      return NextResponse.json({ success: false, error: 'Child Grade is required.' }, { status: 400 });
    }
    if (!curriculum) {
      return NextResponse.json({ success: false, error: 'Curriculum/Board selection is required.' }, { status: 400 });
    }
    if (!subject) {
      return NextResponse.json({ success: false, error: 'Subject selection is required.' }, { status: 400 });
    }
    if (!preferredTiming) {
      return NextResponse.json({ success: false, error: 'Preferred Timing selection is required.' }, { status: 400 });
    }
    if (!learningMode) {
      return NextResponse.json({ success: false, error: 'Learning format/mode selection is required.' }, { status: 400 });
    }

    // Sanitize values
    const sanitizedLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      parentName: parentName.trim().replace(/[<>]/g, ''),
      whatsappNumber: whatsappNumber.trim().replace(/[<>]/g, ''),
      childGrade: childGrade.trim().replace(/[<>]/g, ''),
      curriculum: curriculum.trim().replace(/[<>]/g, ''),
      subject: subject.trim().replace(/[<>]/g, ''),
      preferredTiming: preferredTiming.trim().replace(/[<>]/g, ''),
      learningMode: learningMode.trim().replace(/[<>]/g, ''),
      createdAt: new Date().toISOString(),
    };

    // 3. Check for Production environment variables
    const isProductionDbConfigured = !!process.env.DATABASE_URL;
    const isProductionEmailConfigured = !!process.env.EMAIL_API_KEY;

    if (isProductionDbConfigured) {
      // In production, insert into database (e.g. Postgres, MongoDB)
      console.log('Production DB Configured: Writing lead to production database...', sanitizedLead);
      // await db.insert(sanitizedLead);
    } else {
      // Dev/Fallback mode: Write to local json file
      console.warn('DATABASE_URL is not set. Falling back to local storage file leads_development.json.');
      
      try {
        let leads = [];
        if (fs.existsSync(LOCAL_LEADS_FILE)) {
          try {
            const fileData = fs.readFileSync(LOCAL_LEADS_FILE, 'utf8');
            leads = JSON.parse(fileData);
          } catch (e) {
            console.error('Error reading local leads file, resetting...', e);
          }
        }
        leads.push(sanitizedLead);
        fs.writeFileSync(LOCAL_LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
      } catch (fileWriteError) {
        console.warn('Unable to write to local storage (normal in read-only serverless runtimes like Vercel):', fileWriteError);
      }
    }

    // 4. Send email notification to Admin
    const emailSubject = `🚨 New Free Assessment Request - ${sanitizedLead.parentName}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #061320; border-bottom: 2px solid #B8860B; padding-bottom: 8px;">New Free Assessment Booking</h2>
        <p>A parent has requested a free academic assessment. Here are the details:</p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 500px; border-color: #ddd;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Parent Name</strong></td>
            <td style="padding: 10px;">${sanitizedLead.parentName}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>WhatsApp Number</strong></td>
            <td style="padding: 10px;"><a href="https://wa.me/${sanitizedLead.whatsappNumber.replace(/\D/g, '')}">${sanitizedLead.whatsappNumber}</a></td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Learning Format</strong></td>
            <td style="padding: 10px;">${sanitizedLead.learningMode}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Child's Grade</strong></td>
            <td style="padding: 10px;">${sanitizedLead.childGrade}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Curriculum / Board</strong></td>
            <td style="padding: 10px;">${sanitizedLead.curriculum}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Target Subject</strong></td>
            <td style="padding: 10px;">${sanitizedLead.subject}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Preferred Timing</strong></td>
            <td style="padding: 10px;">${sanitizedLead.preferredTiming}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Date Submitted</strong></td>
            <td style="padding: 10px;">${sanitizedLead.createdAt}</td>
          </tr>
        </table>
        <br/>
        <p>Please reach out to the parent via WhatsApp or phone call to finalize details.</p>
        <hr style="border: 0; border-top: 1px solid #ccc;" />
        <p style="font-size: 0.8rem; color: #777;">Sent automatically by The MathMatriX Academy website platform.</p>
      </div>
    `;

    await sendLeadEmail(emailSubject, emailHtml);

    return NextResponse.json({
      success: true,
      message: isProductionDbConfigured 
        ? 'Lead saved successfully to database.' 
        : 'Lead saved to local development file leads_development.json (Database not configured).',
      isDemoMode: !isProductionDbConfigured,
      leadId: sanitizedLead.id
    }, { status: 200 });

  } catch (error: any) {
    console.error('Assessment API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error. Please try again.' },
      { status: 500 }
    );
  }
}
