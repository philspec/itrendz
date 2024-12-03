import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
  console.log('🔄 Counter API called');
  const { env } = getRequestContext();
  
  let count = await env.KV.get('visitor_count') || '0';
  console.log('📊 Current count:', count);
  
  count = (parseInt(count) + 1).toString();
  await env.KV.put('visitor_count', count);
  console.log('✅ New count saved:', count);
  
  return Response.json({
    visitorCount: count,
    timestamp: new Date().toISOString()
  });
} 