import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; // Import NextRequest

export async function GET(
  req: NextRequest,
  context: { params: { reportId: string } }
) {
  const { reportId } = context.params;

  try {
    const report = await prisma.report.findUnique({
      where: {
        reportId, 
      },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error("Error fetching report details:", error);
    return NextResponse.json(
      { error: "Failed to fetch report details" },
      { status: 500 }
    );
  }
}
