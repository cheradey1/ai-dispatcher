import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Optimize route using OpenAI
 */
export async function optimizeRoute(params) {
  const {
    loads,
    constraints,
    startTime,
    endTime,
    maxDriveHours = 11, // DOT regulations
    requiredRestHours = 10 // DOT regulations
  } = params;

  const prompt = `
    As an AI logistics dispatcher, optimize a 5-day truck route with the following parameters:
    
    Available Loads: ${JSON.stringify(loads, null, 2)}
    
    Constraints:
    - Start Time: ${startTime}
    - End Time: ${endTime}
    - Maximum driving hours per day: ${maxDriveHours}
    - Required rest hours: ${requiredRestHours}
    - Minimum rate per mile: $${constraints.minRate}
    - Maximum deadhead miles: ${constraints.maxDeadhead}
    
    Requirements:
    1. Maximize revenue while minimizing deadhead miles
    2. Comply with DOT hours of service regulations
    3. Account for loading/unloading times
    4. Include rest stops and fuel stops
    5. Consider traffic patterns and road conditions
    
    Provide the optimized route as a JSON object with:
    1. Daily schedule
    2. Expected revenue
    3. Total miles (loaded and deadhead)
    4. Rest stop locations
    5. Estimated fuel costs
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are an expert AI logistics dispatcher that optimizes truck routes."
      }, {
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
      max_tokens: 2000
    });

    const routePlan = JSON.parse(response.choices[0].message.content);
    return routePlan;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to optimize route');
  }
}
