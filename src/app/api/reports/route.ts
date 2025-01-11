import { authOptions } from "@/lib/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({error:"Unauthorised"},{status:400})
    }

    try {
        const reports = await prisma.report.findMany({
            orderBy:{createdAt:'desc'},
            select:{
                reportId:true,
                reportType:true,
                title: true,
                description: true,
                location: true,
                image: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            }
        })
        console.log(reports)
    
        return NextResponse.json(reports)
    } catch (error) {
        console.error("Failed to fetch reports",error)
        return NextResponse.json(
            { error: "Failed to fetch reports" },
            { status: 500 }
        )
    } finally {
        if (process.env.VERCEL) {
            await prisma.$disconnect();
        }
    }
    
}