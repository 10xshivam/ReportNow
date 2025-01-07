import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({params}:{params:{reportId:string}}){
    const reportId = params.reportId
    try {
        const report = await prisma.report.findUnique({
            where:{
                reportId
            }
        })

        if(!report){
            return NextResponse.json({error: "Report not found"}, {status: 404})
        }

        console.log(report)

        return NextResponse.json({data:report},{status:200})
    } catch (error) {
        console.error("Error fetching report details:", error)
        return NextResponse.json({error: "Failed to fetch report details"},{status: 500})
    }
}