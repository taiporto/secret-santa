import { useWindowWidth } from "@/hooks/useWindowWidth";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { breakpoints } from "../../../../../../../../constants";

export const Wrapper = ({
  wishlistHasLength,
  children,
}: {
  wishlistHasLength: boolean;
  children: React.ReactNode;
}) => {
  const { windowWidth } = useWindowWidth();
  return (windowWidth || 0) < breakpoints.md && wishlistHasLength ? (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>Minha lista de presentes</AccordionButton>
        <AccordionPanel>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <>{children}</>
  );
};
