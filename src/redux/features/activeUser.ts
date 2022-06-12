import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "chat-app-types";
// Define a type for the slice state

// Define the initial state using that type
const initialState: IUser = {
  id: "",
  displayName: "",
  photoURL: "",
  threadIds: [],
};

export const activeUserSlice = createSlice({
  name: "activeUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
  },
});

export const { setActiveUser } = activeUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default activeUserSlice.reducer;
