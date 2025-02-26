import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./lib/prisma";
import { sendEmail, sendVerificationEmail } from "./actions/email";
import { openAPI } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  rateLimit: {
    window: 10, // time window in seconds
    max: 100, // max requests in the window
},
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 12,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 60
  }
  },
  plugins: [openAPI(), nextCookies(), admin({
    impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
  })],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url}) => {
      await sendEmail({
       recipientEmail: user.email,
       url
      });
    },
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
