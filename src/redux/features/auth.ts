import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmationResult } from "firebase/auth";
// Define a type for the slice state

interface IState {
  confirmationResult: ConfirmationResult | null;
  username: string;
}

// Define the initial state using that type
const initialState: IState = {
  confirmationResult: null,
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setConfirmationResult: (
      state,
      action: PayloadAction<ConfirmationResult>
    ) => {
      state.confirmationResult = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setConfirmationResult, setUsername } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer;
