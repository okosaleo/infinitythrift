import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_TOKEN as string; // Your Mailtrap API token
const SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL as string; // Verified sender email

const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 3377093,
});

export const sendVerificationEmail = async ({
  recipientEmail,
  verificationUrl,
}: {
  recipientEmail: string;
  verificationUrl: string;
}) => {
  try {
    const sender = {
      email: "hello@example.com",
      name: "Mailtrap Test",
    };
    
    const response = await client.testing.send({
      from: sender,
      to: [{ email: recipientEmail }],
      subject: "Verify Your Email Address",
      text: `Please verify your email by clicking the following link: ${verificationUrl}`,
      html: `<p>Please verify your email by clicking the following link:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email.");
  }
};

