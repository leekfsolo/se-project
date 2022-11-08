import { createSlice } from "@reduxjs/toolkit";
import { userApiSlice } from "./userApiSlice";

const user = createSlice({
  name: "user",
  initialState: {
    role: "collector",
    avatar: "",
  },
  reducers: {},
  extraReducers: (buider) => {
    buider.addMatcher(
      userApiSlice.endpoints.updateRole.matchFulfilled,
      (state, action) => {
        state.role = action.payload.data;
      }
    );
    buider.addMatcher(
      userApiSlice.endpoints.getAvatar.matchFulfilled,
      (state, action) => {
        state.avatar = action.payload;
      }
    );
    buider.addMatcher(
      userApiSlice.endpoints.updateAvatar.matchFulfilled,
      (state, action) => {
        state.avatar = action.payload.data;
      }
    );
  },
});

const { reducer } = user;
export default reducer;
