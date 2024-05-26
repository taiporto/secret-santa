import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

export const AddMoreButton = ({
  setStateFunction,
  ariaLabel = "Adicionar",
}: {
  setStateFunction: Dispatch<SetStateAction<number>>;
  ariaLabel?: string;
}) => {
  return (
    <IconButton
      w="full"
      aria-label={ariaLabel}
      icon={<AddIcon />}
      onClick={() => {
        setStateFunction((prevNumber) => ++prevNumber);
      }}
    />
  );
};
