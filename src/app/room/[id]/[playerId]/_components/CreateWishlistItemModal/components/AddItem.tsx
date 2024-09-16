import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

export const AddItem = ({
  number,
  setNumberOfItems,
}: {
  number: number;
  setNumberOfItems: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Box key={number}>
      <FormLabel>Item {number + 1}</FormLabel>
      <Flex align="center" justify={"space-between"} wrap={"wrap"} gap={2}>
        <HStack>
          <FormControl id={`item-${number}-name`}>
            <Input name={`item${number}-name`} placeholder={`Nome`} />
          </FormControl>
          <FormControl id={`item-${number}-price`} maxW={"25%"}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.500"
                fontSize="1.2em"
              >
                <Flex>
                  <span>R$</span>
                </Flex>
              </InputLeftElement>
              <Input
                type="number"
                name="priceLimit"
                defaultValue={0}
                step={0.5}
              />
            </InputGroup>
          </FormControl>
        </HStack>
        <FormControl id={`item-${number}`}>
          <Input name={`item${number}-link`} placeholder={`Link`} />
        </FormControl>
      </Flex>
      {number != 0 && (
        <IconButton
          onClick={() => {
            setNumberOfItems((prevNumberOfItems) => --prevNumberOfItems);
          }}
          aria-label="Remover participante"
          icon={<SmallCloseIcon />}
        />
      )}
    </Box>
  );
};
