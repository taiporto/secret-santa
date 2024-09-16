import React, { FormEvent, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  UseDisclosureReturn,
  SimpleGrid,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ItemForm } from "./components/ItemForm";
import { parseWishlistItems } from "./utils/parseWishlistItems";
import { createOrUpdateWishlist } from "@/lib/api/users/wishlist/createOrUpdateWishlist";
import { User, Wishlist } from "../../../../../../../types";

export const CreateWishlistItemModal = ({
  isOpen,
  onClose,
}: // updateWishlist,
Pick<UseDisclosureReturn, "isOpen" | "onClose"> & {
  updateWishlist?: (wishlist: Wishlist) => void;
}) => {
  const [numberOfItems, setNumberOfItems] = useState(1);

  const handleAddItems = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const wishlistItems = parseWishlistItems(formData);
    console.log(wishlistItems);
    // updateWishlist(wishlistItems);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar itens à lista de presentes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="createWishlistItems" onSubmit={handleAddItems}>
            <VStack gap={4}>
              <SimpleGrid spacing="4">
                {Array.from(Array(numberOfItems).keys()).map(
                  (number: number) => (
                    <ItemForm
                      key={number}
                      number={number}
                      setNumberOfItems={setNumberOfItems}
                    />
                  )
                )}
              </SimpleGrid>
              <IconButton
                w="full"
                aria-label="Adicionar item"
                icon={<AddIcon />}
                onClick={() => {
                  setNumberOfItems((prevNumberOfItems) => ++prevNumberOfItems);
                }}
              />
            </VStack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="createWishlistItems">
            Adicionar {numberOfItems > 1 ? "itens" : "item"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
