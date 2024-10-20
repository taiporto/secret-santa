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
import { parseWishlistItems } from "../../utils/parseWishlistItems";
import { useWishlist } from "@/hooks/useWihslist";
import { useParams } from "next/navigation";

export const CreateWishlistItemModal = ({
  isOpen,
  onClose,
}: Pick<UseDisclosureReturn, "isOpen" | "onClose">) => {
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { playerId } = useParams();
  const { setNewWishlistItems } = useWishlist();

  const handleAddItems = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const newItems = parseWishlistItems(formData, +playerId);

    setNewWishlistItems(newItems, () => {
      setIsLoading(false);
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={{ base: "90%", md: "40%" }}>
        <ModalHeader>Adicionar itens à lista de presentes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="createWishlistItems" onSubmit={handleAddItems}>
            <VStack gap={6}>
              <SimpleGrid spacing={6}>
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
          <Button
            type="submit"
            form="createWishlistItems"
            isLoading={isLoading}
          >
            Adicionar {numberOfItems > 1 ? "itens" : "item"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
