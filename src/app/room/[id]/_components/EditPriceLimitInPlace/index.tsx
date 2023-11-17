"use client";

import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import React, { useState } from "react";
import { Room } from "../../../../../../types";
import { clientUpdateRoom } from "@/api/room/clientUpdateRoom";
import { formatCurrency } from "@/utils/formatCurrency";

const NO_DEFINED_VALUE = "Sem valor definido, clique aqui para definir";
const CURRENCY_REGEX = /[R$]?((\d{1,2}),\d{2})/;

const cleanValue = (value: string) => {
  if (!CURRENCY_REGEX.test(value)) return;

  const extractedValue = CURRENCY_REGEX.exec(value);

  if (!extractedValue) return;

  return +extractedValue[1].replace(",", ".");
};

export const EditPriceLimitInPlace = ({ room }: { room: Room }) => {
  const [value, setValue] = useState(
    room.price_limit ? formatCurrency(+room.price_limit) : NO_DEFINED_VALUE
  );

  return (
    <Editable
      borderRadius={6}
      color={room.price_limit === 0 ? "gray.400" : "text.800"}
      defaultValue={value}
    >
      <EditablePreview w="100%" />
      <EditableInput
        onBlur={async (event) => {
          if (event.target.value === "") return;
          const newValue = cleanValue(event.target.value);
          if (!newValue) return;
          console.log(newValue);
          const updated = await clientUpdateRoom(room.id, {
            price_limit: newValue,
          });
          if (updated) {
            console.log("updated");
            setValue(formatCurrency(+newValue));
          }
        }}
      />
    </Editable>
  );
};