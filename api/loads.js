import express from 'express';
import { searchLoads } from '../services/dat-service.js';
import { validateLoadSearch } from '../middleware/validation.js';

const router = express.Router();

/**
 * @route POST /api/loads/search
 * @description Search for available loads based on parameters
 */
router.post('/search', validateLoadSearch, async (req, res) => {
  try {
    const { 
      origin, 
      destination, 
      searchRadius, 
      maxDeadhead,
      minPrice,
      minRate,
      trailerType 
    } = req.body;

    const loads = await searchLoads({
      origin,
      destination,
      searchRadius,
      maxDeadhead,
      minPrice,
      minRate,
      trailerType
    });

    res.json(loads);
  } catch (error) {
    console.error('Load search error:', error);
    res.status(500).json({ 
      error: 'Failed to search loads',
      details: error.message 
    });
  }
});

export default router;
