"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import React, { useCallback, useEffect, useState } from "react";
//  api 호출함수
// import { updateUserApi } from "@/api/client/userApi";
import { updateUser } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    // 유저 정보를 업데이트한다.
    dispatch(updateUser(userData));
  };

  //   const { user: currentUser } = useAppSelector((state) => state.auth);
  const {
    user: currentUser,
    isAuthenticated,
    status,
    error,
  } = useAppSelector((state) => state.auth);

  // 페이지가 마운트 되면 RTK store에서 값을 가져와 로컬 state에 저장한다.
  // 유저가 값을 변경하면 로컬 state에 저장된 값을 변경한다.
  // 버튼을 누르면 submitHandler 함수가 실행된다.
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setName(currentUser.name);
      setEmail(currentUser.email);
    }

    // if (error && "data" in error) {
    if (error) {
      //   toast.error(error?.data?.message);
      toast.error(error);
    }

    if (status === "succeeded") {
      toast.success("Profile updated successfully");
      //   router.refresh(); // 페이지를 새로고침한다.
    }
  }, [currentUser, error, status]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn form-btn w-100 py-2">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
