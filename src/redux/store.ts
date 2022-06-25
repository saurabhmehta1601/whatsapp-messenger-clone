import { configureStore } from "@reduxjs/toolkit";
import UIReducer from "./features/ui";
import activeUserReducer from "./features/activeUser";

export const store = configureStore({
  reducer: { ui: UIReducer, activeUser: activeUserReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
