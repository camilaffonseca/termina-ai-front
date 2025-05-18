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
      socket.emit('join', {
        oi: 'olá',
      })

      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('sync', d => {
      console.log('mensagem recebida no front', d)
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
