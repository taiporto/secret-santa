"use client";

import { Flex, IconButton, Link } from "@chakra-ui/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import NextLink from "next/link";
import { sendToWhatsapp } from "../../../_utils/sendToWhatsapp";
import { FaWhatsapp } from "react-icons/fa";
import { copyToClipboard } from "../../../_utils/copyToClipboard";
import { createShareableMessage } from "../../../_utils/createShareableMessage";
import { useParams } from "next/navigation";
import { Room, User } from "../../../../../../../types";
import { generatePlayerLink } from "@/utils/generatePlayerLink";

type PlayerLinkProps = {
  player: User;
  roomId: Room["id"];
};

export const PlayerLink = ({ player, roomId }: PlayerLinkProps) => {
  const { roomId: paramRoomId } = useParams();
  const [clipboardIcon, setClipboardIcon] = useState(<CopyIcon />);

  const playerLink = generatePlayerLink(player.id, roomId);

  const handleCopyLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonSibling = event.currentTarget
      .previousSibling as HTMLAnchorElement;
    if (!buttonSibling) return;
    copyToClipboard(buttonSibling.href);
    setClipboardIcon(<CheckIcon />);
    setTimeout(() => {
      setClipboardIcon(<CopyIcon />);
    }, 300);
  };

  return (
    <Flex justify="space-between" gap={[4, 6]} align="center">
      <Link
        as={NextLink}
        href={playerLink}
        fontSize={["sm", "sm"]}
        textDecoration="underline"
      >
        {process.env.NEXT_PUBLIC_PROJECT_URL}
        {playerLink}
      </Link>
      <Flex gap={[3]}>
        <IconButton
          size="sm"
          onClick={handleCopyLink}
          icon={clipboardIcon}
          aria-label="Copiar link"
          variant="outline"
        />
        <IconButton
          size="sm"
          onClick={() => sendToWhatsapp(createShareableMessage(player, roomId))}
          icon={<FaWhatsapp />}
          aria-label="Copiar link"
          colorScheme="green"
        />
      </Flex>
    </Flex>
  );
};
