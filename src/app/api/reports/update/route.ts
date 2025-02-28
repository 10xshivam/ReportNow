import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    
    if (updatedReport.wantsNotifications && updatedReport.email) {
      try {
        await resend.emails.send({
          from: "ReportNow@resend.dev",
          to: updatedReport.email,
          subject: `Report Status Update: ${updatedReport.title}`,
          html: `
            <h1>Your Report Status Has Been Updated</h1>
            <p>Hello,</p>
            <p>We wanted to let you know that the status of your report has been updated.</p>
            <p><strong>Report ID:</strong> ${updatedReport.reportId}</p>
            <p><strong>Title:</strong> ${updatedReport.title}</p>
            <p><strong>New Status:</strong> ${updatedReport.status}</p>
            <p>Thank you for using our reporting system.</p>
          `,
        });
        
        console.log(`Email notification sent to ${updatedReport.email}`);
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }
    }
    
    return NextResponse.json(updatedReport, { status: 200 });
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}
