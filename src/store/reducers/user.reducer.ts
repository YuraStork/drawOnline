import { AuthorizedUser } from "./../../types";
import { defaultUserData, userInitialState, USER_REDUCER } from "../const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSavedUser } from "services/token.service";
import { SavedUserObject } from "types";
import { getUserProfileThunk, updateUserProfileThunk } from "store/thunks/user.thunk";
import { AuthorizedThunk, UserLoginThunk, UserRegistrationThunk } from "store/thunks/user_authorization_thunks";

export const UserReducer = createSlice({
  name: USER_REDUCER,
  initialState: userInitialState,
  reducers: {
    initializeUser: (state, { payload: { token, user } }: PayloadAction<SavedUserObject>) => {
      state.token = token;
      state.data.id = user.id;
      state.data.name = user.name;
      state.data.role = user.role;
    },

    logoutAction: (state) => {
      state.data = defaultUserData;
      state.isAuth = false;
      state.error = undefined;
      state.token = undefined;
    }
  },

  extraReducers: builder => {
    builder.addCase(UserLoginThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(UserLoginThunk.fulfilled, (state, { payload: { token, user } }: PayloadAction<SavedUserObject>) => {
      state.token = token;
      state.data = { ...state.data, ...user }
      state.error = undefined;
      state.isAuth = true;
      state.isLoading = false;
      state.isReady = true;
    })
    builder.addCase(UserLoginThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload as string;
    })

    // --------------------------------------------------------
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getUserProfileThunk.fulfilled, (state, { payload }: PayloadAction<AuthorizedUser>) => {
      state.isLoading = false;
      state.data = { ...payload };
    })
    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error";
    })
    // --------------------------------------------------------
    builder.addCase(updateUserProfileThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(updateUserProfileThunk.fulfilled, (state) => {
      state.isLoading = false;
    })
    builder.addCase(updateUserProfileThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = "Error";
    })
    // --------------------------------------------------------
    builder.addCase(UserRegistrationThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(UserRegistrationThunk.fulfilled, (state) => {
      state.isLoading = false;
    })
    builder.addCase(UserRegistrationThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    })
    // --------------------------------------------------------
    builder.addCase(AuthorizedThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(AuthorizedThunk.fulfilled, (state, { payload }: PayloadAction<AuthorizedUser>) => {
      const user = getSavedUser() as SavedUserObject;
      state.token = user.token;
      state.data = { ...payload };
      state.isAuth = true;
      state.isLoading = false;
      state.error = undefined;
      state.isReady = true;
    })
    builder.addCase(AuthorizedThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
      state.isReady = true;
    })
    // --------------------------------------------------------
  }
})

export const { initializeUser, logoutAction } = UserReducer.actions;