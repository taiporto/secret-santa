"use client";

import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Highlight,
  Link,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Room, User } from "../../../../../../../types";
import { formatCurrency } from "@/utils/formatCurrency";
import ReactCardFlip from "react-card-flip";

export const GifteeCard = ({ giftee, room }: { giftee: User; room: Room }) => {
  const [flip, setFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <Card h={300} w={300} mt={8}>
        <CardBody display="flex">
          <Button m="auto" onClick={() => setFlip(true)}>
            Clique para descobrir
          </Button>
        </CardBody>
      </Card>
      <Card px={8} pt={2} pb={6} mt={8}>
        <CardHeader>
          <Heading as="h3" size="md" lineHeight="tall" textAlign="center">
            <Highlight
              query={giftee.name}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "secondary.200",
              }}
            >
              {`Você sorteou ${giftee.name}`}
            </Highlight>
          </Heading>
        </CardHeader>
        <Box mt={5}>
          <Stack divider={<StackDivider />} spacing="4">
            <Text fontWeight="semibold" textAlign="center">
              Outros dados do seu evento
            </Text>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Nome do evento
              </Heading>
              <Text pt="2" fontSize="md">
                <Link
                  as={NextLink}
                  href={`${process.env.NEXT_PUBLIC_PROJECT_URL}/room/${room.id}`}
                  textDecoration="underline"
                  _hover={{ color: "accent.600" }}
                >
                  {room.name}
                </Link>
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Limite de valor do presente
              </Heading>
              <Text pt="2" fontSize="md">
                {room.price_limit
                  ? formatCurrency(room.price_limit)
                  : "Não definido"}
              </Text>
            </Box>
          </Stack>
          <Center mt={6}>
            <Button onClick={() => setFlip(false)}>Esconder</Button>
          </Center>
        </Box>
      </Card>
    </ReactCardFlip>
  );
};
