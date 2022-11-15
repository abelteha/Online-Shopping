import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialSearchState, Products, Search } from "../types/types";

const initialState: InitialSearchState = {
  searchResult: [],
  searchButtonPressed: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchResults(state, action: PayloadAction<Products[]>) {
      state.searchResult = action.payload;
    },
    searchResultReset(state) {
      state.searchResult = [];
    },
    toggleSearchBar(state, action: PayloadAction<boolean>) {
      state.searchButtonPressed = action.payload;
    },
  },
});
export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
