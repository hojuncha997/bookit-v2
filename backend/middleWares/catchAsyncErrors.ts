import { NextRequest, NextResponse } from "next/server";

// catchAsyncErrors는 다른 함수(handler)를 인자로 받는다. 그리고 새로운 비동기 함수를 반환한다. 이 반환된 함수는 req와 params를 인자로 받는다.
// 이 패턴의 주요 목적은 에러 처리 로직을 중앙화하고 재사용하는 것이다.

//비동기 작업을 수행하고 그 결과로 NextResponse를 반환하는 함수들에 대한 타입을 정의
type HandlerFunction = (req: NextRequest, params: any) => Promise<NextResponse>;

interface IValidationError {
  message: string;
}

export const catchAsyncErrors =
  (handler: HandlerFunction) => async (req: NextRequest, params: any) => {
    try {
      // handler 함수를 실행하고 결과를 반환
      return await handler(req, params);
    } catch (error: any) {
      // 에러가 발생하면 에러 메시지를 반환

      // 에러의 종류가 캐스팅 에러인 경우: 존재하지 않는 리소스를 요청한 경우
      if (error.name === "CastError") {
        const message = `Resource not found. Invalid: ${error?.path}`;
        error.statusCode = 400;
      }

      // 에러의 종류가 유효성 검사 에러인 경우
      if (error.name === "ValidationError") {
        error.message = Object.values<IValidationError>(error.errors).map(
          (value: any) => value.message
        );
        error.statusCode = 400;
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.statusCode || 500 }
      );
    }
  };
