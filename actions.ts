'use server'

import { headers } from "next/headers";
import { auth } from "./auth";
import { prisma } from "./lib/prisma"
import { ThriftSavingsSchema } from "./lib/zodSchemas";



 export async function createThriftContribution(prevState: any, formData: FormData) {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
          throw new Error("Unauthorized");
        }
        const user = session.user;
        if (!user) throw new Error("Unauthorized");

        const rawData = {
            category: formData.get('category'),
            dailyAmount: Number(formData.get('dailyAmount')),
            description: formData.get('description')
          };
      
          // Zod validation
          const validatedData = ThriftSavingsSchema.parse({
            ...rawData,
            dailyAmount: Number(rawData.dailyAmount)
          });
      
          // Create thrift savings with tracker
          await prisma.thriftSavings.create({
            data: {
              userId: user.id,
              category: validatedData.category,
              dailyAmount: validatedData.dailyAmount,
              currentAmount: 0,
              description: validatedData.description,
              trackers: {
                create: [{
                  weekStart: new Date(),
                  monday: false,
                  tuesday: false,
                  wednesday: false,
                  thursday: false,
                  friday: false,
                  saturday: false,
                  sunday: false
                }]
              }
            }
          });
      
      }