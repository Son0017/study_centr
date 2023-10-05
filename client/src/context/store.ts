import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import drawSlice from "./drawerSlicde";
export const store = configureStore({
  reducer: {
    user: userSlice,
    drawer: drawSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
