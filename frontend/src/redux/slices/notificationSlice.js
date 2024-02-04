import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "Notification",
  initialState: {
    notifications: [],
    loading: false,
    isNotificationCreated: false,
    isNotificationUpdated: false,
  },
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    updateNotification(state, action) {
      // Implement your logic for updating a specific notification
    },
    deleteNotification(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload
      );
    },
    setIsNotificationCreated(state, action) {
      state.isNotificationCreated = action.payload;
    },
    setIsNotificationUpdated(state, action) {
      state.isNotificationUpdated = action.payload;
    },
  },
});

export const NotificationActions = NotificationSlice.actions;
export const NotificationReducer = NotificationSlice.reducer;
