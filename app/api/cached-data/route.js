import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
  console.log('🔄 Cached Data API called');
  const { env } = getRequestContext();
  const cacheKey = 'cached_data';
  
  // Try to get from cache
  let data = await env.KV.get(cacheKey);
  console.log('🔍 Cache status:', data ? 'HIT' : 'MISS');
  
  if (!data) {
    console.log('📡 Fetching fresh data');
    // If not in cache, fetch new data
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    data = await response.text();
    
    // Store in cache for 5 minutes
    await env.KV.put(cacheKey, data, { expirationTtl: 300 });
    console.log('💾 Data stored in cache');
  }
  
  return Response.json({
    data: JSON.parse(data),
    fromCache: !!data,
    timestamp: new Date().toISOString()
  });
} 