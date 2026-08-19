import nodemailer from 'nodemailer';

// Send Instant Loud Push Notification to Doctor's Device via ntfy
async function sendNtfyNotification({ name, phone, email, service, message }) {
  const topic = process.env.NTFY_TOPIC || 'Dr_Sushils_Websites_Appointments';
  const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';

  const payload = {
    topic: topic,
    title: `🚨 New Appointment: ${name} (${service})`,
    message: `👤 Patient: ${name}\n📞 Phone: ${phone}\n🏥 Service: ${service}\n📧 Email: ${email || 'Not provided'}\n📝 Notes: ${message || 'None'}`,
    priority: 4, // High priority (rings phone, vibrates, wakes screen)
    tags: ['stethoscope', 'hospital', 'bell'],
    actions: [
      {
        action: 'view',
        label: '📞 Call Patient',
        url: `tel:${phone}`,
      },
      {
        action: 'view',
        label: '💬 WhatsApp Patient',
        url: `https://wa.me/${cleanPhone}`,
      },
    ],
  };

  try {
    await fetch('https://ntfy.sh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn('ntfy push notification error (non-fatal):', err);
  }
}

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, service, message } = req.body || {};

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Name, phone number, and service are mandatory fields.' });
  }

  // Trigger instant push notification to doctor's device
  await sendNtfyNotification({ name, phone, email, service, message });

  const smtpUser = process.env.SMTP_USER || 'infohudadi@gmail.com';
  const smtpPass = process.env.SMTP_PASSWORD || 'orok acbg pwuh ndav';

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 1. Email notification to the Doctor (Dr. Sushil)
    const doctorMailOptions = {
      from: `"Hudadi Physiotherapy Website" <${smtpUser}>`,
      to: 'infohudadi@gmail.com',
      replyTo: email && email.trim() ? email : smtpUser,
      subject: `📋 New Appointment Request: ${name} (${service})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF;">
          <div style="background-color: #0A5C63; padding: 18px 24px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
            <h2 style="color: #FFFFFF; margin: 0; font-size: 20px; letter-spacing: 0.5px;">New Appointment Request</h2>
          </div>
          
          <p style="font-size: 15px; color: #2D3748; line-height: 1.6;">You have received a new appointment booking from the website:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; width: 35%; color: #4A5568; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Patient Name:</td>
              <td style="padding: 10px 12px; color: #1A202C; font-weight: 600; border-bottom: 1px solid #E2E8F0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #4A5568; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Phone Number:</td>
              <td style="padding: 10px 12px; color: #0A5C63; font-weight: 600; border-bottom: 1px solid #E2E8F0;">
                <a href="tel:${phone}" style="color: #0A5C63; text-decoration: none;">📞 ${phone}</a> &nbsp;
                <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none; font-weight: 600;">(WhatsApp)</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #4A5568; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Email:</td>
              <td style="padding: 10px 12px; color: #1A202C; border-bottom: 1px solid #E2E8F0;">${email || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #4A5568; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;">Service Requested:</td>
              <td style="padding: 10px 12px; color: #FF6B4D; font-weight: 600; border-bottom: 1px solid #E2E8F0;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: 600; color: #4A5568; background: #F8FAFC; vertical-align: top;">Booking Details / Notes:</td>
              <td style="padding: 10px 12px; color: #2D3748; white-space: pre-wrap;">${message || 'No additional notes provided.'}</td>
            </tr>
          </table>

          <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; padding: 14px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 0; font-size: 13px; color: #166534;">
              💡 <strong>Quick Action:</strong> Tap the phone number above to call the patient or open WhatsApp to confirm their appointment slot.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0 16px;" />
          <p style="font-size: 12px; color: #A0AEC0; margin: 0; text-align: center;">Hudadi Physiotherapy & Rehabilitation · Automated System</p>
        </div>
      `,
    };

    await transporter.sendMail(doctorMailOptions);

    // 2. Beautiful Confirmation Email to the Patient (if patient provided email)
    if (email && email.trim() && /^\S+@\S+\.\S+$/.test(email.trim())) {
      const patientMailOptions = {
        from: `"Dr. Sushil Hudadi (Hudadi Physiotherapy)" <${smtpUser}>`,
        to: email.trim(),
        replyTo: 'infohudadi@gmail.com',
        subject: `Appointment Request Received — Hudadi Physiotherapy & Rehabilitation`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #FFFFFF; color: #1A202C;">
            
            <!-- Header Banner -->
            <div style="text-align: center; border-bottom: 2px solid #0A5C63; padding-bottom: 20px; margin-bottom: 24px;">
              <h1 style="color: #0A5C63; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">HUDADI PHYSIOTHERAPY</h1>
              <p style="color: #FF6B4D; margin: 4px 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">& Rehabilitation · Home Care Specialist</p>
            </div>

            <!-- Greeting -->
            <p style="font-size: 16px; color: #1A202C; margin-bottom: 12px;">Dear <strong>${name}</strong>,</p>
            <p style="font-size: 15px; color: #4A5568; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out to <strong>Hudadi Physiotherapy & Rehabilitation</strong>. We have successfully received your appointment request. Dr. Sushil will review your details and contact you shortly on your phone (<strong>${phone}</strong>) to confirm your exact time slot and discuss your recovery goals.
            </p>

            <!-- Booking Summary Box -->
            <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 18px 20px; margin: 24px 0;">
              <h3 style="color: #0A5C63; margin: 0 0 14px; font-size: 15px; font-weight: 700; border-bottom: 1px solid #CBD5E1; padding-bottom: 8px;">
                📋 Summary of Your Request
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748B; width: 40%;">Selected Service:</td>
                  <td style="padding: 6px 0; color: #0F172A; font-weight: 600;">${service}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;">Contact Number:</td>
                  <td style="padding: 6px 0; color: #0F172A; font-weight: 600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;">Service Type:</td>
                  <td style="padding: 6px 0; color: #0F172A; font-weight: 600;">Home Visit (Bangalore) / Online</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748B;">Clinic Hours:</td>
                  <td style="padding: 6px 0; color: #0F172A; font-weight: 600;">Mon – Sat: 8:00 AM – 9:00 PM</td>
                </tr>
              </table>
            </div>

            <!-- What to Expect / Preparation Tips -->
            <div style="background-color: #F0FDFA; border-left: 4px solid #0A5C63; padding: 14px 18px; border-radius: 4px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px; color: #0A5C63; font-size: 14px; font-weight: 700;">💡 Preparing for Your Session:</h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 13.5px; color: #334155; line-height: 1.6;">
                <li>Wear comfortable, loose clothing that allows easy physical movement.</li>
                <li>Keep any recent medical, surgical, or X-ray/MRI reports accessible.</li>
                <li>Ensure a quiet, clear space (approx. 6x6 ft) for physical evaluation.</li>
              </ul>
            </div>

            <!-- Urgent / Direct Contact CTA -->
            <p style="font-size: 14px; color: #4A5568; line-height: 1.6; margin-bottom: 20px;">
              Need an immediate consultation or have questions? Feel free to message Dr. Sushil directly on WhatsApp:
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://wa.me/916364589646" style="background-color: #25D366; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 30px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(37,211,102,0.25);">
                💬 Chat with Dr. Sushil on WhatsApp
              </a>
            </div>

            <!-- Sign-off -->
            <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; margin-top: 28px;">
              <p style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: #0A5C63;">Dr. Sushil Hudadi, (PT)</p>
              <p style="margin: 0 0 4px; font-size: 13px; color: #64748B;">BPT-Certified Physiotherapist</p>
              <p style="margin: 0 0 4px; font-size: 13px; color: #64748B;">Hudadi Physiotherapy & Rehabilitation, Bangalore</p>
              <p style="margin: 0; font-size: 13px; color: #0A5C63;">📞 +91 63645 89646 | ✉️ infohudadi@gmail.com</p>
            </div>

            <p style="font-size: 11px; color: #94A3B8; text-align: center; margin-top: 28px; margin-bottom: 0;">
              This is an automated confirmation of your booking request. Please do not reply directly if your request is urgent.
            </p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(patientMailOptions);
      } catch (err) {
        console.warn('Patient confirmation email error (non-fatal):', err);
      }
    }

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email via Gmail SMTP:', error);
    return res.status(500).json({ error: 'Failed to send email. Please check SMTP settings.' });
  }
}

