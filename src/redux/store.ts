import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import UIReducer from "./features/ui";
import activeUserReducer from "./features/activeUser";
import createGroupSidebarReducer from "./features/createGroupSidebar";
import authReducer from "./features/auth";

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: () => false,
});

export const store = configureStore({
  reducer: {
    ui: UIReducer,
    activeUser: activeUserReducer,
    createGroupSidebar: createGroupSidebarReducer,
    auth: authReducer,
  },
  middleware: [serializableMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
