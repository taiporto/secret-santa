"use client";
import React, { createContext, useContext, useState } from "react";
import { Room } from "../../../../types";

type RoomContextType = {
  room: Room;
  setRoom: (roomId: Room) => void;
};

const RoomContext = createContext<RoomContextType>({
  room: {} as Room,
  setRoom: () => {},
});

export const useRoomContext = () => useContext(RoomContext);

type RoomContextProviderProps = {
  value: Room;
  children: React.ReactNode;
};

export const RoomContextProvider = ({
  value,
  children,
}: RoomContextProviderProps) => {
  const [room, setRoom] = useState<Room>(value);

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
