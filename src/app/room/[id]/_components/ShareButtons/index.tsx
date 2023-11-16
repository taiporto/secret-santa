"use client";

import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Room, User } from "../../../../../../types";
import { generatePlayerLink as generatePlayerLinkPath } from "@/utils/generatePlayerLink";
import { useRoomContext } from "@/app/room/_context/room";

const createMessage = (
  playersData: User[],
  roomId: Room["id"],
  forWhatsapp?: boolean
) => {
  let message =
    "**🔀 Sorteio do Amigo Oculto 🤫**\n\nClique no link abaixo do seu nome para saber quem você tirou:\n\n";

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

  console.log(message);

  return message;
};

export const ShareButtons = ({ players }: { players: User[] }) => {
  const {
    room: { id: roomId },
  } = useRoomContext();
  const handleCopyData = () => {
    const message = createMessage(players, roomId);
    navigator.clipboard.writeText(message);
  };

  const handleSendToWhatsapp = () => {
    const message = createMessage(players, roomId, true);
    const url = `https://web.whatsapp.com/send?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <ButtonGroup>
      <Button variant="outline" onClick={handleCopyData}>
        Copiar
      </Button>
      <Button
        colorScheme="whatsapp"
        leftIcon={<FaWhatsapp />}
        onClick={handleSendToWhatsapp}
      >
        Enviar para o WhatsApp
      </Button>
    </ButtonGroup>
  );
};
