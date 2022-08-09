import { createAsyncThunk } from "@reduxjs/toolkit";
import { USER_REDUCER } from "store/const";
import { getProfile } from "api/user/getProfile";
import { updateUser } from "api/user/update";
import { UserLogoutThunk } from "./user_authorization_thunks";

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
      await dispatch(UserLogoutThunk)
      return rejectWithValue("Error");
    }
  }
);
