import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserApi } from "@/api/client/userApi";

interface IUserState {
  user: any;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  //   error: string | null;
  error: any;
}

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const updateUser = createAsyncThunk(
  "user/update",
  async (userData: { name: string; email: string }, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// reducer export
export default userSlice.reducer;

// action creators export
export const { setUser, setIsAuthenticated } = userSlice.actions;

// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { updateUserApi } from "@/api/client/userApi";

// interface IUserState {
//   user: any;
//   isAuthenticated: boolean;
// }

// const initialState: IUserState = {
//   user: null,
//   isAuthenticated: false,
// };

// export const userSlice = createSlice({
//   initialState,
//   name: "userSlice",
//   reducers: {
//     setUser: (state, action: PayloadAction<any>) => {
//       state.user = action.payload;
//     },
//     setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
//       state.isAuthenticated = action.payload;
//     },
//   },
// });

// // reducer export
// export default userSlice.reducer;

// // action creators export
// export const { setUser, setIsAuthenticated } = userSlice.actions;
