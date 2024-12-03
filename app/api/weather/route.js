import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request) {
  console.log('🔄 Weather API called');
  const { env } = getRequestContext();
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'London';
  console.log('🌍 Requesting weather for:', city);
  
  const API_KEY = env.WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  const data = await response.json();
  console.log('✅ Weather data received:', data);
  
  return Response.json({
    city,
    temperature: data.main?.temp,
    description: data.weather?.[0]?.description,
    timestamp: new Date().toISOString()
  });
} 