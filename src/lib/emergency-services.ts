import axios from "axios";

export type EmergencyContactType = 'hospital' | 'police-station' | 'fire-station' | 'pharmacy';

export interface EmergencyContact {
  name: string;
  address: string;
  distance: number;
}

interface HereApiPlace {
  title: string;
  address: {
    label: string;
  };
  distance: number;
}

interface HereApiResponse {
  items: HereApiPlace[];
}

export const getEmergencyContacts = async (
  latitude: number, 
  longitude: number, 
  type: EmergencyContactType = 'hospital',
  limit: number = 5
): Promise<EmergencyContact[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_HERE_API_KEY; 
  
  const url = `https://discover.search.hereapi.com/v1/discover?at=${latitude},${longitude}&q=${type}&limit=${limit}&apiKey=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    const data: HereApiResponse = response.data;
    
    return data.items.map((place) => ({
      name: place.title,
      address: place.address.label,
      distance: place.distance,
    }));
  } catch (error) {
    console.error(`Error fetching ${type} contacts:`, error);
    return [];
  }
};
