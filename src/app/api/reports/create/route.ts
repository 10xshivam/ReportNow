import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Received report submission request");
    
    const body = await req.json();
    
    if (!body) {
      console.error("Request body is null or undefined");
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
        },
        { status: 400 }
      );
    }
    
    console.log("Request body:", body);
    
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
      wantsNotifications,
      email,
    } = body;
    
    if (!reportId || !reportType || !title) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    let imageUrl = null;
    if (image) {
      try {
        const uploadedImage = await uploadImage(image);
        imageUrl = uploadedImage?.secure_url || null;
        console.log("Image uploaded:", imageUrl);
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
      }
    }
    
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
        image: imageUrl,
        status: status || "PENDING",
        wantsNotifications: wantsNotifications || false,
        email: email || null,
      },
    });
    
    console.log("Report created:", report.reportId);
    
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