import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { latitude, longitude } = await req.json();

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "https://api.radar.io/v1/geocode/reverse",
      {
        params: {
          coordinates: `${latitude},${longitude}`,
          layers: "", // optional
        },
        headers: {
          Authorization: process.env.NEXT_PUBLIC_RADAR_API_KEY || "",
        },
      }
    );

    const data = response.data;

    if (!data || !data.addresses?.length) {
      return NextResponse.json(
        { error: `HTTP Error: ${response.status}` },
        { status: 400 }
      );
    }

    const formattedAddress =
      data.addresses[0]?.formattedAddress || "Address not found";

    return NextResponse.json({ address: formattedAddress }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch address: ${error}` },
      { status: 500 }
    );
  }
}
