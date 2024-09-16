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
  SimpleGrid,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Box,
  HStack,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { WishlistItem } from "../../../../../../../types";
import { AddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { AddItem } from "./components/AddItem";

export const CreateWishlistItemModal = ({
  isOpen,
  onClose,
}: Pick<UseDisclosureReturn, "isOpen" | "onClose">) => {
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [items, setItems] = useState<WishlistItem[]>([]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar itens à lista de presentes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={4}>
            <SimpleGrid spacing="4">
              {Array.from(Array(numberOfItems).keys()).map((number: number) => (
                <AddItem
                  key={number}
                  number={number}
                  setNumberOfItems={setNumberOfItems}
                />
              ))}
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
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button>Adicionar {items.length > 1 ? "itens" : "item"}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
