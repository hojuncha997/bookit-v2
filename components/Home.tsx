"use client";

import React, { useEffect } from "react";
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/backend/models/room";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[];
  };
}

const Home = ({ data }: Props) => {
  return (
    <div>
      <div>
        <section id="rooms" className="container mt-5">
          <h2 className="mb-3 ml-2 stays-heading">All Rooms</h2>
          <a href="/search" className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
          <div className="row mt-4">
            <RoomItem />
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;
