import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const AuthService = {
  async register(userData) {
    const { email, password, company } = userData;

    // Перевірка чи користувач вже існує
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Хешування паролю
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Створення нового користувача
    const user = new User({
      email,
      password: hashedPassword,
      company
    });

    await user.save();

    // Генерація JWT токену
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        company: user.company
      }
    };
  },

  async login(email, password) {
    // Пошук користувача
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Перевірка паролю
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Оновлення часу останнього входу
    user.lastLogin = new Date();
    await user.save();

    // Генерація JWT токену
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        company: user.company
      }
    };
  },

  async updateApiKeys(userId, keys) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.apiKeys = { ...user.apiKeys, ...keys };
    await user.save();

    return {
      apiKeys: user.apiKeys
    };
  }
};
