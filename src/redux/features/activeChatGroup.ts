import { createSlice } from "@reduxjs/toolkit";
import { IChatMessage } from "chat-app-types";
// Define a type for the slice state

interface ActiveChatGroupState {
  id: string | null;
}

// Define the initial state using that type
const initialState: ActiveChatGroupState = {
  id: null,
};

export const activeChatGroupSlice = createSlice({
  name: "activeChatGroup",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActiveChatGroupId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setActiveChatGroupId } = activeChatGroupSlice.actions;
// Other code such as selectors can use the imported `RootState` type

export default activeChatGroupSlice.reducer;
