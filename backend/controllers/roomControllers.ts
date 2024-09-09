import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room"; // 룸 모델

export const allRooms = async (req: NextRequest) => {
  const resPerPage: number = 8;

  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  });
};

// 개별 룸 생성
export const newRoom = async (req: NextRequest) => {
  // 룸 생성을 위해 전달되는 정보
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
};
