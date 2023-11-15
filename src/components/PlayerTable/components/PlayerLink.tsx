"use client";

import { Flex, IconButton } from "@chakra-ui/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Link from "next/link";

type PlayerLinkProps = {
  playerLink: string;
};

export const PlayerLink = ({ playerLink }: PlayerLinkProps) => {
  const [clipboardIcon, setClipboardIcon] = useState(<CopyIcon />);

  const handleCopyLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonSibling = event.currentTarget
      .previousSibling as HTMLAnchorElement;
    if (!buttonSibling) return;
    navigator.clipboard.writeText(buttonSibling.href);
    setClipboardIcon(<CheckIcon />);
    setTimeout(() => {
      setClipboardIcon(<CopyIcon />);
    }, 250);
  };

  return (
    <Flex gap={6} align="center">
      <Link href={playerLink} target="_blank">
        {process.env.NEXT_PUBLIC_PROJECT_URL}
        {playerLink}
      </Link>
      <IconButton
        onClick={handleCopyLink}
        icon={clipboardIcon}
        aria-label="Copiar link"
      />
    </Flex>
  );
};
