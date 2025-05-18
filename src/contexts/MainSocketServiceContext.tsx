/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import { createContext } from '@nexpy/react-easy-context-api'
import { socket } from '@/services/socket'
import { User } from '@/types/users'
import { decodeJWTPayload } from '@/utils/jwt'
import { Room } from '@/types/rooms'
import { useRouter } from 'next/navigation'
import { getToastRemoteMessageFromAxiosErr } from '@/utils/toast-utils'
import { toaster } from '@/components/ui/toaster'

type MainSocketServiceContextContext = {
  isLogged: boolean
  isConnected: boolean
  socket: typeof socket
  dispatchSession: (token: string) => void
  currentUser: User | null
  currentRoom: Room | null
}

const MainSocketServiceContextContext = createContext<MainSocketServiceContextContext>({
  isLogged: false,
  isConnected: false,
  socket,
  dispatchSession: () => {},
  currentUser: null,
  currentRoom: null,
})

type MainSocketServiceContextProviderProps = {
  children: ReactNode
}

const MainSocketServiceContextProvider = ({
  children,
}: MainSocketServiceContextProviderProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [isLogged, setIsLogged] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)

  const resolveTokenAndPayload = useCallback(() => {
    const fromLocal = localStorage.getItem('token')

    if (!fromLocal) {
      return {
        token: null,
        payload: null,
      }
    }

    const payload = decodeJWTPayload(fromLocal)

    const currentUser = currentRoom?.roomUsers.find(
      u => u.sessionId === payload.sessionId
    )

    if (currentUser) {
      setCurrentUser(currentUser)
    }

    return {
      token: fromLocal,
      payload,
    }
  }, [currentRoom?.roomUsers])

  const dispatchSession = useCallback((token: string) => {
    localStorage.setItem('token', token)

    setIsLogged(true)

    socket.emit('join', {
      token,
    })
  }, [])

  const router = useRouter()

  useEffect(() => {
    const { token } = resolveTokenAndPayload()

    if (token) {
      setIsLogged(true)
    }
  }, [resolveTokenAndPayload])

  useEffect(() => {
    if (!isConnected || !isLogged) {
      return () => {}
    }

    const interval = setInterval(() => {
      const { token } = resolveTokenAndPayload()

      if (token) {
        socket.emit('iamhere', {
          token,
        })
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isConnected, isLogged, resolveTokenAndPayload])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onSync(room: Room) {
      setCurrentRoom(room)
    }
    function onKnownError(err: unknown) {
      if ((err as any).errorCode === 'USER_NOT_FOUND') {
        setIsLogged(false)
        setCurrentUser(null)
        setCurrentRoom(null)

        router.replace('/')

        return
      }

      toaster.error({
        title: 'Oops',
        description:
          getToastRemoteMessageFromAxiosErr(err) ||
          'Ocorreu um erro desconhecido. Preencha o nickname e tente novamente!',
      })
    }
    function onKicked() {
      localStorage.removeItem('token')

      setIsLogged(false)
      setCurrentUser(null)
      setCurrentRoom(null)

      router.replace('/')
    }

    socket.on('sync', onSync)
    socket.on('known-error', onKnownError)
    socket.on('kicked', onKicked)

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('sync', onSync)
      socket.off('known-error', onKnownError)
      socket.off('kicked', onKicked)

      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [router])

  const value = useMemo(
    () => ({
      isLogged,
      isConnected,
      socket,
      dispatchSession,
      currentUser,
      currentRoom,
    }),
    [currentRoom, currentUser, dispatchSession, isConnected, isLogged]
  )

  return (
    <MainSocketServiceContextContext.Provider value={value}>
      {children}
    </MainSocketServiceContextContext.Provider>
  )
}

export { MainSocketServiceContextContext, MainSocketServiceContextProvider }
