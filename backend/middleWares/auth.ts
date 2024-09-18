import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../models/users";

export const isAuthenticatedUser = async (
  req: NextRequest,
  event: any,
  next: any
) => {
  const session = await getToken({ req }); //의미는

  // 세션이 존재하지 않는 경우 401 상태 코드와 함께 메시지를 반환한다. 여기서 응답과정이 종료된다. 컨트롤러까지 가지 않는다.
  if (!session) {
    return NextResponse.json(
      {
        message: "Login first to access this route.",
      },
      { status: 401 }
    );
  }

  req.user = session.user as IUser; // as IUser의 의미는 session.user가 IUser 타입이라고 가정하는 것이다. req.user가 세션의 user를 할당받을 수 있는 이유는,
  // next.d.ts파일에서 NextRequest에 user를 IUser로 선언했기 때문이다.

  //req는 체인 전체에서 공유되므로 next()의 파라미터로 req를 전달할 필요가 없다.
  return next(); // 반환보다는 호출에 가깝다. next()는 미들웨어 함수를 호출하는 함수이다. 이 함수를 호출하면 다음 미들웨어 함수로 제어를 전달한다. 쉽게 말하면 다음 미들웨어 함수로 넘어가는 것이다.
};
