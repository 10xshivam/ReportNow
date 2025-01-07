import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req:Request){

    try {
        const {image}  = await req.json() // look like this -> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...
    
        const base64Data = image.split(',')[1]
    
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const prompt = `Analyze this emergency situation image and respond in this exact format without any asterisks or bullet points:
                        TITLE: Write a clear, brief title
                        TYPE: Choose one (Theft, Fire Outbreak, Medical Emergency, Natural Disaster, Violence, or Other)
                        DESCRIPTION: Write a clear, concise description`
    
        const result = await model.generateContent([
            prompt,
            {
                inlineData:{
                    data: base64Data,
                    mimeType: "image/jpeg",
                }
            }
        ]);
        const text = result.response.text()
        const titleMatch = text.match(/TITLE:\s*(.+)/);
        const typeMatch = text.match(/TYPE:\s*(.+)/);
        const descMatch = text.match(/DESCRIPTION:\s*(.+)/);

        return NextResponse.json({
        title: titleMatch?.[1]?.trim() || "",
        incidentType: typeMatch?.[1]?.trim() || "",
        description: descMatch?.[1]?.trim() || "",
        })
    } catch (error) {
        console.error("Error in analyzing image",error)
        return NextResponse.json(
            { error: "Failed to analyze image" },
            { status: 500 }
        )
    }
}