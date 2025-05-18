'use client'

import { Container, Center, Text } from '@chakra-ui/react'

import style from './chatbot-requested.module.css'

export default function ChatbotRequested() {
  return (
    <Container w='100vw' h='100vh' className={style.bg} maxWidth='unset'>
      <Center flexDirection='column'>
        <Text
          fontSize='2.4rem'
          textAlign='center'
          textShadow='4px 4px rgba(255, 242, 0, 0.5)'
          maxWidth='62rem'
        >
          Tudo pronto! Você receberá uma mensagem pelo WhatsApp em instantes para
          continuar e escolher a sua frase mortal.
        </Text>
        <Text fontSize='1.2rem' textAlign='center' mt='2.4rem'>
          Você pode fechar essa tela.
        </Text>
      </Center>
    </Container>
  )
}
