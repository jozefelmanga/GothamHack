import { createSlice } from "@reduxjs/toolkit";

const DisasterSlice = createSlice({
  name: "Disaster",
  initialState: {
    disasters: [],
    loading: false,
    isDisasterCreated: false,
    isDisasterUpdated: false,
  },
  reducers: {
    setDisasters(state, action) {
      state.disasters = action.payload;
    },
    addDisaster(state, action) {
      state.disasters.push(action.payload);
    },
    updateDisaster(state, action) {
      // Implement your logic for updating a specific disaster
    },
    deleteDisaster(state, action) {
      state.disasters = state.disasters.filter((disaster) => disaster._id !== action.payload);
    },
    setIsDisasterCreated(state, action) {
      state.isDisasterCreated = action.payload;
    },
    setIsDisasterUpdated(state, action) {
      state.isDisasterUpdated = action.payload;
    },
  },
});

export const DisasterActions = DisasterSlice.actions;
export const DisasterReducer = DisasterSlice.reducer;
