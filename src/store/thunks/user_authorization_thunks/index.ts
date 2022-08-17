import { AxiosError, AxiosResponse } from "axios";
import {
  SavedUserObject,
  UserLoginFormData,
  UserRegistrationData,
} from "./../../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_REDUCER } from "store/const";
import { authorizeUser } from "api/user/authorize";
import { getProfile } from "api/user/getProfile";
import { registrationUser } from "api/user/registration";
import { logout } from "api/user/logout";
import { initializeUser, logoutAction } from "store/reducers/user.reducer";
import {
  deleteSavedToken,
  getSavedUser,
  saveUserInStorage,
} from "services/token.service";
import { toastError, toastSuccess } from "../../../toast";
import { getUserProfileThunk } from "../user.thunk";

export const AuthorizedThunk = createAsyncThunk(
  `${USER_REDUCER}/authorize-thunk`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const savedUser = getSavedUser();
      if (savedUser) {
        const profile = await getProfile(savedUser.user.id);
        dispatch(initializeUser(savedUser));
        return profile.data;
      }
      throw new Error("User is not authorized");
    } catch (e) {
      await dispatch(UserLogoutThunk());
      return rejectWithValue("User is not authorized");
    }
  }
);

export const UserLoginThunk = createAsyncThunk(
  `${USER_REDUCER}/login-thunk`,
  async (data: UserLoginFormData, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<SavedUserObject> = await authorizeUser(
        data
      );
      saveUserInStorage(response.data);
      dispatch(initializeUser(response.data));
      await dispatch(getUserProfileThunk(response.data.user.id));
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        toastError(e.response?.data.message);
        return rejectWithValue(e.response?.data.message || "Login error");
      }
      return rejectWithValue("Login error");
    }
  }
);

export const UserRegistrationThunk = createAsyncThunk(
  `${USER_REDUCER}/registration-thunk`,
  async (data: UserRegistrationData, { rejectWithValue }) => {
    try {
      const response = await registrationUser(data);
      toastSuccess(response.data.message);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        toastError(e.response?.data.message);
        return rejectWithValue(
          e.response?.data.message || "Registration error"
        );
      }
      return rejectWithValue("Registration error");
    }
  }
);

export const UserLogoutThunk = createAsyncThunk(
  `${USER_REDUCER}/logout-thunk`,
  async (_, { dispatch }) => {
    await logout();
    deleteSavedToken();
    dispatch(logoutAction());
  }
);
