import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Heading,
  VStack,
  Box,
} from "@chakra-ui/react";
import { GifteeCard } from "../GifteeCard";
import {
  User,
  WishlistItem as TWishlistItem,
  Wishlist,
} from "../../../../../../../types";
import { WishlistItem } from "../MyWishlist/components/WishlistItem";

export const GifteeData = ({
  giftee,
  gifteesWishlist,
}: {
  giftee: User;
  gifteesWishlist: Wishlist;
}) => {
  return (
    <VStack gap={4} align={{ base: "center", md: "left" }}>
      <Heading as="h3" size="md">
        Veja quem você sorteou abaixo:
      </Heading>
      <GifteeCard giftee={giftee} />
      {!!gifteesWishlist?.length && (
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              Lista de presentes do sorteado
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {gifteesWishlist.map((item: TWishlistItem) => {
                return (
                  <Box key={item.id}>
                    <Box my="4">
                      <WishlistItem
                        wishlistItemData={item}
                        allowDelete={false}
                      />
                    </Box>
                    <Divider />
                  </Box>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </VStack>
  );
};
