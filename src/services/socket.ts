import { io } from 'socket.io-client'

import { NEXT_PUBLIC_SERVICE_URL } from '@/constants/environment'

export const socket = io(NEXT_PUBLIC_SERVICE_URL)
