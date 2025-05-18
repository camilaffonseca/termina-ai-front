'use client'

import {
  Container,
  Input,
  Field,
  Center,
  Text,
  Button,
  Flex,
  Card,
  Spinner,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'

import style from './join.module.css'
import { httpClient } from '@/services/http'
import { toaster } from '@/components/ui/toaster'
import { getToastRemoteMessageFromAxiosErr } from '@/utils/toast-utils'
import { useRouter, useParams } from 'next/navigation'
import { MainSocketServiceContextContext } from '@/contexts/MainSocketServiceContext'
import { useEffect, useState } from 'react'

type FormType = {
  nickname: string
}

export default function Join() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState } = useForm<FormType>()

  const router = useRouter()

  const dispatchSession = MainSocketServiceContextContext.useSelector(
    state => state.dispatchSession
  )

  const { roomToken } = useParams()

  const onSubmit = async (formValues: FormType) => {
    if (!formValues.nickname?.trim?.()) {
      toaster.error({
        title: 'O meu, faltou coisa',
        description: 'Coloque o seu nickname!',
      })

      return
    }

    try {
      setIsLoading(true)

      const { data } = await httpClient.post<{ token: string }>(
        '/sessions/create-session',
        { ...formValues, token: roomToken }
      )

      if (!data.token) {
        throw new Error()
      }

      dispatchSession(data.token)

      router.replace('/room')
    } catch (err) {
      toaster.error({
        title: 'Oops',
        description:
          getToastRemoteMessageFromAxiosErr(err) ||
          'Ocorreu um erro desconhecido. Preencha o nickname e tente novamente!',
      })

      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!roomToken) {
      router.replace('/')
    }
  }, [roomToken, router])

  if (isLoading || !roomToken) {
    return (
      <Container w='100vw' h='100vh' className={style.bg} maxWidth='unset'>
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
    <Container w='100vw' h='100vh' className={style.bg} maxWidth='unset'>
      <Center>
        <Text
          fontSize='2.4rem'
          textAlign='center'
          textShadow='4px 4px rgba(255, 242, 0, 0.5)'
        >
          Escolha seu nome público
        </Text>
      </Center>

      <Center
        minWidth={['unset', 'unset', '28rem']}
        w='100%'
        maxWidth='32rem'
        mt='1.2rem'
      >
        <Card.Root w='100%' backgroundColor='rgba(255, 255, 255, 0.08)'>
          <Card.Body>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <Flex flexDirection='column' gap='1.2rem'>
                <Field.Root>
                  <Field.Label fontSize='1.1rem'>
                    Como quer ser chamado na sala?
                  </Field.Label>
                  <Input
                    fontSize='1rem'
                    type='text'
                    {...register('nickname')}
                    disabled={formState.isSubmitting}
                  />
                  <Field.HelperText />
                  <Field.ErrorText />
                </Field.Root>
              </Flex>

              <Flex w='100%' justifyContent='flex-end' mt='2.4rem'>
                <Button
                  type='submit'
                  disabled={formState.isSubmitting}
                  loading={formState.isSubmitting}
                >
                  Enviar
                </Button>
              </Flex>
            </form>
          </Card.Body>
        </Card.Root>
      </Center>
    </Container>
  )
}
