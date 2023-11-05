import React, { createContext, useContext, useState } from "react";
import { Room } from "../../../../types";

type RoomContextType = {
  roomId: Room["id"];
  setRoomId: (roomId: Room["id"]) => void;
};

const RoomContext = createContext<RoomContextType>({
  roomId: 0,
  setRoomId: () => {},
});

export const useRoomContext = () => useContext(RoomContext);

type RoomContextProviderProps = {
  value: Room["id"];
  children: React.ReactNode;
};

export const RoomContextProvider = ({
  value,
  children,
}: RoomContextProviderProps) => {
  const [roomId, setRoomId] = useState<number>(value);

  return (
    <RoomContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </RoomContext.Provider>
  );
};
