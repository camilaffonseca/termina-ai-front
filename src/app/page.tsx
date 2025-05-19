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
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'

import style from './home.module.css'
import { httpClient } from '@/services/http'
import { toaster } from '@/components/ui/toaster'
import { getToastRemoteMessageFromAxiosErr } from '@/utils/toast-utils'
import { useRouter } from 'next/navigation'

type FormType = {
  nameTerminator: string
  phoneTerminator: string
  nameTerminated: string
  phoneTerminated: string
}

// TODO! add validação do form e tratativa de erro no catch, toast?
// TODO! gravar o cookie e levar p sala, disparar o join, loader?

export default function Home() {
  const { register, handleSubmit, formState } = useForm<FormType>()

  const router = useRouter()

  const onSubmit = async (formValues: FormType) => {
    try {
      await httpClient.post('/register/start-termination', formValues)

      router.replace('/join/teste')
    } catch (err) {
      toaster.error({
        title: 'Oops',
        description:
          getToastRemoteMessageFromAxiosErr(err) ||
          'Ocorreu um erro desconhecido. Verifique se você preencheu os dados corretamente e tente novamente!',
      })
    }
  }

  return (
    <Container w='100vw' h='100vh' className={style.bg} maxWidth='unset'>
      <Center>
        <Text
          fontSize='2.4rem'
          textAlign='center'
          textShadow='4px 4px rgba(255, 242, 0, 0.5)'
        >
          Olá, ex-terminador!
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
                  <Field.Label fontSize='1.1rem'>Seu nome</Field.Label>
                  <Input
                    fontSize='1rem'
                    type='text'
                    {...register('nameTerminator')}
                    disabled={formState.isSubmitting}
                  />
                  <Field.HelperText />
                  <Field.ErrorText />
                </Field.Root>
                <Field.Root>
                  <Field.Label fontSize='1.1rem'>Seu WhatsApp</Field.Label>
                  <Input
                    fontSize='1rem'
                    type='tel'
                    {...register('phoneTerminator')}
                    disabled={formState.isSubmitting}
                  />
                  <Field.HelperText />
                  <Field.ErrorText />
                </Field.Root>
                <Field.Root>
                  <Field.Label fontSize='1.1rem'>Noma da vítima</Field.Label>
                  <Input
                    fontSize='1rem'
                    type='text'
                    {...register('nameTerminated')}
                    disabled={formState.isSubmitting}
                  />
                  <Field.HelperText />
                  <Field.ErrorText />
                </Field.Root>
                <Field.Root>
                  <Field.Label fontSize='1.1rem'>Telefone da vítima</Field.Label>
                  <Input
                    fontSize='1rem'
                    type='tel'
                    {...register('phoneTerminated')}
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
