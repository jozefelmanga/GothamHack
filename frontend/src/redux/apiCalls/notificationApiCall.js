import { NotificationActions } from "../slices/notificationSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Notifications
export function fetchNotifications() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/Notifications");
      dispatch(NotificationActions.setNotifications(data)); // Assuming setNotifications is used for Notifications
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Notification
export function createNotification(newNotification) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/Notifications",
        newNotification,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(NotificationActions.addNotification(data)); // Assuming addNotification is used for adding Notifications
      dispatch(NotificationActions.setIsNotificationCreated(true));
      toast.success("Notification created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Notification
export function updateNotification(updatedNotification, notificationId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/Notifications/${notificationId}`,
        updatedNotification,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(NotificationActions.updateNotification(data)); // Assuming updateNotification is used for updating Notifications
      dispatch(NotificationActions.setIsNotificationUpdated(true));
      toast.success("Notification updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Notification
export function deleteNotification(notificationId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(
        `/api/Notifications/${notificationId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(NotificationActions.deleteNotification(data.NotificationId)); // Assuming deleteNotification is used for deleting Notifications
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
