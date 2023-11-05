"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormLabel,
  Flex,
  Spacer,
  Input,
  Container,
  VStack,
  Heading,
  IconButton,
  SimpleGrid,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Room } from "../../../../types";

type MainFromProps = {
  handleSubmit: (data: FormData) => Promise<Room["id"] | undefined>;
};

export const MainForm = ({ handleSubmit }: MainFromProps) => {
  const toast = useToast();
  const router = useRouter();
  const [numberOfPlayers, setNumberOfPlayers] = useState(2);

  const onSubmit = async (data: FormData) => {
    const roomId = await handleSubmit(data);
    if (!roomId) {
      console.error("Room not found - Something went wrong");

      toast({
        title: "Erro ao criar evento",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    router.push(`/room/${roomId}`);
  };

  return (
    <form action={onSubmit}>
      <VStack spacing={4}>
        <FormControl id="room-name" isRequired>
          <FormLabel>Nome do evento</FormLabel>
          <Input
            name="roomName"
            placeholder="Qual o nome do seu amigo oculto?"
          />
        </FormControl>
        <Spacer />
        <Container>
          <fieldset>
            <VStack spacing={6}>
              <Heading as="h2">Participantes</Heading>
              <SimpleGrid spacing="4">
                {Array.from(Array(numberOfPlayers).keys()).map((player) => (
                  <Flex key={player}>
                    <FormControl
                      id={`player-${player}`}
                      isRequired={player <= 1}
                    >
                      <FormLabel>Participante {player + 1}</FormLabel>
                      <Input
                        name={`player${player}`}
                        placeholder={`Nome do participante ${player + 1}`}
                      />
                    </FormControl>
                    <IconButton
                      onClick={() =>
                        setNumberOfPlayers(
                          (prevNumberOfPlayers) => --prevNumberOfPlayers
                        )
                      }
                      aria-label="Remover participante"
                      icon={<SmallCloseIcon />}
                    />
                  </Flex>
                ))}
              </SimpleGrid>
              <IconButton
                w="full"
                aria-label="Adicionar participante"
                icon={<AddIcon />}
                onClick={() => {
                  setNumberOfPlayers(
                    (prevNumberOfPlayers) => ++prevNumberOfPlayers
                  );
                }}
              />
            </VStack>
          </fieldset>
        </Container>
      </VStack>
      <Button type="submit">Sortear!</Button>
    </form>
  );
};
