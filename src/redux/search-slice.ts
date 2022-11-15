import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialSearchState, Products, Search } from "../types/types";

const initialState: InitialSearchState = {
  searchResult: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchResults(state, action: PayloadAction<Products[]>) {
      state.searchResult = action.payload;
    },
  },
});
export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
