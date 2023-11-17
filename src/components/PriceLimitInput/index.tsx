import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { As } from "@chakra-ui/react";
import React from "react";

type PriceLImitInputProps = { as: As; hideLeftElement?: boolean } & InputProps;

export const PriceLimitInput = ({
  as,
  hideLeftElement = false,
  ...rest
}: PriceLImitInputProps) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" color="gray.500" fontSize="1.2em">
        {!hideLeftElement && (
          <Flex>
            <span>R$</span>
          </Flex>
        )}
      </InputLeftElement>
      <Input
        //@ts-ignore
        as={as}
        type="number"
        name="priceLimit"
        defaultValue={15}
        step={0.5}
        {...rest}
      />
    </InputGroup>
  );
};
