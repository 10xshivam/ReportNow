import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test the database connection with a simple query
    console.log('Database URL:', process.env.DATABASE_URL);
    const result = await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ message: 'Database connected successfully!', result });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { error: 'Failed to connect to the database', details: errorMessage },
      { status: 500 }
    );
  }
}

