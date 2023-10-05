import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IUserSate {
  first_name: String;
  last_name: String;
  phone_number: String;
  password: string;
  type: string;
  summa: number;
  payout_percentage: number;
}

const initialState: IUserSate = {
  first_name: "",
  last_name: "",
  phone_number: "",
  password: "",
  type: "",
  summa: 0,
  payout_percentage: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSate>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
