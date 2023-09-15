import { configureStore, combineReducers } from "@reduxjs/toolkit";
import roomReducer from "./reducers/roomReducer";

const rootReducer = combineReducers({
  roomStore: roomReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})