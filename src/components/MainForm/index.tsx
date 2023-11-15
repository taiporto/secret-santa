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
  Box,
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

  const roomNameRef = useRef<HTMLInputElement>(null);
  const playerOneRef = useRef<HTMLInputElement>(null);
  const playerTwoRef = useRef<HTMLInputElement>(null);

  const refs = [playerOneRef, playerTwoRef];

  const [numberOfPlayers, setNumberOfPlayers] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const roomId = await handleSubmit(data);
      if (!roomId) {
        console.error("Room not created - Something went wrong");
        throw new Error("Room not created - Something went wrong");
      }
      router.push(`/room/${roomId}`);
      setIsLoading(false);
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
    <Box my={14}>
      <form action={onSubmit}>
        <VStack gap={8} mb={8}>
          <FormControl id="room-name" isRequired>
            <FormLabel>Nome do evento</FormLabel>
            <Input
              ref={roomNameRef}
              name="roomName"
              placeholder="Qual o nome do seu amigo oculto?"
            />
          </FormControl>
          <Container>
            <fieldset>
              <VStack spacing={6}>
                <Heading as="h2" size="lg">
                  Participantes
                </Heading>
                <SimpleGrid spacing="4">
                  {Array.from(Array(numberOfPlayers).keys()).map(
                    (player: number) => (
                      <Flex key={player} align="end" gap={4}>
                        <FormControl
                          id={`player-${player}`}
                          isRequired={player <= 1}
                        >
                          <FormLabel>Participante {player + 1}</FormLabel>
                          <Input
                            ref={refs[player] || null}
                            name={`player${player}`}
                            placeholder={`Nome do participante ${player + 1}`}
                          />
                        </FormControl>
                        <IconButton
                          onClick={() => {
                            if (player <= 1) {
                              toast({
                                title:
                                  "O jogo deve ter pelo menos dois participantes",
                                status: "warning",
                              });
                              return;
                            }
                            setNumberOfPlayers(
                              (prevNumberOfPlayers) => --prevNumberOfPlayers
                            );
                          }}
                          aria-label="Remover participante"
                          icon={<SmallCloseIcon />}
                        />
                      </Flex>
                    )
                  )}
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
        <Button
          type="submit"
          w="100%"
          onClick={() => {
            if (
              roomNameRef.current?.value === "" ||
              playerOneRef.current?.value === "" ||
              playerTwoRef.current?.value === ""
            ) {
              toast({
                title: "Por favor preencha os campos obrigatórios",
                status: "error",
              });
              return;
            }
            setIsLoading(true);
          }}
        >
          {isLoading ? <LoadingState phrases={LOADING_PHRASES} /> : "Sortear!"}
        </Button>
      </form>
    </Box>
  );
};
