import Room from "../backend/models/room";
import mongoose from "mongoose";
// require('dotenv').config({path: 'next.config.js'});
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookit-v2");

    // 전부 삭제
    await Room.deleteMany();
    console.log("Rooms are deleted");

    // 룸 데이터 추가
    await Room.insertMany(rooms);
    console.log("All Rooms are added");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();

//타입스크립트 파일이라 이렇게만 하면 오류 발생 package.json의 "scripts"에 다음의 하위 속성 추가
// "seeder": "tsc seeder/seeder.ts --outDir .temp && node .temp/seeder/seeder.js && rm -rf .temp"
// 이렇게 하면 ts파일을 js파일로 변환해주고, .temp 폴더에 저장하고, 그 다음 js파일을 실행하고, .temp폴더를 삭제한다.)
// 그리고 npm run seeder 실행
