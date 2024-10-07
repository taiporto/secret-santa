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
  Toast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ItemForm } from "./components/ItemForm";
import { handleSubmitWishlist } from "../../utils/handleSubmitWishlist";
import { useParams } from "next/navigation";
import { useCurrentPlayer } from "@/hooks/useCurrentPlayer";

export const CreateWishlistItemModal = ({
  isOpen,
  onClose,
}: Pick<UseDisclosureReturn, "isOpen" | "onClose">) => {
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { currentPlayer, setCurrentPlayer } = useCurrentPlayer();

  const handleAddItems = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const result = await handleSubmitWishlist(formData, currentPlayer.id);

    if (result?.length) {
      setIsLoading(false);
      setCurrentPlayer((prev) => ({
        ...prev,
        wishlist: [
          ...prev.wishlist,
          ...result,
        ],
      }));
      Toast({
        title: "Itens adicionados à lista de presentes",
        status: "success",
        duration: 2000,
      });
      onClose();
    }
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
