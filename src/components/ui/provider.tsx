'use client'

import { ChakraProvider as ChakraProviderBase, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <ChakraProviderBase value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProviderBase>
  )
}
