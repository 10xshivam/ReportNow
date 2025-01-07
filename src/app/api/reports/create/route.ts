import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const {
          reportId,
          reportType,
          incidentType,
          location,
          latitude,
          longitude,
          title,
          description,
          image,
          status,
        } = await req.json();

        const uploadedImage = await uploadImage(image)

        console.log(uploadedImage?.secure_url)
    
        const report = await prisma.report.create({
          data: {
            reportId,
            reportType,
            incidentType,
            title,
            description,
            location,
            latitude: latitude || null,
            longitude: longitude || null,
            image: uploadedImage?.secure_url || null,
            status: status || "PENDING",
          },
        });
    
        return NextResponse.json({
          success: true,
          reportId: report.reportId,
          message: "Report submitted successfully",
        });
      } catch (error) {
        console.error("Error creating report:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to submit report",
          },
          { status: 500 }
        );
      }
}