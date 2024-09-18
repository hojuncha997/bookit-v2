/*
리덕스 툴킷 쿼리를 사용하지 않음

import {FEechBaseQueryError} from "@reduxjs/toolkit/dist/query/react";

declare "@reduxjs/toolkit/dist/query/react" {
    interface FetchBaseQueryError {
        data?: any;
    }
}
*/

import { IUser } from "@/backend/models/users";
import { NextRequest } from "next/server";

declare module "next/server" {
  interface NextRequest {
    user: IUser;
  }
}
