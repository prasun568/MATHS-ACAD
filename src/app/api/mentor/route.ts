import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendLeadEmail } from '@/lib/mail';

const LOCAL_MENTORS_FILE = path.join(process.cwd(), 'mentors_development.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, subjects, experience, curriculumExpertise, availability, introduction, honeypot } = data;

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
    if (!phone || phone.trim().length < 8) {
      return NextResponse.json({ success: false, error: 'Phone number is required.' }, { status: 400 });
    }
    if (!subjects || (Array.isArray(subjects) && subjects.length === 0) || (typeof subjects === 'string' && !subjects.trim())) {
      return NextResponse.json({ success: false, error: 'Please specify at least one subject.' }, { status: 400 });
    }
    if (!experience) {
      return NextResponse.json({ success: false, error: 'Please specify your teaching experience.' }, { status: 400 });
    }
    if (!curriculumExpertise || (Array.isArray(curriculumExpertise) && curriculumExpertise.length === 0) || (typeof curriculumExpertise === 'string' && !curriculumExpertise.trim())) {
      return NextResponse.json({ success: false, error: 'Please specify curriculum expertise.' }, { status: 400 });
    }

    // Sanitize values
    const sanitizedMentor = {
      id: `mentor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim().replace(/[<>]/g, ''),
      email: email.trim().toLowerCase(),
      phone: phone.trim().replace(/[<>]/g, ''),
      subjects: Array.isArray(subjects) ? subjects : subjects.split(','),
      experience: experience.trim().replace(/[<>]/g, ''),
      curriculumExpertise: Array.isArray(curriculumExpertise) ? curriculumExpertise : curriculumExpertise.split(','),
      availability: availability ? availability.trim().replace(/[<>]/g, '') : '',
      introduction: introduction ? introduction.trim().replace(/[<>]/g, '') : '',
      createdAt: new Date().toISOString(),
    };

    // 3. Database status check
    const isProductionDbConfigured = !!process.env.DATABASE_URL;

    if (isProductionDbConfigured) {
      console.log('Production DB Configured: Writing mentor application to database...', sanitizedMentor);
    } else {
      console.warn('DATABASE_URL is not set. Falling back to local storage file mentors_development.json.');
      
      try {
        let mentors = [];
        if (fs.existsSync(LOCAL_MENTORS_FILE)) {
          try {
            const fileData = fs.readFileSync(LOCAL_MENTORS_FILE, 'utf8');
            mentors = JSON.parse(fileData);
          } catch (e) {
            console.error('Error reading local mentors file, resetting...', e);
          }
        }
        mentors.push(sanitizedMentor);
        fs.writeFileSync(LOCAL_MENTORS_FILE, JSON.stringify(mentors, null, 2), 'utf8');
      } catch (fileWriteError) {
        console.warn('Unable to write to local storage (normal in read-only serverless runtimes like Vercel):', fileWriteError);
      }
    }

    // 4. Send email notification to Admin
    const emailSubject = `🎓 New Mentor Application - ${sanitizedMentor.name}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #061320; border-bottom: 2px solid #B8860B; padding-bottom: 8px;">New Mentor Application</h2>
        <p>An educator has submitted a job application form to join the academy:</p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 500px; border-color: #ddd;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Applicant Name</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Email Address</strong></td>
            <td style="padding: 10px;"><a href="mailto:${sanitizedMentor.email}">${sanitizedMentor.email}</a></td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Phone Number</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Teaching Experience</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.experience}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Target Subjects</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.subjects.join(', ')}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Curriculum Expertise</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.curriculumExpertise.join(', ')}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Weekly Availability</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.availability}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Date Submitted</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.createdAt}</td>
          </tr>
        </table>
        <br/>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #061320; max-width: 500px;">
          <strong>Self Introduction:</strong><br/>
          <p style="white-space: pre-wrap; margin-top: 8px;">${sanitizedMentor.introduction || 'No introduction provided.'}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #ccc; margin-top: 30px;" />
        <p style="font-size: 0.8rem; color: #777;">Sent automatically by The MathMatriX Academy website platform.</p>
      </div>
    `;

    await sendLeadEmail(emailSubject, emailHtml);

    return NextResponse.json({
      success: true,
      message: isProductionDbConfigured 
        ? 'Application submitted successfully to database.' 
        : 'Application saved to local development file mentors_development.json (Database not configured).',
      isDemoMode: !isProductionDbConfigured,
      applicationId: sanitizedMentor.id
    }, { status: 200 });

  } catch (error: any) {
    console.error('Mentor API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error. Please try again.' },
      { status: 500 }
    );
  }
}
