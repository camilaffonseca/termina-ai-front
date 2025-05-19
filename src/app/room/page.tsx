'use client'

import { Box, Center, Container, Flex, Grid, Spinner, Text } from '@chakra-ui/react'

import styles from './room.module.css'
import Image from 'next/image'
import Chair from '@/components/generic/Chair'
import { MainSocketServiceContextContext } from '@/contexts/MainSocketServiceContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Room() {
  const isLogged = MainSocketServiceContextContext.useSelector(state => state.isLogged)
  const currentRoom = MainSocketServiceContextContext.useSelector(
    state => state.currentRoom
  )

  const router = useRouter()

  const getUserByChair = (chairPosition: number) => {
    const user = currentRoom?.roomUsers.find(u => u.chairPosition === chairPosition)

    return user || null
  }

  useEffect(() => {
    if (!isLogged) {
      router.replace('/')
    }
  }, [isLogged, router])

  if (!isLogged) {
    return (
      <Container w='100vw' h='100vh' className={styles.bg} maxWidth='unset'>
        <Center flexDirection='column'>
          <Spinner size='lg' />

          <Text fontSize='1.2rem' textAlign='center' mt='2.4rem'>
            Estamos preparando tudo para você...
          </Text>
        </Center>
      </Container>
    )
  }

  return (
    <Flex w='100%' h='100vh' justify='center' direction='column' backgroundColor='black'>
      <Center h='60%' backgroundImage='url(/wall.png)' position='relative'>
        <Box w='60%' h='85%' backgroundColor='green'>
          <Box w='100%' h='100%' position='relative'>
            <Image fill src='/new_screen.png' alt='scene-wraper' />
          </Box>
        </Box>
      </Center>
      <Flex
        h='40%'
        w='100%'
        alignItems='center'
        direction='column'
        backgroundImage='url(/floor.png)'
        position='relative'
      >
        <Box backgroundColor='#764d24' w='100%' h='10px' />
        <Box w='70%' h='44%' mt='-14'>
          <Box position='relative' w='100%' h='100%'>
            <Image fill src='/1.png' alt='stage' />
          </Box>
        </Box>
        <Grid
          zIndex='1'
          mt='-40px'
          w='90%'
          h='70%'
          gap='10'
          gridTemplateColumns='1fr 1fr 1fr 1fr 1fr 1fr'
        >
          <Chair id='F347' user={getUserByChair(0)} />
          <Chair id='F348' user={getUserByChair(1)} />
          <Chair id='F349' user={getUserByChair(2)} />
          <Chair id='F350' user={getUserByChair(3)} />
          <Chair id='F351' user={getUserByChair(4)} />
          <Chair id='F352' user={getUserByChair(5)} />
        </Grid>
        <Grid
          zIndex='1'
          mt='-40px'
          w='84%'
          h='70%'
          gap='10'
          gridTemplateColumns='1fr 1fr 1fr 1fr 1fr'
        >
          <Chair id='G402' user={getUserByChair(6)} />
          <Chair id='G403' user={getUserByChair(7)} />
          <Chair id='G404' user={getUserByChair(8)} />
          <Chair id='G405' user={getUserByChair(9)} />
          <Chair id='G406' user={getUserByChair(10)} />
        </Grid>
        <Grid
          zIndex='1'
          mt='-40px'
          w='76%'
          h='56%'
          gap='10'
          gridTemplateColumns='1fr 1fr 1fr 1fr'
        >
          <Chair id='H461' user={getUserByChair(11)} />
          <Chair id='H462' user={getUserByChair(12)} />
          <Chair id='H463' user={getUserByChair(13)} />
          <Chair id='H464' user={getUserByChair(14)} />
        </Grid>
      </Flex>
    </Flex>
  )
}
