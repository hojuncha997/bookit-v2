// RTK QUERY 사용 안함 /api/client/userApi.ts 에서 일반 fetch로 api 호출
// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// export userApi = createApi({
//     reducerPath: 'userApi',
//     baseQuery: fetchBaseQuery({baseUrl: '/api'}),
//     endpoints: (builder) => ({
//         updateProfile: builder.mutation({
//             query: (body) => ({
//                 url: '/me/update',
//                 method: 'PUT',
//                 body
//             }),
//         }),

//     }),
// });

// export const {useUpdateProfileMutation} = userApi;;
