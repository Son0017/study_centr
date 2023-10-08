import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Iapper {
  tableData: any[];
  searchData?: any[];
  loading: boolean;
  status?: boolean;
  message?: any;
}

const initialState: Iapper = {
  tableData: [],
  searchData: [],
  loading: false,
  message: {
    type: "success",
    content: "Welcome",
  },
};

export const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    statusChange: (state, action: PayloadAction<any>) => {
      state.status = action.payload;
      state.message = {
        type: "success",
        content: "Status o'zgardi",
      };
    },
    setTableData: (state, actions: PayloadAction<Iapper>) => {
      state.tableData = actions.payload.tableData;
      state.loading = actions.payload.loading;
    },
    pushTableData: (state, actions: PayloadAction<Iapper>) => {
      state.tableData.push(actions.payload);
      state.message = {
        type: "success",
        content: "Qo'shildi",
      };
    },
    deleteTableData: (state, actions: PayloadAction<any>) => {
      state.tableData = state.tableData.filter(
        (item: any) => item.id !== actions.payload.id
      );
      state.message = {
        type: "success",
        content: "Ochirildi",
      };
    },
    setMessage: (state, actions: PayloadAction<any>) => {
      state.message = actions.payload;
    },
    editTableData: (state, actions: PayloadAction<any>) => {
      state.tableData = state.tableData.map((item: any) => {
        if (item.id !== actions.payload.id) {
          return item;
        } else {
          return actions.payload;
        }
      });
      state.message = {
        type: "success",
        content: "Yangilandi",
      };
    },
  },
});

export const {
  setTableData,
  pushTableData,
  deleteTableData,
  editTableData,
  statusChange,
  setMessage,
} = appSlice.actions;

export const selectapp = (state: RootState) => state.app;

export default appSlice.reducer;
