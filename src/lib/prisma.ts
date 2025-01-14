import { PrismaClient } from "@prisma/client";


// Define a global object to store Prisma instance
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Check if a Prisma instance already exists, otherwise create one
export const prisma =
  
  globalForPrisma.prisma ||
  (() => {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not defined!');
    }
    const prismaClient = new PrismaClient();
    // Store the instance globally in development mode
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaClient;
    }
    return prismaClient;
  })();

export default prisma;
