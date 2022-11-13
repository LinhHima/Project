import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import listAccountReducer from "./slices/listAccountSlice";
import ticketReducer from "./slices/ticketSlice";
import gameReducer from "./slices/gameslice";
import eventReducer from "./slices/eventSliceV2";
import reportReducer from "./slices/reportSlice";
import vipReducer from "./slices/vipSlice";
import statisticsReducer from "./slices/statistics";

export default configureStore({
    reducer: {
        authSlice: authReducer,
        listAccountSlice: listAccountReducer,
        ticketSlice: ticketReducer,
        gameSlice: gameReducer,
        eventSliceV2: eventReducer,
        reportSlice: reportReducer,
        vipSlice: vipReducer,
        statisticsSlice: statisticsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }), //tránh error non-serialize
    devTools: process.env.NODE_ENV === "development",
});
