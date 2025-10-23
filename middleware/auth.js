import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    // Отримуємо токен з заголовка
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }

    // Верифікація токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    // Додаємо користувача до request
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export const checkApiKeys = async (req, res, next) => {
  try {
    if (!req.user.apiKeys?.dat || !req.user.apiKeys?.openai) {
      return res.status(400).json({ 
        error: 'API keys not configured',
        requiredKeys: ['DAT API Key', 'OpenAI API Key']
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
