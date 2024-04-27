import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  user: false,
  data: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = true;
      state.userId = action.payload;
    },
    userData: (state, action) => {
      state.data = action.payload;
      console.log("state.data = ",state.data)
    },
    logout: (state) => {
      state.userId= null,

      state.user = false;
      state.userData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout ,userData } = authSlice.actions;

export default authSlice.reducer;
