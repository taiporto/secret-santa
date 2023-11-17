import { updateRoom } from "@/lib/api/rooms/updateRoom";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { newData } = await request.json();
  const data = await updateRoom({ roomId: +params.id, newData });

  return Response.json({ data });
}
