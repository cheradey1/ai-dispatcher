# AI Logistics Dispatcher

An intelligent AI-powered logistics dispatcher that helps create optimized 5-day routes for trucking companies using real-world load data.

## Features

- 🤖 AI-powered route optimization using OpenAI GPT-4
- 🚛 Real-time load search through DAT API integration
- 📍 Multi-point route planning with rest stops
- 💰 Revenue optimization and cost calculation
- ⏱️ DOT hours of service compliance
- 🗺️ Interactive route visualization
- 📊 Detailed trip analytics and reporting

## Tech Stack

- Node.js & Express.js
- MongoDB for data storage
- JWT authentication
- OpenAI API integration
- DAT API integration
- Vercel deployment

## Environment Variables

```env
# Database
MONGODB_URI=your_mongodb_uri

# API Keys
DAT_API_KEY=your_dat_api_key
OPENAI_API_KEY=your_openai_api_key

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h

# Server
PORT=3000
NODE_ENV=production
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with required environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- PUT `/api/auth/api-keys` - Update API keys

### Routes
- POST `/api/route/optimize` - Create optimized route
- GET `/api/route` - Get user's routes
- GET `/api/route/:id` - Get route by ID
- PUT `/api/route/:id` - Update route
- DELETE `/api/route/:id` - Delete route

### Loads
- POST `/api/loads/search` - Search available loads

## License

MIT
