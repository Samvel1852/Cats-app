import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  catCategories: [],
  catImages: [],
  status: "",
  imagesStatus: "",
  imageBrowsingStatus: "fulfilled",
};

export const getCatsCategories = createAsyncThunk(
  "cats/categories",
  async () => {
    const categories = await fetch(
      "https://api.thecatapi.com/v1/categories"
    ).then((res) => res.json());
    return categories;
  }
);

export const getImagesByCategory = createAsyncThunk(
  "byCategory/images",
  async (category) => {
    const images = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${category}`
    ).then((res) => res.json());
    return images;
  }
);

export const getCatsImages = createAsyncThunk("cats/images", async () => {
  const images = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=1"
  ).then((res) => res.json());
  return images;
});

export const browseMoreImages = createAsyncThunk(
  "browse/images",
  async (page) => {
    const browsedImages = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=1`
    ).then((res) => res.json());
    return browsedImages;
  }
);

export const catsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCatsCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCatsCategories.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.catCategories = action.payload;
      })

      .addCase(getCatsImages.pending, (state) => {
        state.imagesStatus = "loading";
      })
      .addCase(getCatsImages.fulfilled, (state, action) => {
        state.imagesStatus = "fulfilled";
        state.catImages = action.payload;
      })

      .addCase(browseMoreImages.pending, (state) => {
        state.imageBrowsingStatus = "loading";
      })
      .addCase(browseMoreImages.fulfilled, (state, action) => {
        state.imageBrowsingStatus = "fulfilled";
        state.catImages = [...current(state).catImages, ...action.payload];
      })

      .addCase(getImagesByCategory.pending, (state) => {
        state.imageBrowsingStatus = "loading";
      })
      .addCase(getImagesByCategory.fulfilled, (state, action) => {
        state.imageBrowsingStatus = "fulfilled";
        state.catImages = action.payload;
      });
  },
});

export const { incrementByAmount } = catsSlice.actions;

export default catsSlice.reducer;
