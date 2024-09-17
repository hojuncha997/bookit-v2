"use client";

import { setUser, setIsAuthenticated } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  // 액션을 dispatch하기 위해 사용
  const dispatch = useAppDispatch();

  // useSelector를 사용하여 store의 값을 가져온다.
  const { user } = useAppSelector((state) => state.auth);

  console.log(user);

  const { data } = useSession();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
      dispatch(setIsAuthenticated(true));
    }
  }, [data]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <>
      <nav className="navbar sticky-top py-2">
        <div className="container">
          <div className="col-6 col-lg-3 p-0">
            <div className="navbar-brand">
              <a href="/">
                <img
                  style={{ cursor: "pointer" }}
                  src="images/bookit_logo.png"
                  alt="BookIT"
                />
              </a>
            </div>
          </div>

          <div className="col-6 col-lg-3 mt-3 mt-md-0 text-end">
            {user ? (
              <div className="ml-4 dropdown d-line">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <figure className="avatar avatar-nav">
                    <img
                      src={
                        user?.avatar
                          ? user?.avatar?.url
                          : "/images/default_avatar.jpg"
                      }
                      alt="John Doe"
                      className="rounded-circle placeholder-glow"
                      height="50"
                      width="50"
                    />
                  </figure>
                  <span className="placeholder-glow ps-1">{user?.name}</span>
                </button>

                <div
                  className="dropdown-menu w-100"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <Link href="/admin/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                  <Link href="/bookings/me" className="dropdown-item">
                    My Bookings
                  </Link>
                  <Link href="/me/update" className="dropdown-item">
                    Profile
                  </Link>
                  <Link
                    href="/"
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* 스켈레톤 설정(bootstrap skeleton): 아직 data가 도착하지 않아 undefined인 경우 스켈레톤을 보여준다.
                 */}
                {data === undefined && (
                  <div className="placeholder-glow">
                    <figure className="avatar avatar-nv placeholder bg-secondary"></figure>
                    <span className="placeholder w-25 bg-secondary ms-2"></span>
                  </div>
                )}
                {/* 로그인 버튼 */}
                {data === null && (
                  <Link
                    href="/login"
                    className="btn btn-danger px-4 text-white login-header-btn float-right"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
