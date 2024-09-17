import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  user: any;
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};

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
});

// reducer export
export default userSlice.reducer;

// action creators export
export const { setUser, setIsAuthenticated } = userSlice.actions;
