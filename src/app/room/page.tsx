import { Box, Center, Flex, Grid } from '@chakra-ui/react'

import styles from './room.module.css'
import Image from 'next/image'
import Chair from '@/components/generic/Chair'

export default function Room() {
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
            <Flex w='100%' justify='space-between' position='absolute' bottom='90px'>
              <Box width='256px' height='256px' className={styles.character1}></Box>
            </Flex>
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
          <Chair id='F347' />
          <Chair id='F348' />
          <Chair id='F349' />
          <Chair id='F350' />
          <Chair id='F351' />
          <Chair id='F352' />
        </Grid>
        <Grid
          zIndex='1'
          mt='-40px'
          w='84%'
          h='70%'
          gap='10'
          gridTemplateColumns='1fr 1fr 1fr 1fr 1fr'
        >
          <Chair id='G402' />
          <Chair id='G403' />
          <Chair id='G404' />
          <Chair id='G405' />
          <Chair id='G406' />
        </Grid>
        <Grid
          zIndex='1'
          mt='-40px'
          w='76%'
          h='56%'
          gap='10'
          gridTemplateColumns='1fr 1fr 1fr 1fr'
        >
          <Chair id='H461' />
          <Chair id='H462' />
          <Chair id='H463' />
          <Chair id='H464' />
        </Grid>
      </Flex>
    </Flex>
  )
}
