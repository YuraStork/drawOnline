import { AuthorizedUser, UserLoginFormData } from "./../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_REDUCER } from "store/const";
import { getUserProfile, handleAuthorization, updateUserProfile } from "api/user.api";
import { UserCabinetTypes } from "pages/userCabinet/types";

export const UserLoginThunk = createAsyncThunk(
  `${USER_REDUCER}/login-thunk`,
  async (data: UserLoginFormData, thunkAPI) => {
    const response = await handleAuthorization(data);
    if (!response?.data) {
      return thunkAPI.rejectWithValue("Error in")
    }
    return response.data;
  }
)

export const getUserProfileThunk = createAsyncThunk(
  `${USER_REDUCER}/profile-thunk`,
  async (id: string, thunkAPI) => {
    const response = await getUserProfile(id);
    if (response?.data) {
      return response?.data;
    }
    return thunkAPI.rejectWithValue("Error")
  }
)

export const updateUserProfileThunk = createAsyncThunk(
  `${USER_REDUCER}/update-profile-thunk`,
  async (data: any, thunkAPI) => {
    const response = await updateUserProfile(data);
    if (response?.status === 200) {
      return response?.data;
    }
    return thunkAPI.rejectWithValue("Error")
  }
) 
