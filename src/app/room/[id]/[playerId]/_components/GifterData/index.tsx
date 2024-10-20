import {
  Box,
  Heading,
  SkeletonText,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { Room, User, Wishlist } from "../../../../../../../types";
import { RoomData } from "../RoomData";
import { MyWishlist } from "../MyWishlist";
import { Suspense } from "react";

export const GifterData = ({
  room,
  playersWishlist,
}: {
  room: Room;
  playersWishlist: Wishlist;
}) => {
  return (
    <VStack
      marginX={{ base: "auto", md: 0 }}
      divider={<StackDivider />}
      gap={4}
      minW={{ base: undefined, md: "60%" }}
      maxW={{ base: undefined, md: "60%" }}
      align={{ base: "center", md: "flex-start" }}
      pb={{ base: 12, md: 0 }}
    >
      <Box>
        <Suspense fallback={<SkeletonText noOfLines={1} spacing="4" />}>
          <Heading
            as="h3"
            size="md"
            mb={6}
            textAlign={{ base: "center", md: "left" }}
          >
            Detalhes do evento
          </Heading>
        </Suspense>
        <RoomData room={room} />
      </Box>
      <Box>
        <Suspense fallback={<SkeletonText noOfLines={1} spacing="4" />}>
          <Heading
            as="h3"
            size="md"
            mb={6}
            textAlign={{ base: "center", md: "left" }}
          >
            Minha lista de presentes
          </Heading>
        </Suspense>
        <MyWishlist initialWishlist={playersWishlist} />
      </Box>
    </VStack>
  );
};
