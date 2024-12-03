import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request) {
  // Access Cloudflare context if needed
  const { env, cf, ctx } = getRequestContext();
  
  return Response.json({
    message: "Hello from Cloudflare Pages!",
    timestamp: new Date().toISOString()
  });
} 