import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@Redux/store";

// Define a type for the slice state
interface UIState {
  showEmojiPicker: boolean;
}

// Define the initial state using that type
const initialState: UIState = {
  showEmojiPicker: false,
};

export const UISlice = createSlice({
  name: "UI",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleEmojiPicker: (state) => {
      state.showEmojiPicker = !state.showEmojiPicker;
    },
  },
});

export const { toggleEmojiPicker } = UISlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default UISlice.reducer;
