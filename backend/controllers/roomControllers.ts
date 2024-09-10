import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room"; // 룸 모델
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middleWares/catchAsyncErrors";

export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 8;

  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  });
});

// 개별 룸 생성 Create New Room => /api/admin/rooms/
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  // 룸 생성을 위해 전달되는 정보
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// 개별 룸 조회 Get Room Details => /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    // throw new Error("Hello");
    // throw new ErrorHandler("Hello", 400);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// export const getRoomDetails = async (
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   try {
//     const room = await Room.findById(params.id);

//     // throw new Error("Hello");
//     throw new ErrorHandler("Hello", 400);

//     if (!room) {
//       console.log("there is no room");
//       return NextResponse.json(
//         {
//           // success: false,
//           message: "Room not found",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       room,
//     });
//   } catch (error: any) {
//     console.log(error.statusCode);
//     return NextResponse.json(
//       {
//         message: error.message,
//       },
//       { status: error.statusCode }
//     );
//   }
// };

// 개별 룸 수정 Update Room Details => /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// 개별 룸 삭제 Delete Room => /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    // TODO - Delete images associated with the room

    await room.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
