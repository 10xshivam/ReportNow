import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req:Request){

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
    console.log(text)
}