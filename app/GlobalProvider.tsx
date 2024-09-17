"use client"; // SessionProvider를 사용하기 위해 추가. 서버 컴포넌트에서는 불가능하므로 client로 변경

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </>
  );
}
