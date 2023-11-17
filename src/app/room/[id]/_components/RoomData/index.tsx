import { Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const index = () => {
  return (
    <VStack align="center">
    <Text>Evento:</Text>
    <Heading as="h2" size="lg" textAlign="center">
      {room.name}
    </Heading>
  </VStack>
  <VStack align="center">
    <Text>Limite de valor:</Text>
    <EditPriceLimitInPlace room={room} />
  </VStack>
  )
}
