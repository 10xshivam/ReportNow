import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const reportId = url.searchParams.get("reportId");

    if (!reportId) {
      return NextResponse.json(
        { error: "Report ID is required as a query parameter" },
        { status: 400 }
      );
    }

    const { status } = await req.json();
    if (!status) {
      return NextResponse.json(
        { error: "Status is required in the request body" },
        { status: 400 }
      );
    }

    const updatedReport = await prisma.report.update({
      where: { reportId },
      data: { status },
    });

    return NextResponse.json(updatedReport, { status: 200 });
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}
