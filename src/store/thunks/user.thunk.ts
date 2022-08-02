import { UserLoginFormData, UserRegistrationData } from "./../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_REDUCER } from "store/const";
import { authorizeUser } from "api/user/authorize";
import { getProfile } from "api/user/getProfile";
import { updateUser } from "api/user/update";
import { registrationUser } from "api/user/registration";

export const UserLoginThunk = createAsyncThunk(
  `${USER_REDUCER}/login-thunk`,
  async (data: UserLoginFormData, thunkAPI) => {
    const response = await authorizeUser(data);
    if (!response?.data) {
      return thunkAPI.rejectWithValue("Error in")
    }
    return response.data;
  }
)

export const UserRegistrationThunk = createAsyncThunk(
  `${USER_REDUCER}/registration-thunk`,
  async (data: UserRegistrationData, thunkAPI) => {
    try {
      const response = await registrationUser(data);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message || "Error")
    }
  }
)

export const getUserProfileThunk = createAsyncThunk(
  `${USER_REDUCER}/profile-thunk`,
  async (id: string, thunkAPI) => {
    const response = await getProfile(id);
    if (response?.data) {
      return response?.data;
    }
    return thunkAPI.rejectWithValue("Error")
  }
)

export const updateUserProfileThunk = createAsyncThunk(
  `${USER_REDUCER}/update-profile-thunk`,
  async (data: any, thunkAPI) => {
    const response = await updateUser(data);
    if (response?.status === 200) {
      return response?.data;
    }
    return thunkAPI.rejectWithValue("Error")
  }
) 
