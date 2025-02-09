import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_KEY!);

export const sendVerificationEmail = async ({
  recipientEmail,
  verificationUrl,
}: {
  recipientEmail: string;
  verificationUrl: string;
}) => {
  try {
    const sender = "hello@infinitythrift.com"
    
    const response = await client.sendEmail({
      "From": sender,
      "To": recipientEmail,
      "TextBody": "Verify Your Email",
      "Subject": "Verify Your Email Address",
      "MessageStream": "outbound",
      "HtmlBody": `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="text-align: center; padding: 0; width: 100%; height: 300px">
    <img src="https://utfs.io/f/mLASHSxEsNLiuuEsIS1jozy9UTrqw6tkM4On82eKlLvIfSu7" 
         alt="Company Logo" 
         style="width: 100%; height: 300px; display: block; object-fit: cover;">
</div>

        <!-- Main Content -->
        <div style="background-color: #ffffff; padding: 30px 20px; border-radius: 8px; margin-top: 20px;">
            <h1 style="color: #333333; font-size: 24px; margin-bottom: 25px; text-align: center;">
                Verify Your Email Address
            </h1>

            <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Welcome to Infinity Thrift! Please verify your email address to complete your account setup 
                and start using our services.
            </p>

            <div style="text-align: center; margin: 40px 0;">
                <a href="${verificationUrl}" 
                   style="background-color: #2563eb; color: #ffffff; padding: 15px 30px; 
                          text-decoration: none; border-radius: 5px; font-weight: bold;
                          display: inline-block; font-size: 16px;">
                    Verify Email Address
                </a>
            </div>

            <p style="color: #666666; font-size: 14px; line-height: 1.6;">
                If you didn't create an account with Infinity Thrift, you can safely ignore this email.
            </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px 0; color: #999999; font-size: 12px;">
            <p style="margin: 10px 0;">
                © ${new Date().getFullYear()} Infinity Thrift. All rights reserved.
            </p>
            <p style="margin: 10px 0;">
                Infinity Thrift Co., 123 Business Rd, Lagos, Nigeria
            </p>
            <p style="margin: 10px 0;">
                Need help? Contact us at <a href="mailto:${sender}" 
                style="color: #2563eb; text-decoration: none;">${sender}</a>
            </p>
        </div>
    </div>
</body>
</html>
`,
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email.");
  }
};

export const sendEmail = async ({
    recipientEmail,
    url,
  }: {
    recipientEmail: string;
    url: string;
  }) => {
    try {
      const sender = "hello@infinitythrift.com"
      
      const response = await client.sendEmail({
        "From": sender,
        "To": recipientEmail,
        "TextBody": "Reset Your password",
        "Subject": "Reset your Infinity Thrift account password.",
        "MessageStream": "outbound",
        "HtmlBody": `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

        <!-- Main Content -->
        <div style="background-color: #ffffff; padding: 30px 20px; border-radius: 8px; margin-top: 20px;">
            <h1 style="color: #333333; font-size: 24px; margin-bottom: 25px; text-align: center;">
                Reset Your Password
            </h1>

            <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                 Reset your Infinity Thrift account password.
            </p>

            <div style="text-align: center; margin: 40px 0;">
                <a href="${url}" 
                   style="background-color: #2563eb; color: #ffffff; padding: 15px 30px; 
                          text-decoration: none; border-radius: 5px; font-weight: bold;
                          display: inline-block; font-size: 16px;">
                    Reset your password
                </a>
            </div>

            <p style="color: #666666; font-size: 14px; line-height: 1.6;">
                If you didn't request to change or reset your password, you can safely ignore this email.
            </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px 0; color: #999999; font-size: 12px;">
            <p style="margin: 10px 0;">
                © ${new Date().getFullYear()} Infinity Thrift. All rights reserved.
            </p>
            <p style="margin: 10px 0;">
                Infinity Thrift Co., 123 Business Rd, Lagos, Nigeria
            </p>
            <p style="margin: 10px 0;">
                Need help? Contact us at <a href="mailto:${sender}" 
                style="color: #2563eb; text-decoration: none;">${sender}</a>
            </p>
        </div>
    </div>
</body>
</html> `,
      });
  
      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send verification email.");
    }
  };




