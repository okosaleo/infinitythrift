"use server";
import formData from "form-data";
import Mailgun from "mailgun.js";

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  if (!process.env.MAILGUN_API_KEY) {
    throw new Error("MAILGUN_API_KEY environment variable is not set");
  }
  if (!process.env.MAILGUN_DOMAIN) {
    throw new Error("MAILGUN_DOMAIN environment variable is not set");
  }
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
  });

  const message = {
    from: process.env.EMAIL_FROM,
    to: to.toLowerCase().trim(),
    subject: subject.trim(),
    text: text.trim(),
  };

  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, message);

    return {
      success: true,
      messageId: response.id,
    };

  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
