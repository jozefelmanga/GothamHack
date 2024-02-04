import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { DisasterReducer } from "./slices/disasterSlice";
import { ReportReducer } from "./slices/reportSlice";
import { NotificationReducer } from "./slices/notificationSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
       disaster: DisasterReducer,
       report:ReportReducer,
       profile:profileReducer,
       notification:NotificationReducer,
    }
});

export default store;