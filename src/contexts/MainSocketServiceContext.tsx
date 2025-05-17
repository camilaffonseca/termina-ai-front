'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'

import { createContext } from '@nexpy/react-easy-context-api'
import { socket } from '@/services/socket'

type MainSocketServiceContextContext = {
  isConnected: boolean
  socket: typeof socket
}

const MainSocketServiceContextContext = createContext<MainSocketServiceContextContext>({
  isConnected: false,
  socket,
})

type MainSocketServiceContextProviderProps = {
  children: ReactNode
}

const MainSocketServiceContextProvider = ({
  children,
}: MainSocketServiceContextProviderProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      socket.emit('teste', {
        oi: 'olá',
      })

      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('teste2', d => {
      console.log('deu certo!', d)
    })

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const value = useMemo(
    () => ({
      isConnected,
      socket,
    }),
    [isConnected]
  )

  return (
    <MainSocketServiceContextContext.Provider value={value}>
      {children}
    </MainSocketServiceContextContext.Provider>
  )
}

export { MainSocketServiceContextContext, MainSocketServiceContextProvider }
