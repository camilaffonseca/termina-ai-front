/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'

export const ErrorCodes = {
  ROOM_TOKEN_NOT_VALID: {
    errorCode: 'ROOM_TOKEN_NOT_VALID',
    message: 'Token da sala inválido ou não encontrado.',
  },
  AUTH_TOKEN_NOT_VALID: {
    errorCode: 'AUTH_TOKEN_NOT_VALID',
    message: 'Token de autenticação inválido.',
  },
  ROOM_NOT_FOUND: {
    errorCode: 'ROOM_NOT_FOUND',
    message: 'A sala solicitada não existe.',
  },
  USER_NOT_FOUND: {
    errorCode: 'USER_NOT_FOUND',
    message: 'O usuário relacionado não existe.',
  },
} as const

const ErrorCodesEntries = Object.entries(ErrorCodes)

export const getToastRemoteMessageFromAxiosErr = (baseerr: unknown) => {
  const err = baseerr as AxiosError<{ errorCode?: string }>

  const result = ErrorCodesEntries.find(
    ([k]) => k === err.response?.data?.errorCode || (err as any)?.errorCode
  )

  if (!result) {
    return null
  }

  return result[1].message
}
