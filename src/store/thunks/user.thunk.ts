import { AxiosError } from "axios";
import { UserLoginFormData, UserRegistrationData } from "./../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_REDUCER } from "store/const";
import { authorizeUser } from "api/user/authorize";
import { getProfile } from "api/user/getProfile";
import { updateUser } from "api/user/update";
import { registrationUser } from "api/user/registration";
import { logout } from "api/user/logout";
import { initializeUser, logoutAction } from "store/reducers/user.reducer";
import { getSavedUser, saveUserInStorage } from "services/token.service";
import { toastError, toastSuccess } from "../../toast";

export const AuthorizedThunk = createAsyncThunk(
  `${USER_REDUCER}/authorize-thunk`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const savedUser = getSavedUser();
      if (savedUser) {
        const profile = await getProfile(savedUser.user.id);
        dispatch(initializeUser());
        return profile.data;
      }
      throw new Error("User is not authorized");
    } catch (e) {
      await dispatch(UserLogoutThunk());
      return rejectWithValue("User is not authorized");
    }
  }
);

export const UserLogoutThunk = createAsyncThunk(
  `${USER_REDUCER}/logout-thunk`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logout();
      dispatch(logoutAction());
      return true;
    } catch (e) {
      dispatch(logoutAction());
      rejectWithValue("Error")
    }
  }
);

export const UserLoginThunk = createAsyncThunk(
  `${USER_REDUCER}/login-thunk`,
  async (data: UserLoginFormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await authorizeUser(data);
      saveUserInStorage(response.data);
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
        return rejectWithValue(e.response?.data.message || "Registration error");
      }
      return rejectWithValue("Registration error");
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  `${USER_REDUCER}/profile-thunk`,
  async (id: string) => {
    const response = await getProfile(id);
    return response?.data;
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  `${USER_REDUCER}/update-profile-thunk`,
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateUser(data);
      return response.data;
    } catch (e) {
      await dispatch(UserLogoutThunk())
      return rejectWithValue("Error");
    }
  }
);
