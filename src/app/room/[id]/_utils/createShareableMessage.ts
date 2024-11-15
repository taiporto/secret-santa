import { generatePlayerLink as generatePlayerLinkPath } from '@/utils/generatePlayerLink';
import { Room, User } from "../../../../../types";

const MESSAGE_HEADER = "**Sorteio do Amigo Oculto**\n\nClique no link abaixo do seu nome para saber quem você tirou:\n\n";
const MESSAGE_FOOTER = (roomId:number) => `Acesse a página do seu amigo oculto para mais informações: ${process.env.NEXT_PUBLIC_PROJECT_URL}/room/${roomId}\n\nGerado por https://amigooculto.vercel.app/`;

export const createShareableMessage = (playersData: User[] | User, roomId: Room["id"]) => {
  let message = '';

  !Array.isArray(playersData) && (playersData = [playersData]);

  for (const player of playersData) {
    const playerLink =
      process.env.NEXT_PUBLIC_PROJECT_URL +
      generatePlayerLinkPath(player.id, roomId);

    message += `**${player.name}**:\n${playerLink}\n\n`;
  };

  return MESSAGE_HEADER + message + MESSAGE_FOOTER(roomId);
};