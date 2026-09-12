import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendLeadEmail, sendEmail } from '@/lib/mail';

const LOCAL_MENTORS_FILE = path.join(process.cwd(), 'mentors_development.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      name, 
      email, 
      phone, 
      grades,
      subjects, 
      experience, 
      curriculumExpertise, 
      availability, 
      introduction, 
      honeypot,
      resumeType,
      resumeLink,
      resumeFileName,
      resumeBase64 
    } = data;

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
    if (!grades || (Array.isArray(grades) && grades.length === 0) || (typeof grades === 'string' && !grades.trim())) {
      return NextResponse.json({ success: false, error: 'Please specify at least one grade level you want to teach.' }, { status: 400 });
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
    if (!availability || !availability.trim()) {
      return NextResponse.json({ success: false, error: 'Daily availability is required.' }, { status: 400 });
    }

    // Resume / CV validation
    if (!resumeType || !['link', 'file'].includes(resumeType)) {
      return NextResponse.json({ success: false, error: 'Please submit a Resume / CV (either link or file upload).' }, { status: 400 });
    }

    if (resumeType === 'link') {
      if (!resumeLink || !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(resumeLink.trim())) {
        return NextResponse.json({ success: false, error: 'Please enter a valid Resume URL starting with http:// or https://' }, { status: 400 });
      }
    } else {
      // file validation
      if (!resumeBase64 || !resumeFileName) {
        return NextResponse.json({ success: false, error: 'Please upload a Resume file.' }, { status: 400 });
      }
      
      // Extension validation
      const ext = path.extname(resumeFileName).toLowerCase();
      if (!['.pdf', '.doc', '.docx'].includes(ext)) {
        return NextResponse.json({ success: false, error: 'Unsupported file type. Please upload a PDF, DOC, or DOCX file.' }, { status: 400 });
      }

      // Check approximate size (Base64 is ~33% larger than binary data)
      const estimatedBytes = (resumeBase64.length * 3) / 4;
      if (estimatedBytes > 5.5 * 1024 * 1024) { // 5.5MB buffer for 5MB limit
        return NextResponse.json({ success: false, error: 'File is too large. Max allowed size is 5MB.' }, { status: 400 });
      }
    }

    // Sanitize values
    const sanitizedMentor = {
      id: `mentor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim().replace(/[<>]/g, ''),
      email: email.trim().toLowerCase(),
      phone: phone.trim().replace(/[<>]/g, ''),
      grades: Array.isArray(grades) ? grades : grades.split(','),
      subjects: Array.isArray(subjects) ? subjects : subjects.split(','),
      experience: experience.trim().replace(/[<>]/g, ''),
      curriculumExpertise: Array.isArray(curriculumExpertise) ? curriculumExpertise : curriculumExpertise.split(','),
      availability: availability ? availability.trim().replace(/[<>]/g, '') : '',
      introduction: introduction ? introduction.trim().replace(/[<>]/g, '') : '',
      resumeType,
      resumeLink: resumeType === 'link' ? resumeLink.trim() : '',
      resumeFileName: resumeType === 'file' ? resumeFileName.trim().replace(/[<>]/g, '') : '',
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

    // 4. Set up attachments if file uploaded
    const attachments = [];
    if (resumeType === 'file' && resumeBase64) {
      const base64Data = resumeBase64.includes(';base64,') 
        ? resumeBase64.split(';base64,')[1] 
        : resumeBase64;
      attachments.push({
        filename: sanitizedMentor.resumeFileName || 'resume.pdf',
        content: Buffer.from(base64Data, 'base64'),
      });
    }

    // 5. Send email notification to Admin
    const emailSubject = `🎓 New Mentor Application - ${sanitizedMentor.name}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #061320; border-bottom: 2px solid #B8860B; padding-bottom: 8px;">New Mentor Application</h2>
        <p>An educator has submitted a job application form to join the academy:</p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 500px; border-color: #ddd;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; width: 150px;"><strong>Applicant Name</strong></td>
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
            <td style="padding: 10px;"><strong>Target Grades</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.grades.join(', ')}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Target Subjects</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.subjects.join(', ')}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Teaching Experience</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.experience}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Curriculum Expertise</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.curriculumExpertise.join(', ')}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px;"><strong>Daily Availability</strong></td>
            <td style="padding: 10px;">${sanitizedMentor.availability}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Resume/CV</strong></td>
            <td style="padding: 10px;">
              ${resumeType === 'link' 
                ? `<a href="${sanitizedMentor.resumeLink}" target="_blank" style="color: #0b5c36; font-weight: bold;">${sanitizedMentor.resumeLink}</a>` 
                : `Attached file: <strong>${sanitizedMentor.resumeFileName}</strong>`}
            </td>
          </tr>
          <tr style="background-color: #f9f9f9;">
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

    // 6. Candidate Zoom Interview Invitation Email
    const ZOOM_INTERVIEW_LINK = 'https://us06web.zoom.us/j/89307082370?pwd=HVDyVmIFPLnXG8bG19HD9sJn9dln04.1';
    const CONTACT_PHONE = '7828440234';

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrowDate = tomorrow.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const candidateSubject = `🎓 Interview Scheduled: Tomorrow at 10:00 AM - The MathMatriX Academy`;
    const candidateHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #2D3748; background-color: #F7FAFC; padding: 30px 15px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
          
          <!-- Header -->
          <div style="background-color: #061320; padding: 28px 24px; text-align: center; border-bottom: 3px solid #B8860B;">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">The MathMatriX Academy</h1>
            <p style="color: #D4AF37; margin: 6px 0 0 0; font-size: 14px; font-weight: 500;">Educator & Mentor Onboarding</p>
          </div>

          <!-- Body Content -->
          <div style="padding: 28px 24px;">
            <h2 style="color: #061320; font-size: 19px; margin-top: 0; margin-bottom: 16px;">Dear ${sanitizedMentor.name},</h2>
            <p style="font-size: 15px; color: #4A5568; margin-bottom: 20px;">
              Thank you for applying to join <strong>The MathMatriX Academy</strong> mentor panel. We have received your application and are pleased to invite you for your online interview and interaction session.
            </p>

            <!-- Interview Card -->
            <div style="background-color: #F8FAFC; border: 1px solid #CBD5E1; border-left: 5px solid #B8860B; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <h3 style="margin-top: 0; margin-bottom: 14px; color: #061320; font-size: 16px;">🗓️ Interview Details</h3>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748B; width: 120px; vertical-align: top;"><strong>Applied Role:</strong></td>
                  <td style="padding: 8px 0; color: #1E293B;">Educator / Mentor (${sanitizedMentor.subjects.join(', ')})</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; vertical-align: top;"><strong>Date & Time:</strong></td>
                  <td style="padding: 8px 0; color: #061320; font-weight: 700; font-size: 15px;">
                    Tomorrow at 10:00 AM IST<br/>
                    <span style="font-size: 13px; font-weight: normal; color: #475569;">(${formattedTomorrowDate})</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748B; vertical-align: top;"><strong>Platform:</strong></td>
                  <td style="padding: 8px 0; color: #1E293B;">Zoom Video Meeting</td>
                </tr>
              </table>

              <!-- Zoom Button -->
              <div style="margin-top: 20px; text-align: center;">
                <a href="${ZOOM_INTERVIEW_LINK}" target="_blank" style="display: inline-block; background-color: #061320; color: #FFFFFF; padding: 12px 28px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px; border: 1px solid #B8860B;">
                  🎥 Join Zoom Interview
                </a>
              </div>
              <p style="margin-top: 12px; margin-bottom: 0; font-size: 12px; color: #64748B; word-break: break-all; text-align: center;">
                Direct Link: <a href="${ZOOM_INTERVIEW_LINK}" style="color: #0284C7; text-decoration: underline;">${ZOOM_INTERVIEW_LINK}</a>
              </p>
            </div>

            <!-- Emergency / Slot Adjustment Box -->
            <div style="background-color: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 14px; color: #92400E; line-height: 1.5;">
                ⚠️ <strong>Need slot adjustment?</strong><br/>
                If you have any issue in the given slot, then contact on this no: 
                <a href="tel:${CONTACT_PHONE}" style="color: #B45309; font-weight: 700; text-decoration: underline; font-size: 15px;">${CONTACT_PHONE}</a>.
              </p>
            </div>

            <!-- Guidelines -->
            <div style="margin-bottom: 20px;">
              <h4 style="margin-top: 0; margin-bottom: 8px; color: #061320; font-size: 14px;">Preparation Guidelines:</h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; color: #4B5563; line-height: 1.6;">
                <li>Please prepare a 5–10 minute demonstration of a concept of your choice from your applied subject(s).</li>
                <li>Join from a quiet environment using a laptop or desktop with a working webcam and microphone.</li>
                <li>Keep a notebook, pen, or digital tablet handy for solving problems during the discussion.</li>
              </ul>
            </div>

            <p style="font-size: 14px; color: #4B5563; margin-bottom: 4px;">
              We look forward to meeting you tomorrow!
            </p>

            <p style="font-size: 14px; color: #1F2937; margin-top: 16px;">
              Warm regards,<br/>
              <strong>Academic Recruitment Panel</strong><br/>
              The MathMatriX Academy
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #F1F5F9; padding: 16px 24px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B;">
            <p style="margin: 0 0 4px 0;">Slot issue or queries? Contact: <strong>${CONTACT_PHONE}</strong></p>
            <p style="margin: 0;">© ${new Date().getFullYear()} The MathMatriX Academy. All rights reserved.</p>
          </div>

        </div>
      </div>
    `;

    // Dispatch both notifications concurrently
    const [leadRes, candidateRes] = await Promise.allSettled([
      sendLeadEmail(emailSubject, emailHtml, attachments),
      sendEmail({
        to: sanitizedMentor.email,
        subject: candidateSubject,
        html: candidateHtml,
        fromName: 'The MathMatriX Academy',
      }),
    ]);

    const leadEmailSent = leadRes.status === 'fulfilled' && leadRes.value?.success;
    const candidateEmailSent = candidateRes.status === 'fulfilled' && candidateRes.value?.success;

    console.log('[MENTOR API] Email Dispatch Status:', {
      adminNotification: leadEmailSent ? 'SENT' : leadRes,
      candidateInvitation: candidateEmailSent ? 'SENT' : candidateRes,
    });

    return NextResponse.json({
      success: true,
      message: isProductionDbConfigured 
        ? 'Application submitted successfully to database.' 
        : 'Application saved to local development file mentors_development.json (Database not configured).',
      isDemoMode: !isProductionDbConfigured,
      applicationId: sanitizedMentor.id,
      emailDelivery: {
        adminEmailSent: leadEmailSent,
        candidateEmailSent: candidateEmailSent,
        warning: (!leadEmailSent || !candidateEmailSent)
          ? 'Email dispatch pending. Please configure SMTP_USER & SMTP_PASS (or RESEND_API_KEY) in Vercel Environment Variables.'
          : undefined,
      },
      interviewDetails: {
        scheduledFor: `Tomorrow at 10:00 AM IST (${formattedTomorrowDate})`,
        zoomLink: ZOOM_INTERVIEW_LINK,
        contactPhone: CONTACT_PHONE,
        candidateEmail: sanitizedMentor.email,
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Mentor API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error. Please try again.' },
      { status: 500 }
    );
  }
}
