import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "chat-app-types";

// Define a type for the slice state
interface UIState {
  showEmojiPicker: boolean;
  chatTextInput: string;
  createGroupSidebar: {
    isOpen: boolean;
    selectedUsers: IUser[];
  };
}

// Define the initial state using that type
const initialState: UIState = {
  showEmojiPicker: false,
  chatTextInput: "",
  createGroupSidebar: {
    isOpen: false,
    selectedUsers: [],
  },
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
    toggleCreateGroupSidebar: (state) => {
      state.createGroupSidebar.isOpen = !state.createGroupSidebar.isOpen;
    },
    addUserToSelectedUsers: (state, action: PayloadAction<IUser>) => {
      const newUsers = action.payload;
      state.createGroupSidebar.selectedUsers = [
        ...state.createGroupSidebar.selectedUsers,
        newUsers,
      ].sort((a, b) => {
        if (a.displayName && b.displayName)
          return a.displayName.localeCompare(b.displayName);
        return 1;
      });
    },
    removeUserFromSelectedUsers: (state, action: PayloadAction<string>) => {
      state.createGroupSidebar.selectedUsers =
        state.createGroupSidebar.selectedUsers.filter(
          (user) => user.id != action.payload
        );
    },
  },
});

export const {
  toggleEmojiPicker,
  setChatTextInput,
  addEmojiToChatTextInput,
  toggleCreateGroupSidebar,
  addUserToSelectedUsers,
  removeUserFromSelectedUsers,
} = UISlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default UISlice.reducer;
