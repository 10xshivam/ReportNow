import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

// Define a global object to store Prisma instance
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Check if a Prisma instance already exists, otherwise create one
export const prisma =
  
  globalForPrisma.prisma ||
  (() => {
    const prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, // Use the loaded environment variable
        },
      },
    });
    // Store the instance globally in development mode
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaClient;
    }
    return prismaClient;
  })();

export default prisma;
