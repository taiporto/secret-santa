"use client";

import { Flex, IconButton, Link } from "@chakra-ui/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import NextLink from "next/link";

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
      <IconButton
        size="sm"
        onClick={handleCopyLink}
        icon={clipboardIcon}
        aria-label="Copiar link"
      />
    </Flex>
  );
};
