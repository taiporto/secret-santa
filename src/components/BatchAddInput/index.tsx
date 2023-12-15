import { FormControl, Textarea } from "@chakra-ui/react";
import React from "react";

export const BatchAddInput = () => {
  return (
    <FormControl id="batch-players" minW="395px">
      <Textarea
        name="batch-players"
        minH="300px"
        placeholder={`Inclua os nomes dos participantes separados por uma vírgula (sem espaços)`}
      />
    </FormControl>
  );
};
