import { AuthorizedUser } from "./../../types";
import { defaultUserData, userInitialState, USER_REDUCER } from "../const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSavedUser } from "services/token.service";
import { SavedUserObject } from "types";
import { updateUserProfileThunk } from "store/thunks/user.thunk";
import { AuthorizedThunk, UserLoginThunk, UserRegistrationThunk } from "store/thunks/user_authorization_thunks";

type LoginPayload = {
  token: string;
  profile: AuthorizedUser
}

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
    builder.addCase(UserLoginThunk.fulfilled, (state, { payload: { token, profile } }: PayloadAction<LoginPayload>) => {
      state.token = token;
      state.data = { ...profile };
      state.error = undefined;
      state.isLoading = false;
      state.isAuth = true;
    })
    builder.addCase(UserLoginThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload as string;
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
      state.isLoading = false;
      state.error = undefined;
      state.isAuth = true;
    })
    builder.addCase(AuthorizedThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    })
    // --------------------------------------------------------
  }
})

export const { initializeUser, logoutAction } = UserReducer.actions;