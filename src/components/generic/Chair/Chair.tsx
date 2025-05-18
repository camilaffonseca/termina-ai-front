import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

export default function Chair({ id }: { id: string }) {
  return (
    <Flex w='100%' h='100%' alignItems='center'>
      <Box position='relative' w='100%' h='100%'>
        <Image fill src='/2.png' alt='chair' />
        <Flex w='100%' justifyContent='center' position='absolute' top='18px' p='2px'>
          <Text
            fontFamily='monospace'
            fontWeight='600'
            backgroundColor='#684716'
            color='#301e03'
            p='2px 6px'
            boxShadow='4px 4px 0px 0px rgba(51,33,8,0.88)'
            alignContent='center'
          >
            {id}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}
