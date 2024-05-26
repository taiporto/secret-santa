"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Container,
  VStack,
  Heading,
  IconButton,
  SimpleGrid,
  Button,
  useToast,
  Box,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Room } from "../../../types";
import { LoadingState } from "../LoadingState";
import { LOADING_PHRASES } from "./constants";
import { AddMoreButton } from "../AddMoreButton";

type MainFromProps = {
  handleSubmit: (data: FormData) => Promise<Room["id"] | undefined>;
};

export const MainForm = ({ handleSubmit }: MainFromProps) => {
  const toast = useToast();
  const router = useRouter();

  const roomNameRef = useRef<HTMLInputElement>(null);
  const playerOneRef = useRef<HTMLInputElement>(null);
  const playerTwoRef = useRef<HTMLInputElement>(null);
  const playerThreeRef = useRef<HTMLInputElement>(null);

  const refs = [playerOneRef, playerTwoRef, playerThreeRef];

  const [numberOfPlayers, setNumberOfPlayers] = useState(3);
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
    <Box my={14} px={[4, 0]}>
      <form
        onSubmit={() => setIsLoading(true)}
        action={(data: FormData) => {
          onSubmit(data);
        }}
      >
        <VStack gap={8} mb={8}>
          <FormControl id="room-name" isRequired>
            <FormLabel>Nome do evento</FormLabel>
            <Input
              ref={roomNameRef}
              name="roomName"
              placeholder="Qual o nome do seu amigo oculto?"
            />
          </FormControl>
          <FormControl id="room-price-limit">
            <FormLabel>Limite de valor</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.500"
                fontSize="1.2em"
              >
                <Flex>
                  <span>R$</span>
                </Flex>
              </InputLeftElement>
              <Input
                type="number"
                name="priceLimit"
                defaultValue={15}
                step={0.5}
              />
            </InputGroup>
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
                          isRequired={player <= 2}
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
                            if (player <= 2) {
                              toast({
                                title:
                                  "O jogo deve ter pelo menos três participantes",
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
                <AddMoreButton
                  setStateFunction={setNumberOfPlayers}
                  ariaLabel="Adicionar participantes"
                />
              </VStack>
            </fieldset>
          </Container>
        </VStack>
        <Button
          type="submit"
          w="100%"
          isLoading={isLoading}
          loadingText={<LoadingState phrases={LOADING_PHRASES} />}
        >
          Sortear!
        </Button>
      </form>
    </Box>
  );
};
