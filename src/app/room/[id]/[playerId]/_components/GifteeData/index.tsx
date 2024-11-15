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
  Button,
} from "@chakra-ui/react";
import { GifteeCard } from "../GifteeCard";
import {
  User,
  WishlistItem as TWishlistItem,
  Wishlist,
} from "../../../../../../../types";
import { WishlistItem } from "../MyWishlist/components/WishlistItem";
import { FaAmazon } from "react-icons/fa";

export const GifteeData = ({
  giftee,
  gifteesWishlist,
}: {
  giftee: User;
  gifteesWishlist: Wishlist;
}) => {
  return (
    <VStack gap={4} align={{ base: "center", md: "left" }}>
      <Heading as="h3" size="md" textAlign={"center"}>
        Veja quem você sorteou abaixo:
      </Heading>
      <GifteeCard giftee={giftee} />
      <Box mt={2}>
        {!!gifteesWishlist?.length && (
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                Lista de presentes do sorteado <AccordionIcon />
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
        <Button
          mt={5}
          variant="outline"
          leftIcon={<FaAmazon />}
          as="a"
          href="https://www.amazon.com.br?&linkCode=ll2&tag=amigooculto-20&linkId=6ea28ef9c399b868ce8e1ec36b84b367&language=pt_BR&ref_=as_li_ss_tl"
          target="_blank"
        >
          Comprar presente na Amazon
        </Button>
      </Box>
    </VStack>
  );
};
