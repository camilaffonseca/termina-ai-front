import axios from 'axios'

import { NEXT_PUBLIC_SERVICE_URL } from '@/constants/environment'

export const httpClient = axios.create({
  baseURL: NEXT_PUBLIC_SERVICE_URL,
})
