import { createSlice } from "@reduxjs/toolkit";

const ReportSlice = createSlice({
  name: "Report",
  initialState: {
    reports: [],
    loading: false,
    isReportCreated: false,
    isReportUpdated: false,
  },
  reducers: {
    setReports(state, action) {
      state.reports = action.payload;
    },
    addReport(state, action) {
      state.reports.push(action.payload);
    },
    updateReport(state, action) {
      // Implement your logic for updating a specific report
    },
    deleteReport(state, action) {
      state.reports = state.reports.filter(
        (report) => report._id !== action.payload
      );
    },
    setIsReportCreated(state, action) {
      state.isReportCreated = action.payload;
    },
    setIsReportUpdated(state, action) {
      state.isReportUpdated = action.payload;
    },
  },
});

export const ReportActions = ReportSlice.actions;
export const ReportReducer = ReportSlice.reducer;
