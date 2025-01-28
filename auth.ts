import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./lib/prisma";
import { sendVerificationEmail } from "./actions/email";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 // Cache duration in seconds
  }
  },
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendVerificationEmail({
        recipientEmail: user.email,
        verificationUrl,
        
      });
    },
  },
});

export type Session = typeof auth.$Infer.Session
