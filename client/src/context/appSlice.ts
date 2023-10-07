import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Iapper {
  tableData: any[];
  searchData?: any[];
  loading: boolean;
  status?: boolean;
}

const initialState: Iapper = {
  tableData: [],
  searchData: [],
  loading: false,
};

export const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    statusChange: (state, action: PayloadAction<any>) => {
      state.status = action.payload;
    },
    setTableData: (state, actions: PayloadAction<Iapper>) => {
      state.tableData = actions.payload.tableData;

      state.loading = actions.payload.loading;
    },
    pushTableData: (state, actions: PayloadAction<Iapper>) => {
      state.tableData.push(actions.payload);
    },
    deleteTableData: (state, actions: PayloadAction<any>) => {
      state.tableData = state.tableData.filter(
        (item: any) => item.id !== actions.payload.id
      );
    },
    editTableData: (state, actions: PayloadAction<any>) => {
      state.tableData = state.tableData.map((item: any) => {
        if (item.id !== actions.payload.id) {
          return item;
        } else {
          return actions.payload;
        }
      });
    },
  },
});

export const {
  setTableData,
  pushTableData,
  deleteTableData,
  editTableData,
  statusChange,
} = appSlice.actions;

export const selectapp = (state: RootState) => state.app;

export default appSlice.reducer;
