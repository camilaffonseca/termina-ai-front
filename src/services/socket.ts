import { io } from 'socket.io-client'

const NEXT_PUBLIC_SERVICE_URL = process.env.NEXT_PUBLIC_SERVICE_URL

if (!NEXT_PUBLIC_SERVICE_URL) {
  throw new Error('NEXT_PUBLIC_SERVICE_URL env var not set.')
}

export const socket = io(NEXT_PUBLIC_SERVICE_URL, {
  extraHeaders: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uSWQiOiJlOWMwNTYwMy0yMGM3LTRhNWItOGQ5NS1hYzI1MTAyOGQ1OTMiLCJ0b2tlbiI6ImVlcnZqb2llcm9wNTRvIiwibmlja25hbWUiOiJqdWxpZXJhIiwidGVybWluYXRpb25JZCI6MjF9.67XDdz01gItHlmP6u80N0OSzmfzOHsl7jESqUIwwgOY`,
  },
})
