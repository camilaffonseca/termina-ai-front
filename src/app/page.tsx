'use client'

import { Container, Input, Field, Center, Text } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'

import style from './home.module.css'

type FormType = {
  email: string
  whatsAppNumber: string
}

export default function Home() {
  const { register, handleSubmit } = useForm<FormType>()

  const onSubmit = () => {
    // pending
  }

  return (
    <Container w='100vw' h='100vh' className={style.bg}>
      <Center>
        <Text fontFamily='monospace'>Olá ex-terminador</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input type='email' {...register('email')} />
            <Field.HelperText />
            <Field.ErrorText />
          </Field.Root>
          <Field.Root>
            <Field.Label>WhatsApp</Field.Label>
            <Input type='tel' {...register('whatsAppNumber')} />
            <Field.HelperText />
            <Field.ErrorText />
          </Field.Root>
        </form>
      </Center>
    </Container>
  )
}
