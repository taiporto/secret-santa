"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Highlight,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { User } from "../../../../../../../types";
import ReactCardFlip from "react-card-flip";

export const GifteeCard = ({ giftee }: { giftee: User }) => {
  const [flip, setFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <Card h={200} minW={300} align="center">
        <CardBody display="flex">
          <Button m="auto" onClick={() => setFlip(true)}>
            Clique para revelar
          </Button>
        </CardBody>
      </Card>
      <Card px={8} pt={2} minW={300} minH={200} align="center" justify="center">
        <CardHeader>
          <Button
            variant="link"
            color="secondary"
            onClick={() => setFlip(false)}
          >
            Esconder
          </Button>
        </CardHeader>
        <CardBody>
          <VStack gap={8}>
            <Skeleton isLoaded={!!giftee.name}>
              <Heading as="h3" size="md" lineHeight="tall" textAlign="center">
                <Highlight
                  query={giftee.name}
                  styles={{
                    px: "2",
                    py: "1",
                    rounded: "full",
                    bg: "secondary.200",
                  }}
                >
                  {giftee.name}
                </Highlight>
              </Heading>
            </Skeleton>
          </VStack>
        </CardBody>
      </Card>
    </ReactCardFlip>
  );
};
