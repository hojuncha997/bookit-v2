import dbConnect from "@/backend/config/dbConnect";
import { updateProfile } from "@/backend/controllers/authControllers";
import { isAuthenticatedUser } from "@/backend/middleWares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>(); // createEdgeRouter를 사용하여 router를 생성

dbConnect(); // 데이터베이스 연결

//protected route
router.use(isAuthenticatedUser).put(updateProfile); // PUT 요청을 처리하기 전에 isAuthenticatedUser 미들웨어를 사용하여 사용자가 인증되었는지 확인하고, updateProfile 컨트롤러를 사용하여 사용자 프로필을 업데이트한다.

// PUT 요청을 처리하는 라우터 핸들러
export async function PUT(request: NextRequest, ctx: RequestContext) {
  // router.run을 사용하여 요청을 처리하고 결과를 반환. router.run의 의미는 다음과 같다. router.run은 미들웨어를 실행하고, 요청을 처리하고, 응답을 반환하는 함수를 반환한다.
  return router.run(request, ctx);
}

/*

실행 순서:

1. 클라이언트가 PUT 요청을 송신
2. Next.js가 route.ts(요청 진입부)의 PUT 함수를 호출(파일에서 호출하는 부분은 없지만 프레임워크가 내부적으로 처리. 개발자는 정의하기만 하면됨).
3. PUT 함수는 router.run(request, ctx)를 실행
4. 라우터는 미들웨어(isAuthenticatedUser)를 거쳐 컨트롤러의 updateProfile 핸들러를 실행
5-1. 세션이 존재하지 않는 경우 auth.ts에서 401 상태 코드와 함께 메시지를 응답으로 반환하며 응답과정이 종료됨.
5-2. updateProfile 핸들러 내에서 User.findByIdAndUpdate()가 실행되어 응답이 반환되므로써 응답과정이 종료됨.
*/
