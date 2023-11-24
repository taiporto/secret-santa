"use client";

import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Room, User } from "../../../../../../types";
import { generatePlayerLink as generatePlayerLinkPath } from "@/utils/generatePlayerLink";

const createMessage = (
  playersData: User[],
  roomId: Room["id"],
  forWhatsapp?: boolean
) => {
  let message =
    "**Sorteio do Amigo Oculto**\n\nClique no link abaixo do seu nome para saber quem você tirou:\n\n";

  for (const player of playersData) {
    const playerLink =
      process.env.NEXT_PUBLIC_PROJECT_URL +
      generatePlayerLinkPath(player.id, roomId);

    message += `**${player.name}**:\n${playerLink}\n\n`;
  }

  message += `Acesse a página do seu amigo oculto para mais informações: ${process.env.NEXT_PUBLIC_PROJECT_URL}/room/${roomId}\n\n`;
  message += "Gerado por https://amigooculto.vercel.app/";

  if (forWhatsapp) {
    message = message.replaceAll("\n", "%0A");
    message = message.replaceAll(" ", "%20");
    message = message.replaceAll("**", "%2A");
  }

  return message;
};

type ShareButtonsProps = { players: User[]; roomId: Room["id"] };

export const ShareButtons = ({ players, roomId }: ShareButtonsProps) => {
  const handleCopyData = () => {
    const message = createMessage(players, roomId);
    navigator.clipboard.writeText(message);
  };

  const handleSendToWhatsapp = () => {
    const message = createMessage(players, roomId, true);
    const url = `https://wa.me/?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <Flex gap={4} flexDir={{ base: "column", md: "row" }}>
      <Button variant="outline" onClick={handleCopyData}>
        Copiar participantes e links
      </Button>
      <Button
        colorScheme="whatsapp"
        leftIcon={<FaWhatsapp />}
        onClick={handleSendToWhatsapp}
      >
        Enviar para o WhatsApp
      </Button>
    </Flex>
  );
};
