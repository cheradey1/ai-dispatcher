import express from 'express';
import { optimizeRoute } from '../services/openai-service.js';
import { RouteService } from '../services/route-service.js';
import { validateRouteOptimization, validateRouteCreate } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route POST /api/route/optimize
 * @description Optimize route using AI
 */
router.post('/optimize', authenticate, validateRouteOptimization, async (req, res) => {
  try {
    const {
      loads,
      constraints,
      startTime,
      endTime
    } = req.body;

    const optimizedRoute = await optimizeRoute({
      loads,
      constraints,
      startTime,
      endTime
    });

    // Зберігаємо оптимізований маршрут
    const route = await RouteService.createRoute(req.user.id, {
      origin: loads[0].origin,
      destination: loads[loads.length - 1].destination,
      startTime,
      endTime,
      constraints,
      optimizedRoute
    });

    res.json(route);
  } catch (error) {
    console.error('Route optimization error:', error);
    res.status(500).json({
      error: 'Failed to optimize route',
      details: error.message
    });
  }
});

/**
 * @route GET /api/route
 * @description Get user's routes
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      limit: parseInt(req.query.limit) || 10,
      skip: parseInt(req.query.skip) || 0
    };

    const routes = await RouteService.getUserRoutes(req.user.id, filters);
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route GET /api/route/:id
 * @description Get route by ID
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const route = await RouteService.getRouteById(req.params.id, req.user.id);
    res.json(route);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * @route PUT /api/route/:id
 * @description Update route
 */
router.put('/:id', authenticate, validateRouteCreate, async (req, res) => {
  try {
    const route = await RouteService.updateRoute(req.params.id, req.user.id, req.body);
    res.json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route DELETE /api/route/:id
 * @description Delete route
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await RouteService.deleteRoute(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
