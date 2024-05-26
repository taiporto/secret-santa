import { SmallCloseIcon } from "@chakra-ui/icons";
import { FormControl, IconButton, Input } from "@chakra-ui/react";
import React from "react";

export const CreateWishlistItem = ({ itemKey }: { itemKey: number }) => {
  return (
    <div>
      <FormControl id={`${itemKey}-item-name`}>
        <Input
          name={`${itemKey}-item-name`}
          placeholder="Digite o nome do item"
        />
      </FormControl>
      <FormControl id={`${itemKey}-item-link`}>
        <Input
          name={`${itemKey}-item-link`}
          placeholder="Digite o link do item"
        />
      </FormControl>
      <FormControl id={`${itemKey}-item-price`}>
        <Input
          name={`${itemKey}-item-price`}
          placeholder="Digite o valor do item"
        />
      </FormControl>
      <IconButton
        onClick={() => {
          console.log("Remove item");
        }}
        aria-label="Remover item"
        icon={<SmallCloseIcon />}
      />
    </div>
  );
};
