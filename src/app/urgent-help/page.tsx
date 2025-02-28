"use client"
import React, { useState,} from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Map, Navigation, Loader2, Hospital, Shield, Flame, Pill } from "lucide-react";
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
const UrgentHelp = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [activeType, setActiveType] = useState<EmergencyContactType>('hospital');
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(false);
  const getUserLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLoadingLocation(false);
          toast({
            title: "Location detected",
            description: "Successfully detected your location.",
          });
          fetchContacts(latitude, longitude, activeType);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingLocation(false);
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Could not detect your location. Please allow location access.",
          });
        }
      );
    } else {
      setLoadingLocation(false);
      toast({
        variant: "destructive",
        title: "Location not supported",
        description: "Your browser does not support geolocation.",
      });
    }
  };
  const fetchContacts = async (lat: number, lng: number, type: EmergencyContactType) => {
    setLoading(true);
    try {
      const data = await getEmergencyContacts(lat, lng, type);
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to fetch ${type} contacts.`,
      });
    } finally {
      setLoading(false);
    }
  };
  const getTypeIcon = (type: EmergencyContactType) => {
    switch (type) {
      case 'hospital':
        return <Hospital className="h-5 w-5" />;
      case 'police-station':
        return <Shield className="h-5 w-5" />;
      case 'fire-station':
        return <Flame className="h-5 w-5" />;
      case 'pharmacy':
        return <Pill className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  const getTypeName = (type: EmergencyContactType): string => {
    switch (type) {
      case 'hospital':
        return 'Hospitals';
      case 'police-station':
        return 'Police Stations';
      case 'fire-station':
        return 'Fire Stations';
      case 'pharmacy':
        return 'Pharmacies';
      default:
        return 'Emergency Services';
    }
  };
  const handleTypeChange = (type: EmergencyContactType) => {
    setActiveType(type);
    if (location) {
      fetchContacts(location.lat, location.lng, type);
    }
  };
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 pt-40 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-7xl tracking-tight font-bold mb-5 ">Urgent Help</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Find emergency services near your location. Allow location access to see nearest hospitals, police stations, 
              fire stations, and pharmacies.
            </p>
          </div>
          
          <div className="bg-destructive text-white p-4 rounded-lg mb-8 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6" />
              <div>
                <h3 className="font-bold text-lg">Emergency Number: 112</h3>
                <p className="text-sm opacity-90">For immediate emergency assistance in India</p>
              </div>
            </div>
            <a href="tel:112" className="bg-white text-destructive font-bold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors">
              Call Now
            </a>
          </div>
          
          <div className="bg-gray-500/20 p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-center mb-2">
                <h2 className="text-xl font-semibold  mb-2">Find Emergency Services Near You</h2>
                <p className="text-gray-500">Allow location access to find services near you</p>
              </div>
              
              <Button 
                onClick={getUserLocation} 
                className="flex items-center gap-2 bg-accent text-white bg-purple-500"
                disabled={loadingLocation}
              >
                {loadingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                {location ? 'Update My Location' : 'Get My Location'}
              </Button>
              
              {location && (
                <p className="text-sm text-gray-600">
                  Your location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              )}
            </div>
          </div>
          
          {location && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {(['hospital', 'police-station', 'fire-station', 'pharmacy'] as EmergencyContactType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`p-4 rounded-lg shadow text-center transition-colors ${
                      activeType === type 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-600 hover:bg-gray-700 '
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {getTypeIcon(type)}
                      <span className="font-medium">{getTypeName(type)}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="bg-gray-800/60 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  {getTypeIcon(activeType)} {getTypeName(activeType)} Near You
                </h2>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-600 " />
                    <span className="ml-2 text-gray-600">Searching for nearest {getTypeName(activeType).toLowerCase()}...</span>
                  </div>
                ) : contacts.length > 0 ? (
                  <ul className="divide-y divide-gray-200/10">
                    {contacts.map((contact, index) => (
                      <li key={index} className="py-4">
                        <div className="flex items-start gap-2">
                          <div className="mt-1 p-2 bg-accent/10 rounded-full">
                            {getTypeIcon(activeType)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-200">{contact.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">{contact.address}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-400">
                              <Map className="h-4 w-4 mr-1" />
                              <span>{(contact.distance / 1000).toFixed(2)} km away</span>
                              
                              <a 
                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.address)}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="ml-4  hover:underline flex items-center "
                              >
                                <Navigation className="h-4 w-4 mr-1 " />
                                Get Directions
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p>No {getTypeName(activeType).toLowerCase()} found near your location.</p>
                    <p className="mt-2 text-sm">Try updating your location or selecting a different service.</p>
                  </div>
                )}
              </div>
            </>
          )}
          
          {!location && (
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-md mt-8">
              <h2 className="text-xl font-semibold mb-2">Emergency Services Information</h2>
              <p className="text-gray-500 mb-4">
                This feature helps you find emergency services near your current location. To use it, please allow location access
                by clicking the &quot;Get My Location&quot; button above.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200/10 rounded-lg p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Hospital className="h-5 w-5 text-accent" /> Hospitals
                  </h3>
                  <p className="text-sm text-gray-500">Find the nearest hospitals for medical emergencies.</p>
                </div>
                <div className="border border-gray-200/10 rounded-lg p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-accent" /> Police Stations
                  </h3>
                  <p className="text-sm text-gray-500">Locate nearby police stations for security emergencies.</p>
                </div>
                <div className="border border-gray-200/10 rounded-lg p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-accent" /> Fire Stations
                  </h3>
                  <p className="text-sm text-gray-500">Find fire stations for fire emergencies and rescue operations.</p>
                </div>
                <div className="border border-gray-200/10 rounded-lg p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Pill className="h-5 w-5 text-accent" /> Pharmacies
                  </h3>
                  <p className="text-sm text-gray-500">Locate pharmacies for urgent medication needs.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default UrgentHelp;