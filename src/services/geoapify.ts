// Service for handling Geoapify API calls
const GEOAPIFY_API_KEY = '013fdc1900344bedbcc2d34815a749bf';
const GEOAPIFY_BASE_URL = 'https://api.geoapify.com/v1';
interface GeocodingResult {
  lat: number;
  lon: number;
  formatted: string;
  city?: string;
  state?: string;
  country?: string;
  confidence?: number;
}
interface EcosystemData {
  innovationHubs: number;
  vcFirms: number;
  accelerators: number;
  coworkingSpaces: number;
  ecosystemScore: number;
}
/**
 * Geocodes an address to get coordinates and location details
 */
export const geocodeAddress = async (address: string, city: string, state: string, zipCode: string): Promise<GeocodingResult | null> => {
  try {
    const formattedAddress = `${address}, ${city}, ${state} ${zipCode}`;
    const encodedAddress = encodeURIComponent(formattedAddress);
    const response = await fetch(`${GEOAPIFY_BASE_URL}/geocode/search?text=${encodedAddress}&format=json&apiKey=${GEOAPIFY_API_KEY}`);
    if (!response.ok) {
      throw new Error(`Geocoding failed with status: ${response.status}`);
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        lat: result.lat,
        lon: result.lon,
        formatted: result.formatted,
        city: result.city,
        state: result.state,
        country: result.country,
        confidence: result.rank?.confidence
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};
/**
 * Gets places of interest around the startup location to evaluate ecosystem
 * This is a mock function that would use the Geoapify Places API in a real implementation
 */
export const getStartupEcosystem = async (lat: number, lon: number): Promise<EcosystemData> => {
  try {
    // In a real implementation, we would make calls to Geoapify Places API to find:
    // - Nearby innovation hubs
    // - VC firms
    // - Accelerators
    // - Coworking spaces
    // For demo purposes, we'll return mock data based on coordinates
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock scoring logic based on location
    // In a real app, this would use actual API results
    const innovationHubs = Math.floor(Math.random() * 5) + 1;
    const vcFirms = Math.floor(Math.random() * 10) + 2;
    const accelerators = Math.floor(Math.random() * 3) + 1;
    const coworkingSpaces = Math.floor(Math.random() * 8) + 3;
    // Calculate ecosystem score (0-100)
    const ecosystemScore = Math.min(Math.round((innovationHubs * 5 + vcFirms * 3 + accelerators * 7 + coworkingSpaces * 2) / 1.5), 100);
    return {
      innovationHubs,
      vcFirms,
      accelerators,
      coworkingSpaces,
      ecosystemScore
    };
  } catch (error) {
    console.error('Ecosystem analysis error:', error);
    return {
      innovationHubs: 0,
      vcFirms: 0,
      accelerators: 0,
      coworkingSpaces: 0,
      ecosystemScore: 0
    };
  }
};