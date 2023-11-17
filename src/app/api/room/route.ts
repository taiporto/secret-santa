import { getAllRooms } from "@/lib/api/rooms/getAllRooms";
import { getRoomById } from "@/lib/api/rooms/getRoom";
import { updateRoom } from "@/lib/api/rooms/updateRoom";
import { NextRequest } from "next/server";

export async function GET() {
  const data = await getAllRooms();

  return Response.json({ data });
}
