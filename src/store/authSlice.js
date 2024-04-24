import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.user = false;
      state.userData = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login , logout } = authSlice.actions;

export default authSlice.reducer;
