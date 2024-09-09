import dbConnect from "@/backend/config/dbConnect";
import { updateRoom, newRoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.put(updateRoom);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  console.log("PUT request---------------------><", request);
  return router.run(request, ctx);
}
