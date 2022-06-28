import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "chat-app-types";

// Define a type for the slice state
interface CreateGroupSidebarState {
  selectedUsers: IUser[];
  isOpen: boolean;
  groupSubject: string;
  groupImg: null | string;
}

// Define the initial state using that type
const initialState: CreateGroupSidebarState = {
  isOpen: false,
  selectedUsers: [],
  groupSubject: "",
  groupImg: null,
};

export const CreateGroupSidebarSlice = createSlice({
  name: "createGroupSidebar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleCreateGroupSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    addUserToSelectedUsers: (state, action: PayloadAction<IUser>) => {
      const newUsers = action.payload;
      state.selectedUsers = [...state.selectedUsers, newUsers].sort((a, b) => {
        if (a.displayName && b.displayName)
          return a.displayName.localeCompare(b.displayName);
        return 1;
      });
    },
    removeUserFromSelectedUsers: (state, action: PayloadAction<string>) => {
      state.selectedUsers = state.selectedUsers.filter(
        (user) => user.id != action.payload
      );
    },
    setGroupSubject: (state, action: PayloadAction<string>) => {
      state.groupSubject = action.payload;
    },
    setGroupImg: (state, action: PayloadAction<string>) => {
      state.groupImg = action.payload;
    },
  },
});

export const {
  toggleCreateGroupSidebar,
  addUserToSelectedUsers,
  removeUserFromSelectedUsers,
  setGroupSubject,
  setGroupImg,
} = CreateGroupSidebarSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default CreateGroupSidebarSlice.reducer;
