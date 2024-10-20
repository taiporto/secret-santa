import React from "react";
import {
  As,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Flex,
} from "@chakra-ui/react";

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
