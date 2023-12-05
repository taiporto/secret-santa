import { getAllRooms } from "@/lib/api/rooms/getAllRooms";

export async function GET() {
  const data = await getAllRooms();

  return Response.json({ data });
}
