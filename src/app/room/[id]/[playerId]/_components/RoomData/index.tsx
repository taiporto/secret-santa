import {
  Box,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import { Room } from "../../../../../../../types";

export const RoomData = ({ room }: { room: Room }) => {
  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>
        Detalhes do evento
      </Heading>
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Heading as="h4" size="xs" textTransform="uppercase">
            Nome
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
          <Heading as="h4" size="xs" textTransform="uppercase">
            Limite de valor do presente
          </Heading>
          <Text pt="2" fontSize="md">
            {room.price_limit
              ? formatCurrency(room.price_limit)
              : "Não definido"}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
