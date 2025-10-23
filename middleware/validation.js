import { check, validationResult } from 'express-validator';

export const validateRouteOptimization = [
  check('loads')
    .isArray()
    .withMessage('Loads must be an array')
    .notEmpty()
    .withMessage('At least one load is required'),
    
  check('constraints')
    .isObject()
    .withMessage('Constraints must be an object'),
    
  check('startTime')
    .isISO8601()
    .withMessage('Start time must be a valid ISO 8601 date'),
    
  check('endTime')
    .isISO8601()
    .withMessage('End time must be a valid ISO 8601 date'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateLoadSearch = [
  check('origin')
    .notEmpty()
    .withMessage('Origin city is required'),
    
  check('destination')
    .notEmpty()
    .withMessage('Destination city is required'),
    
  check('searchRadius')
    .isNumeric()
    .withMessage('Search radius must be a number')
    .isInt({ min: 0, max: 500 })
    .withMessage('Search radius must be between 0 and 500 miles'),
    
  check('maxDeadhead')
    .isNumeric()
    .withMessage('Max deadhead must be a number')
    .isInt({ min: 0 })
    .withMessage('Max deadhead must be a positive number'),
    
  check('minPrice')
    .isNumeric()
    .withMessage('Minimum price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
    
  check('minRate')
    .isNumeric()
    .withMessage('Minimum rate must be a number')
    .isFloat({ min: 0 })
    .withMessage('Minimum rate must be a positive number'),
    
  check('trailerType')
    .isIn(['dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy'])
    .withMessage('Invalid trailer type'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
