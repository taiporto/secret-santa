import { Center } from "@chakra-ui/react";
import { MainForm } from "@/components/MainForm";
import { handleCreateRoom } from "./room/[id]/_utils/handleCreateRoom";

export default async function Home() {
  const handleSubmit = async (data: FormData) => {
    "use server";
    return handleCreateRoom(data);
  };
  return (
    <Center>
      <MainForm handleSubmit={handleSubmit} />
    </Center>
  );
}
