import { useWindowWidth } from "@/hooks/useWindowWidth";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
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
    <Accordion defaultIndex={0} allowToggle>
      <AccordionItem>
        <AccordionButton>
          Ver a lista <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ) : (
    <>{children}</>
  );
};
