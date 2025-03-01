import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req:Request){
    const {latitude, longitude} = await req.json()
    if(!latitude || !longitude){
        return NextResponse.json({ error: "Latitude and longitude are required" },{status:400})
    }

    const response = await axios.get(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apikey=${process.env.NEXT_PUBLIC_HERE_API_KEY}`
    )

    try {
        const data = response.data

        if(!data){
            return NextResponse.json({ error:`HTTP Error: ${response.status}` },{status:400})
        }

        const address = data.items[0]?.address?.label || "Address not found"

        return NextResponse.json({address},{status:200})

    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch address: ${error}` })
    }
    
}