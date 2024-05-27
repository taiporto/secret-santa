import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  UseDisclosureProps,
  UseDisclosureReturn,
  useToast,
} from "@chakra-ui/react";
import { CreateWishlistItem } from "../CreateWishlistItem";
import { AddMoreButton } from "@/components/AddMoreButton";
import { User } from "../../../../../../../types";
import { handleSubmitWishlist } from "../../utils/handleSubmitWishlist";

export const CreateWishlistModal = ({
  isOpen,
  onClose,
  userId,
}: Pick<UseDisclosureReturn, "isOpen" | "onClose"> & {
  userId: User["id"];
}) => {
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data: FormData) => {
    console.log("Submit");
    setIsLoading(true);
    try {
      const result = await handleSubmitWishlist(data, userId);
      if (result) {
        setIsLoading(false);
        toast({
          title: "Items adicionados com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar items na lista de presentes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            id="wishlist"
            onSubmit={() => setIsLoading(true)}
            action={(data: FormData) => {
              onSubmit(data);
            }}
          >
            {Array.from(Array(numberOfItems).keys()).map((number) => (
              <CreateWishlistItem key={number} itemKey={number} />
            ))}
            <AddMoreButton
              setStateFunction={setNumberOfItems}
              ariaLabel="Adicionar itens"
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            type="submit"
            form="wishlist"
            isLoading={isLoading}
          >
            Adicionar item(s)
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
