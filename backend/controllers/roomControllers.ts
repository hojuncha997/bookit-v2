import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room"; // 룸 모델
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middleWares/catchAsyncErrors";
import APIFilters from "../utils/apiFilters";
import room from "../models/room";

export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 40;

  // Next.js에서는 URL을 사용하여 요청을 객체로 만들고 searchParams를 사용하여 쿼리 문자열을 가져올 수 있다.
  const { searchParams } = new URL(req.url);

  throw new ErrorHandler("hello", 400);

  const queryStr: any = {};
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });
  // console.log(queryStr); // { location: 'buffalo', guestCapacity: '3' }

  const roomsCount: number = await Room.countDocuments(); // 전체 룸 수

  const apiFilters = new APIFilters(Room, queryStr).search().filter(); // Room 모델과 쿼리 문자열을 전달하여 APIFilters 클래스의 인스턴스를 만든 후 search 메서드를 호출

  let rooms: IRoom[] = await apiFilters.query;
  const filteredRoomsCount: number = rooms.length; // 필터링하여 검색된 총 룸 수

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone(); // clone 메서드를 사용하여 쿼리를 복제하고 다시 할당

  return NextResponse.json({
    success: true,
    roomsCount,
    filteredRoomsCount,
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
