"use client";

import React from "react";
import StartRatings from "react-star-ratings"; // index.d.ts파일을 생성해서 모듈을 선언하여 에러 해결
import { IRoom } from "@/backend/models/room";
import Image from "next/image";
import Link from "next/link";

interface Props {
  room: IRoom;
}

const RoomItem = ({ room }: Props) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
      <div className="card p-2 w-100">
        <Image
          className="card-img-top mx-auto"
          src={
            room?.images?.length > 0
              ? room.images[0].url
              : "/images/default_room_image.jpg"
          }
          alt={room?.name}
          height={170}
          width={100}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link href={`/rooms/${room?._id}`}>{room?.name}</Link>
          </h5>
          <div className="mt-auto">
            <p className="card-text mt-2">
              <b>{room?.pricePerNight}</b> / night
            </p>
          </div>
          <div>
            <div className="d-flex">
              <StartRatings
                rating={room?.rating}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
              />
              <span className="no-of-reviews">({room?.numOfReviews})</span>
            </div>
            <Link
              className="btn view-btn mt-3 w-100"
              href={`/rooms/${room?._id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
