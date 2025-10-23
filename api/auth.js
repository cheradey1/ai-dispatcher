import express from 'express';
import { AuthService } from '../services/auth-service.js';
import { validateRegistration, validateLogin } from '../middleware/auth-validation.js';
import { authenticate } from '../middleware/auth.js';
import { validationResult } from 'express-validator';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await AuthService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route POST /api/auth/login
 * @description Login user
 */
router.post('/login', validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

/**
 * @route PUT /api/auth/api-keys
 * @description Update user's API keys
 */
router.put('/api-keys', authenticate, async (req, res) => {
  try {
    const result = await AuthService.updateApiKeys(req.user.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
