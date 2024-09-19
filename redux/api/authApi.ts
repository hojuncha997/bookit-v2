// RTK query 사용 안함 /api/client/authApi.ts 에서 일반 fetch로 api 호출
// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// export authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({baseUrl: '/api'}),
//     endpoints: (builder) => ({
//         login: builder.mutation({
//             query: (credentials) => ({
//                 url: '/auth/login',
//                 method: 'POST',
//                 body: credentials,
//             }),
//         }),
//         register: builder.mutation({
//             query: (credentials) => ({
//                 url: '/auth/register',
//                 method: 'POST',
//                 body: credentials,
//             }),
//         }),
//         logout: builder.mutation({
//             query: () => ({
//                 url: '/auth/logout',
//                 method: 'POST',
//             }),
//         }),
//     }),
// });

// export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = authApi;;
