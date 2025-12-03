import { useWindowWidth } from "@/hooks/useWindowWidth";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { breakpoints } from "../../../../../../../../constants";
import { useState } from "react";

export const Wrapper = ({
  wishlistHasLength,
  children,
}: {
  wishlistHasLength: boolean;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const { windowWidth } = useWindowWidth();
  return (windowWidth || 0) < breakpoints.md && wishlistHasLength ? (
    <Accordion w="100%" defaultIndex={isOpen ? 0 : undefined} allowToggle onChange={handleToggle}>
      <AccordionItem>
        <AccordionButton justifyContent="center">
          {isOpen ? "Fechar lista" : "Ver lista"} <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <>{children}</>
  );
};
