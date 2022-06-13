import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UIState {
  showEmojiPicker: boolean;
  chatTextInput: string;
}

// Define the initial state using that type
const initialState: UIState = {
  showEmojiPicker: false,
  chatTextInput: "",
};

export const UISlice = createSlice({
  name: "UI",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleEmojiPicker: (state) => {
      state.showEmojiPicker = !state.showEmojiPicker;
    },
    setChatTextInput: (state, action: PayloadAction<string>) => {
      state.chatTextInput = action.payload;
    },
    addEmojiToChatTextInput: (state, action: PayloadAction<string>) => {
      state.chatTextInput += action.payload;
    },
  },
});

export const { toggleEmojiPicker, setChatTextInput, addEmojiToChatTextInput } =
  UISlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default UISlice.reducer;
