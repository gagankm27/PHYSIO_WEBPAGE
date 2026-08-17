import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, service, message } = req.body || {};

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Name, phone number, and service are mandatory fields.' });
  }

  const smtpUser = process.env.SMTP_USER || 'infohudadi@gmail.com';
  const smtpPass = process.env.SMTP_PASSWORD;

  // If SMTP password is not set yet in Vercel environment variables, return a helpful response
  if (!smtpPass) {
    console.warn('SMTP_PASSWORD is not configured in environment variables.');
    return res.status(200).json({
      success: true,
      message: 'Form submitted (SMTP_PASSWORD not configured yet in Vercel).'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Hudadi Physiotherapy" <${smtpUser}>`,
      to: 'infohudadi@gmail.com',
      replyTo: email && email.trim() ? email : smtpUser,
      subject: `New Appointment / Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0A3C42; margin-top: 0;">New Appointment / Inquiry</h2>
          <p style="font-size: 15px; color: #4A5568;">You received a new inquiry from the Hudadi Physiotherapy website:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 35%; color: #2D3748; border-bottom: 1px solid #edf2f7;">Name:</td>
              <td style="padding: 8px; color: #4A5568; border-bottom: 1px solid #edf2f7;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #2D3748; border-bottom: 1px solid #edf2f7;">Phone:</td>
              <td style="padding: 8px; color: #4A5568; border-bottom: 1px solid #edf2f7;"><a href="tel:${phone}" style="color: #008080; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #2D3748; border-bottom: 1px solid #edf2f7;">Email:</td>
              <td style="padding: 8px; color: #4A5568; border-bottom: 1px solid #edf2f7;">${email || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #2D3748; border-bottom: 1px solid #edf2f7;">Service:</td>
              <td style="padding: 8px; color: #4A5568; border-bottom: 1px solid #edf2f7;">${service || 'General Inquiry'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #2D3748; vertical-align: top;">Message:</td>
              <td style="padding: 8px; color: #4A5568;">${message || 'No additional message.'}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #edf2f7; margin: 20px 0;" />
          <p style="font-size: 12px; color: #a0aec0; margin-bottom: 0;">Sent automatically from hudadi physiotherapy website form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email via Gmail SMTP:', error);
    return res.status(500).json({ error: 'Failed to send email. Please check SMTP settings.' });
  }
}
