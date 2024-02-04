import { DisasterActions } from "../slices/disasterSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Disasters
export function fetchDisasters() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/Disasters");
      dispatch(DisasterActions.setDisasters(data));  // Assuming setDisasters is used for Disasters
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Disaster
export function createDisaster(newDisaster) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/Disasters", newDisaster, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(DisasterActions.addDisaster(data));  // Assuming addDisaster is used for adding Disasters
      dispatch(DisasterActions.setIsDisasterCreated(true));
      toast.success("Disaster created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Disaster
export function updateDisaster(updatedDisaster, disasterId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/Disasters/${disasterId}`, updatedDisaster, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(DisasterActions.updateDisaster(data));  // Assuming updateDisaster is used for updating Disasters
      dispatch(DisasterActions.setIsDisasterUpdated(true));
      toast.success("Disaster updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Disaster
export function deleteDisaster(disasterId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/Disasters/${disasterId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(DisasterActions.deleteDisaster(data.DisasterId));  // Assuming deleteDisaster is used for deleting Disasters
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
