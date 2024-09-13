"use client";

import { IRoom } from "@/backend/models/room";
import React from "react";
import StartRatings from "react-star-ratings";
import RoomImageSlider from "./RoomImageSlider";
import RoomFeatures from "./RoomFeatures";
import BookingDatePicker from "./BookingDatePicker";
import ListReviews from "../review/ListReviews";
import NewReview from "../review/NewReview";

interface Props {
  data: {
    room: IRoom;
  };
}

const RoomDetails = ({ data }: Props) => {
  const room = data.room;

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{room.name}</h2>
      <p>{room.address}</p>

      <div className="ratings mt-auto mb-3">
        <StartRatings
          rating={room?.rating}
          starRatedColor="orange"
          numberOfStars={5}
          name="rating"
          starDimension="22px"
          starSpacing="2px"
        />
        <span className="no-of-reviews">({room?.numOfReviews})</span>
      </div>

      <RoomImageSlider images={room?.images} />

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>{room?.description}</p>

          <RoomFeatures room={room} />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <BookingDatePicker room={room} />
          // Room Map - TODO
        </div>
      </div>

      <NewReview />
      <ListReviews />
    </div>
  );
};

export default RoomDetails;
