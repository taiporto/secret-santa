import {
  Box,
  Heading,
  Link,
  SkeletonText,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { Suspense } from "react";
import NextLink from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import { Room } from "../../../../../../../types";

export const RoomData = ({ room }: { room: Room }) => {
  return (
    <Box>
      <Suspense fallback={<SkeletonText noOfLines={11} spacing="4" />}>
        <Heading as="h3" size="md" mb={4}>
          Detalhes do evento
        </Heading>
      </Suspense>
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Heading as="h4" size="xs" textTransform="uppercase">
            Nome
          </Heading>
          <Suspense fallback={<SkeletonText />}>
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
          </Suspense>
        </Box>
        <Box>
          <Heading as="h4" size="xs" textTransform="uppercase">
            Limite de valor do presente
          </Heading>
          <Suspense fallback={<SkeletonText />}>
            <Text pt="2" fontSize="md">
              {room.price_limit
                ? formatCurrency(room.price_limit)
                : "Não definido"}
            </Text>
          </Suspense>
        </Box>
      </Stack>
    </Box>
  );
};
