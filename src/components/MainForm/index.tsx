"use client";

import React, { useRef, useState } from "react";
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
import { Room } from "../../../types";
import { LoadingState } from "../LoadingState";
import { LOADING_PHRASES } from "./constants";

type MainFromProps = {
  handleSubmit: (data: FormData) => Promise<Room["id"] | undefined>;
};

export const MainForm = ({ handleSubmit }: MainFromProps) => {
  const toast = useToast();
  const router = useRouter();

  const lastInputRef = useRef<HTMLInputElement>(null);

  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const roomId = await handleSubmit(data);
      setIsLoading(false);
      if (!roomId) {
        console.error("Room not found - Something went wrong");
        throw new Error("Room not found - Something went wrong");
      }
      router.push(`/room/${roomId}`);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      toast({
        title: "Erro ao criar evento",
        description: err?.toString(),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
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
                        ref={lastInputRef}
                        name={`player${player}`}
                        placeholder={`Nome do participante ${player + 1}`}
                      />
                    </FormControl>
                    <IconButton
                      onClick={() => {
                        setNumberOfPlayers(
                          (prevNumberOfPlayers) => --prevNumberOfPlayers
                        );
                        lastInputRef.current?.focus();
                      }}
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

                  lastInputRef.current?.focus();
                }}
              />
            </VStack>
          </fieldset>
        </Container>
      </VStack>
      <Button type="submit" onClick={() => setIsLoading(true)}>
        {isLoading ? <LoadingState phrases={LOADING_PHRASES} /> : "Sortear!"}
      </Button>
    </form>
  );
};
