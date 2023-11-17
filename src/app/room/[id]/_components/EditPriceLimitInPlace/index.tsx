"use client";

import {
  Editable,
  EditableInput,
  EditablePreview,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Room } from "../../../../../../types";
import { clientUpdateRoom } from "@/api/room/clientUpdateRoom";
import { formatCurrency } from "@/utils/formatCurrency";

const NO_DEFINED_VALUE = "Sem valor definido, clique para definir";

export const EditPriceLimitInPlace = ({ room }: { room: Room }) => {
  const [value, setValue] = useState(
    room.price_limit ? formatCurrency(+room.price_limit) : NO_DEFINED_VALUE
  );
  const [valueWasUpdated, setValueWasUpdated] = useState(false);

  return (
    <Editable
      border="1px solid"
      borderColor="accent.500"
      borderRadius={6}
      p={2}
      color={!valueWasUpdated ? "gray.400" : "text.800"}
      defaultValue={value}
    >
      <EditablePreview />
      <Input
        type="number"
        as={EditableInput}
        onBlur={async (event) => {
          const newValue = event.target.value;
          const updated = await clientUpdateRoom(room.id, {
            price_limit: +newValue,
          });
          if (updated) {
            console.log("updated");
            setValue(newValue);
            setValueWasUpdated(true);
          }
        }}
      />
    </Editable>
  );
};
