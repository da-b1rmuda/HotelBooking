import { configureStore, combineReducers } from "@reduxjs/toolkit";
import roomReducer from "./reducers/roomReducer";
import additionalsReducer from "./reducers/additionalsReducer";
import dealReducer from "./reducers/dealReducer";

const rootReducer = combineReducers({
  roomStore: roomReducer,
  additionalsStore: additionalsReducer,
  dealStore: dealReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})