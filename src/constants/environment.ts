export const NEXT_PUBLIC_SERVICE_URL = process.env.NEXT_PUBLIC_SERVICE_URL

if (!NEXT_PUBLIC_SERVICE_URL) {
  throw new Error('NEXT_PUBLIC_SERVICE_URL env var not set.')
}
