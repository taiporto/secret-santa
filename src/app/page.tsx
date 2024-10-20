import {
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { MainForm } from "@/components/MainForm";
import { handleCreateRoom } from "./room/[id]/_utils/handleCreateRoom";

export default async function Home() {
  const handleSubmit = async (data: FormData) => {
    "use server";
    return handleCreateRoom(data);
  };
  return (
    <Center>
      <Tabs>
        <TabList>
          <Tab>Adicionar participantes</Tab>
          <Tab>Copia e cola</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MainForm handleSubmit={handleSubmit} />
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
}
