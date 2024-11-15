"use client";

import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Room, User } from "../../../../../../types";
import { sendToWhatsapp } from "../../_utils/sendToWhatsapp";
import { copyToClipboard } from "../../_utils/copyToClipboard";
import { createShareableMessage } from "../../_utils/createShareableMessage";

type ShareButtonsProps = { players: User[]; roomId: Room["id"] };

export const ShareButtons = ({ players, roomId }: ShareButtonsProps) => {
  const message = createShareableMessage(players, roomId);

  const handleSendToWhatsapp = () => {
    sendToWhatsapp(message);
  };

  return (
    <Flex gap={4} flexDir={{ base: "column", md: "row" }}>
      <Button variant="outline" onClick={() => copyToClipboard(message)}>
        Copiar participantes e links
      </Button>
      <Button
        colorScheme="green"
        leftIcon={<FaWhatsapp />}
        onClick={handleSendToWhatsapp}
      >
        Enviar para o WhatsApp
      </Button>
    </Flex>
  );
};
