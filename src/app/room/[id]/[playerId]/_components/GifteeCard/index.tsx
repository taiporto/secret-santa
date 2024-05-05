"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Highlight,
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

            {giftee.wishlist && giftee.wishlist.length === 0 && (
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    Lista de presentes
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {giftee.wishlist.map((item, index) => {
                      return <Box key={index}>{(item as any).title}</Box>;
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
          </VStack>
        </CardBody>
      </Card>
    </ReactCardFlip>
  );
};
