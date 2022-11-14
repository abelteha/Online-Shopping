import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialSearchState, Products, Search } from "../types/types";

const initialState: InitialSearchState = {
  searchText: "",
  searchAllCategories: true,
  searchResult: [],
  selectedCategory: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<Search>) {
      state.searchText = action.payload.text;
      state.searchAllCategories = action.payload.searchAllCategories;
      console.log(state.searchAllCategories);
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },

    searchResults(state, action: PayloadAction<Products[]>) {
      state.searchResult = action.payload;
    },
  },
});
export const searchAction = searchSlice.actions;
export default searchSlice.reducer;
