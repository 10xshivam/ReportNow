import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); 
    const reportId = searchParams.get('reportId'); 
    console.log(reportId)

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }

    const report = await prisma.report.findUnique({
      where: { reportId },
    });

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    // Return the report as JSON
    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error('Error fetching report details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

