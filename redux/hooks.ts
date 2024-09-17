// 전역 useSelector와 useDispatch를 사용하기 위한 파일

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store"; // 여기서 import typo의 의미는 타입만 import한다는 의미. 런타임에 영향X

// useDispatch와 useSelector 대신 사용하기 위해 만든 커스텀 훅
export const useAppDispatch = () => useDispatch<AppDispatch>(); // AppDispatch는 store.ts에서 정의한 타입
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // RootState는 store.ts에서 정의한 타입

// useSelector는 store의 값을 가져오기 위해 사용한다.
// useDispatch는 사용하는 컴포넌트에서 이를 통해 store의 값을 변경하기 위해 사용한다.
