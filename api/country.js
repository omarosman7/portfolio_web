// Vercel Edge Function: returns the visitor's country code from Vercel's own header (no third party, no key).
export const config = { runtime: 'edge' };
export default function handler(req) {
  return new Response(JSON.stringify({ country: req.headers.get('x-vercel-ip-country') || null }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'private, no-store' }
  });
}
