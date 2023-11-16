import { useRoomContext } from "@/app/room/_context/room";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Highlight,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Room, User } from "../../../../../../../types";
import { formatCurrency } from "@/utils/formatCurrency";

export const GifteeCard = ({ giftee, room }: { giftee: User; room: Room }) => {
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          <Highlight
            query={giftee.name}
            styles={{ px: "2", py: "1", rounded: "full", bg: "accent.100" }}
          >
            {`Você sorteou ${giftee.name}`}
          </Highlight>
        </Heading>
      </CardHeader>
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Nome do evento
          </Heading>
          <Text pt="2" fontSize="sm">
            {room.name}
          </Text>
        </Box>
        {room.price_limit && (
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Limite de valor do presente
            </Heading>
            <Text pt="2" fontSize="sm">
              {formatCurrency(room.price_limit)}
            </Text>
          </Box>
        )}
      </Stack>
    </Card>
  );
};
