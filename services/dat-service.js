import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DAT_API_BASE_URL = 'https://api.dat.com/v1';

/**
 * Search for available loads using DAT API
 */
export async function searchLoads(params) {
  const { 
    origin, 
    destination, 
    searchRadius,
    maxDeadhead,
    minPrice,
    minRate,
    trailerType 
  } = params;

  try {
    const response = await axios.get(`${DAT_API_BASE_URL}/loads/search`, {
      headers: {
        'Authorization': `Bearer ${process.env.DAT_API_KEY}`,
        'Content-Type': 'application/json'
      },
      params: {
        origin: {
          city: origin,
          radius: searchRadius
        },
        destination: {
          city: destination,
          radius: searchRadius
        },
        equipment: trailerType,
        minRate: minRate,
        minPrice: minPrice,
        maxDeadhead: maxDeadhead
      }
    });

    return response.data;
  } catch (error) {
    console.error('DAT API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch loads from DAT API');
  }
}
