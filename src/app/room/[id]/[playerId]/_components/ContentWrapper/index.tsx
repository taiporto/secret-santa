"use client";

import { useWindowWidth } from "@/hooks/useWindowWidth";
import { breakpoints } from "../../../../../../../constants";
import {
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  HStack,
  Box,
} from "@chakra-ui/react";

export const ContentWrapper = ({
  gifterData,
  gifteeData,
}: {
  gifterData: React.ReactNode;
  gifteeData: React.ReactNode;
}) => {
  const { windowWidth } = useWindowWidth();

  if (!windowWidth || windowWidth < breakpoints.md) {
    return (
      <Tabs variant="soft-rounded" colorScheme="secondary" isFitted w="100%">
        <TabPanels mt={4}>
          <TabPanel w="100%" pb={12}>{gifteeData}</TabPanel>
          <TabPanel w="100%" pb={12}>{gifterData}</TabPanel>
        </TabPanels>
        <Box w="100%" position="fixed" bottom={6} left={0} px={8}>
          <TabList
            borderTop="Menu"
            backdropFilter="auto"
            backdropBlur="8px"
            borderRadius="100px"
            boxShadow="base"
            border="ButtonShadow"
          >
            <Tab>Sorteio</Tab>
            <Tab>Área do jogador</Tab>
          </TabList>
        </Box>
      </Tabs>
    );
  }

  return (
    <HStack
      my={16}
      gap={6}
      divider={<StackDivider />}
      justify="flex-start"
      align="flex-start"
    >
      {gifteeData}
      {gifterData}
    </HStack>
  );
};
