import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(req:Request,{params}:{params:{reportId:string}}){
    const { reportId } = params;

    try {
        const {status} = await req.json()

        if(status){
            return NextResponse.json({error:"Status is required"},{status:400})
        }

        const updatedReport = await prisma.report.update({
            where:{reportId},
            data:{status}
        })

        return NextResponse.json(updatedReport)
    } catch (error) {
        console.error("Failed to update report",error)
        return NextResponse.json(
            { error: "Failed to update report" },
            { status: 500 }
        )
    }
}