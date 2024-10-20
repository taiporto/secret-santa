"use client";

import {
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Room } from "../../../../../../types";
import { clientUpdateRoom } from "@/api/room/clientUpdateRoom";
import { formatCurrency } from "@/utils/formatCurrency";

const NO_DEFINED_VALUE = "Sem valor definido, clique aqui para definir";
const CURRENCY_REGEX = /(R\$)?((\d+)(,\d{2})?)/;

const cleanValue = (value: string) => {
  if (!CURRENCY_REGEX.test(value)) return;

  const extractedValue = CURRENCY_REGEX.exec(value);

  if (!extractedValue) return;

  return +extractedValue[2].replace(",", ".");
};

export const EditPriceLimitInPlace = ({ room }: { room: Room }) => {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLSpanElement>(null);

  const handleChangeValue = async (nextValue: string) => {
    if (nextValue === "0") {
      previewRef!.current!.innerText = NO_DEFINED_VALUE;
      await clientUpdateRoom(room.id, {
        price_limit: null,
      });
      return;
    }
    const newValue = cleanValue(nextValue);
    if (!newValue) {
      toast({
        title: "Valor inválido",
        status: "error",
      });
      return;
    }
    const updated = await clientUpdateRoom(room.id, {
      price_limit: newValue,
    });
    if (updated) {
      inputRef!.current!.value = formatCurrency(+newValue);
      previewRef!.current!.innerText = formatCurrency(+newValue);
    }
  };

  return (
    <Editable
      submitOnBlur={true}
      borderRadius={6}
      fontSize={"lg"}
      fontWeight={"bold"}
      color={room.price_limit === 0 ? "gray.400" : "text.800"}
      textAlign={{ base: "center", md: "left" }}
      defaultValue={
        room.price_limit ? formatCurrency(+room.price_limit) : NO_DEFINED_VALUE
      }
      onSubmit={handleChangeValue}
    >
      <EditablePreview w="100%" ref={previewRef} />
      <EditableInput ref={inputRef} />
    </Editable>
  );
};
