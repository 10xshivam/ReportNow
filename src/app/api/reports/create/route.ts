// src/app/api/reports/create/route.ts
import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { reportSubmissionLimiter } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Received report submission request");

    // Apply rate limiting
    const rateLimitResult = await reportSubmissionLimiter.isRateLimited(req);
    const rateLimitHeaders = reportSubmissionLimiter.createHeaders(rateLimitResult);

    if (rateLimitResult.limited) {
      console.log("Rate limit exceeded for report submission");
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Too many reports submitted. Please try again later.",
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429, // Too Many Requests
          headers: rateLimitHeaders,
        }
      );
    }

    const body = await req.json();
    
    if (!body) {
      console.error("Request body is null or undefined");
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
        },
        {
          status: 400,
          headers: rateLimitHeaders,
        }
      );
    }

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

    // Validate required fields
    if (!reportId || !reportType || !title) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        {
          status: 400,
          headers: rateLimitHeaders,
        }
      );
    }

    // Validate email if notifications are requested
    if (wantsNotifications && (!email || !email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required when notifications are enabled",
        },
        {
          status: 400,
          headers: rateLimitHeaders,
        }
      );
    }

    // Additional validation for emergency reports
    if (reportType === "EMERGENCY" && (!location || !description)) {
      return NextResponse.json(
        {
          success: false,
          error: "Location and description are required for emergency reports",
        },
        {
          status: 400,
          headers: rateLimitHeaders,
        }
      );
    }

    let imageUrl = "";
    if (image) {
      try {
        console.log("Starting image upload");
        const uploadedImage = await uploadImage(image);
        imageUrl = uploadedImage?.secure_url || "";
        console.log("Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to upload image. Please try again.",
          },
          {
            status: 500,
            headers: rateLimitHeaders,
          }
        );
      }
    }

    // Create the report
    const report = await prisma.report.create({
      data: {
        reportId,
        reportType,
        incidentType,
        title: title.trim(),
        description: description?.trim() || "",
        location: location?.trim() || "",
        latitude: latitude || 0,
        longitude: longitude || 0,
        image: imageUrl,
        status: status || "PENDING",
        wantsNotifications: wantsNotifications || false,
        email: email?.trim() || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log("Report created successfully:", report.reportId);

    // Return success response with rate limit headers
    return NextResponse.json(
      {
        success: true,
        reportId: report.reportId,
        message: "Report submitted successfully",
        reportType: report.reportType,
      },
      {
        status: 201,
        headers: rateLimitHeaders,
      }
    );

  } catch (error) {
    console.error("Error creating report:", error);
    
    // Try to get rate limit headers even in error case
    let rateLimitHeaders = {};
    try {
      const rateLimitResult = await reportSubmissionLimiter.isRateLimited(req);
      rateLimitHeaders = reportSubmissionLimiter.createHeaders(rateLimitResult);
    } catch (rateLimitError) {
      console.error("Error getting rate limit headers:", rateLimitError);
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit report. Please try again later.",
      },
      {
        status: 500,
        headers: rateLimitHeaders,
      }
    );
  }
}