import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./reducers/user.reducer";

const RootReducer = combineReducers({
  "user": UserReducer.reducer
})

export const store = configureStore({
  reducer: RootReducer,
  devTools: true,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch