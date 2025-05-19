import { User } from '@/types/users'
import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

import styles from './chair.module.css'

export default function Chair({ id, user }: { id: string; user?: User | null }) {
  return (
    <Flex w='100%' h='100%' alignItems='center'>
      <Box position='relative' w='100%' h='100%'>
        {user ? (
          <>
            <Flex
              w='100%'
              justifyContent='center'
              position='absolute'
              zIndex='1'
              bottom='310px'
            >
              <Text
                textAlign='center'
                fontSize='1.2rem'
                color='red'
                backgroundColor='black'
                p='0.1rem 1rem'
                borderRadius='18px'
              >
                {user.nickname}
              </Text>
            </Flex>

            <Flex w='100%' justify='space-between' position='absolute' bottom='50px'>
              <Box width='256px' height='256px' className={styles.character1}></Box>
            </Flex>
          </>
        ) : null}

        <Image fill src='/2.png' alt='chair' />
        <Flex w='100%' justifyContent='center' position='absolute' top='18px' p='2px'>
          <Text
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
