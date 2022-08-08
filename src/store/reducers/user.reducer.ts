import { AuthorizedUser } from "./../../types";
import { USER_REDUCER } from "../const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSavedUser, saveUserInStorage } from "services/token.service";
import { SavedUserObject } from "types";
import { AuthorizedThunk, getUserProfileThunk, updateUserProfileThunk, UserLoginThunk, UserRegistrationThunk } from "store/thunks/user.thunk";

type initialStateTypes = {
  isAuth: boolean,
  isLoading: boolean,
  error: undefined | string,
  token: undefined | string,
  data: {
    id: string,
    avatar: string,
    backgroundFon: string,
    name: string,
    age: string,
    role: string,
    email: string,
    country: string,
    city: string,
    color: string,
    gender: string,
    date: string,
    biography: string,
  }
}

const initialState: initialStateTypes = {
  isAuth: false,
  error: undefined,
  isLoading: false,
  token: undefined,

  data: {
    id: "",
    avatar: "",
    backgroundFon: "",
    name: "",
    age: "",
    role: "",
    email: "",
    country: "",
    city: "",
    color: "",
    gender: "",
    date: "",
    biography: "",
  }
}

export const UserReducer = createSlice({
  name: USER_REDUCER,
  initialState,
  reducers: {
    initializeUser: (state) => {
      const user = getSavedUser();
      if (user) {
        state.token = user.token;
        state.data.id = user.user.id;
        state.data.name = user.user.name;
        state.data.role = user.user.role;
        state.isAuth = true;
        state.error = undefined;
      }
    },
    logoutAction: (state) => {
      localStorage.removeItem("user");
      state.data = {
        id: "",
        avatar: "",
        backgroundFon: "",
        name: "",
        age: "",
        role: "",
        email: "",
        country: "",
        city: "",
        color: "",
        gender: "",
        date: "",
        biography: "",
      }
      state.isAuth = false;
      state.token = undefined;
    }
  },

  extraReducers: builder => {
    // --------------------------------------------------------
    builder.addCase(UserLoginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    })

    builder.addCase(UserLoginThunk.fulfilled, (state, { payload }: PayloadAction<SavedUserObject>) => {
      const { user, token } = payload;
      state.token = token;
      state.data = { ...state.data, ...user }
      state.error = undefined;
      state.isAuth = true;
      state.isLoading = false;
      saveUserInStorage(payload);
    })

    builder.addCase(UserLoginThunk.rejected, (state, { error }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = error.message;
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
      state.isAuth = false;
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
      state.token = user?.token;
      state.data = payload;
      state.isAuth = true;
      state.isLoading = false;
      state.error = undefined;
    })
    builder.addCase(AuthorizedThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    })
    // --------------------------------------------------------
  }
})

export const { initializeUser, logoutAction } = UserReducer.actions;