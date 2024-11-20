import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Configure Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});

export const sendVerificationCode = functions.https.onCall(
  async (
    request: functions.https.CallableRequest<{ email: string; code: string }>
  ): Promise<{ success: boolean }> => {
    const { email, code } = request.data; // Extract `email` and `code` from `request.data`

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true }; // Return success response
    } catch (error) {
      console.error('Error sending email:', error);
      throw new functions.https.HttpsError('internal', 'Failed to send email');
    }
  }
);
