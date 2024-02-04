import { ReportActions } from "../slices/reportSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Reports
export function fetchReports() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/Reports");
      dispatch(ReportActions.setReports(data));  // Assuming setReports is used for Reports
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Report
export function createReport(newReport) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/Reports", newReport, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      console.log(data)
      dispatch(ReportActions.addReport(data)); 
       // Assuming addReport is used for adding Reports
      dispatch(ReportActions.setIsReportCreated(true));
      toast.success("Report created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Report
// Update Report
export function updateReport(updatedReport, reportId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/Reports/${reportId}`, updatedReport, {
     
      });
      dispatch(ReportActions.updateReport(data));  // Assuming updateReport is used for updating Reports
      dispatch(ReportActions.setIsReportUpdated(true));
      toast.success("Report updated successfully");
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to update the report");
    }
  };
}


// Delete Report
export function deleteReport(reportId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/Reports/${reportId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(ReportActions.deleteReport(data.ReportId));  // Assuming deleteReport is used for deleting Reports
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
