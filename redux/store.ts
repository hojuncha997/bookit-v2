import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    // 여기에 추가적인 reducer를 추가
    auth: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/*

Redux 스토어를 큰 백화점에 비유할 수 있다.

백화점 (Store):
전체 Redux 스토어는 하나의 큰 백화점과 같다.
이 백화점에는 여러 층과 부서가 있으며, 각각 다른 종류의 상품을 판매한다.


부서들 (Slices):
백화점의 각 부서(예: 의류, 전자제품, 식품)는 Redux의 각 슬라이스에 해당한다.
각 부서는 자신만의 상품(상태)과 관리 방식(리듀서)을 가지고 있다.


상품 진열대 (State):
각 부서의 상품 진열대는 해당 슬라이스의 현재 상태를 나타낸다.
예를 들어, 의류 부서의 진열대에는 현재 재고 상태가 표시되어 있다.


직원들 (Reducers):
각 부서의 직원들은 리듀서와 같다.
그들은 상품을 정리하고, 새 상품을 진열하며, 재고를 관리한다.


고객 요청 (Actions):
고객이 상품을 구매하거나 교환을 요청하는 것은 액션과 같다.
이러한 요청은 해당 부서의 직원(리듀서)에 의해 처리된다.


안내 데스크 (Dispatch):
백화점의 중앙 안내 데스크는 dispatch 함수와 같다.
모든 고객 요청(액션)은 이 안내 데스크를 통해 적절한 부서로 전달된다.


매장 관리자 (Root Reducer):
전체 백화점을 관리하는 총괄 매니저는 루트 리듀서와 같다.
각 부서의 상태를 종합하여 전체 백화점의 상태를 관리한다.


재고 시스템 (Store Configuration):
백화점의 전산 시스템 설정은 스토어 설정과 유사하다.
어떤 부서가 있는지, 각 부서의 초기 재고는 어떻게 되는지 등을 설정한다.


따라서, 스토어를 설정할 때는 이 백화점의 기본 구조를 정의하는 것과 같다. 어떤 부서(슬라이스)가 있을지, 각 부서의 초기 상태는 어떻게 될지, 전체 백화점을 어떻게 관리할지 등을 정의하는 것이다.


--------

/*

useDispatch는 Redux 액션을 디스패치하기 위해 사용된다. 이를 통해 간접적으로 스토어의 상태를 변경할 수 있다.

useDispatch는 Redux 스토어의 dispatch 함수에 대한 참조를 제공한다.
이 dispatch 함수를 사용하여 액션을 디스패치합니다. 액션은 어떤 변경을 해야 하는지를 설명하는 plain JavaScript 객체이다.
디스패치된 액션은 리듀서에 의해 처리된다. 리듀서는 현재 상태와 액션을 받아 새로운 상태를 반환하는 함수이다.
리듀서가 새로운 상태를 반환하면, 그것이 스토어의 새로운 상태가 된다.

따라서 useDispatch는 직접적으로 스토어의 값을 변경하는 것이 아니라, 변경을 요청하는 액션을 보내는 메커니즘을 제공한다. 이는 Redux의 단방향 데이터 흐름 원칙을 따르는 방식이다.

---




*/
