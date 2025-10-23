import { check } from 'express-validator';

export const validateRegistration = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('company')
    .notEmpty()
    .withMessage('Company name is required')
];

export const validateLogin = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
];
