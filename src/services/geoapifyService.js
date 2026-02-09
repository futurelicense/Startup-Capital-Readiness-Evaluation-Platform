const GEOAPIFY_API_KEY = "013fdc1900344bedbcc2d34815a749bf";
const GEOAPIFY_BASE_URL = "https://api.geoapify.com/v1";
/**
 * Geocodes an address to get coordinates
 * @param {string} address - Full address string
 * @param {string} city - City name
 * @param {string} state - State code
 * @param {string} zipCode - ZIP code
 * @returns {Promise} - Promise with location data
 */
export const geocodeAddress = async (address, city, state, zipCode) => {
  const formattedAddress = `${address}, ${city}, ${state} ${zipCode}`;
  const encodedAddress = encodeURIComponent(formattedAddress);
  try {
    const response = await fetch(`${GEOAPIFY_BASE_URL}/geocode/search?text=${encodedAddress}&apiKey=${GEOAPIFY_API_KEY}`);
    if (!response.ok) {
      throw new Error("Geocoding failed");
    }
    const data = await response.json();
    return data.features[0];
  } catch (error) {
    console.error("Error geocoding address:", error);
    throw error;
  }
};
/**
 * Analyzes the ecosystem around a location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise} - Promise with ecosystem score data
 */
export const analyzeEcosystem = async (lat, lon) => {
  try {
    // In a real implementation, we would make calls to find:
    // 1. Nearby accelerators/incubators
    // 2. VC firms
    // 3. Innovation hubs
    // 4. Coworking spaces
    // Using Geoapify Places API
    const placesResponse = await fetch(`${GEOAPIFY_BASE_URL}/places?categories=commercial.business_center,commercial.coworking,education.university&filter=circle:${lon},${lat},5000&apiKey=${GEOAPIFY_API_KEY}`);
    if (!placesResponse.ok) {
      throw new Error("Places search failed");
    }
    const placesData = await placesResponse.json();
    // Calculate a simple ecosystem score based on number of relevant places
    const numPlaces = placesData.features.length;
    let ecosystemScore = 0;
    if (numPlaces >= 20) ecosystemScore = 85;else if (numPlaces >= 15) ecosystemScore = 75;else if (numPlaces >= 10) ecosystemScore = 65;else if (numPlaces >= 5) ecosystemScore = 55;else if (numPlaces >= 2) ecosystemScore = 45;else ecosystemScore = 35;
    return {
      score: ecosystemScore,
      placesCount: numPlaces,
      places: placesData.features.slice(0, 5) // Return top 5 places
    };
  } catch (error) {
    console.error("Error analyzing ecosystem:", error);
    // Return a default score for demo purposes
    return {
      score: 55,
      placesCount: 0,
      places: []
    };
  }
};
/**
 * Calculates the complete geo-ecosystem score
 * @param {Object} locationData - Full location data including address
 * @returns {Promise} - Promise with final geo score
 */
export const calculateGeoScore = async locationData => {
  try {
    const {
      address,
      city,
      state,
      zipCode
    } = locationData;
    // Step 1: Geocode the address
    const geocodeResult = await geocodeAddress(address, city, state, zipCode);
    if (!geocodeResult || !geocodeResult.geometry) {
      throw new Error("Unable to geocode address");
    }
    const [lon, lat] = geocodeResult.geometry.coordinates;
    // Step 2: Analyze the startup ecosystem
    const ecosystemData = await analyzeEcosystem(lat, lon);
    return {
      score: ecosystemData.score,
      geocodeResult,
      ecosystemData
    };
  } catch (error) {
    console.error("Error calculating geo score:", error);
    // Return a fallback score for demo purposes
    return {
      score: 55,
      geocodeResult: null,
      ecosystemData: null
    };
  }
};