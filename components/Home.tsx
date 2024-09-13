"use client";

import React, { useEffect } from "react";
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/backend/models/room";
import CustomPagination from "./layout/CustomPagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[];
  };
}

const Home = ({ data }: Props) => {
  const { rooms, resPerPage, filteredRoomsCount } = data;

  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  return (
    <div>
      <div>
        <section id="rooms" className="container mt-5">
          <h2 className="mb-3 ml-2 stays-heading">
            {location
              ? `${rooms?.length} rooms found in ${location}`
              : "All rooms"}
          </h2>
          {/* <h2 className="mb-3 ml-2 stays-heading">{location ? `${rooms?.filteredRoomsCount} rooms found in ${location}` : "All rooms" }</h2> // 이걸 써야하는데 스키마에 filteredRoomsCount를 추가하지 않아서 에러가 난다. 추후 수정 필요. */}

          <Link href="/search" className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </Link>
          <div className="row mt-4">
            {rooms?.length === 0 ? (
              <div className="alert alert-danger mt-5 w-100">
                <b>No Rooms.</b>
              </div>
            ) : (
              rooms?.map((room) => <RoomItem key={room._id} room={room} />)
            )}
          </div>
        </section>

        <CustomPagination
          resPerPage={resPerPage}
          filteredRoomsCount={filteredRoomsCount}
        />
      </div>
    </div>
  );
};
export default Home;
