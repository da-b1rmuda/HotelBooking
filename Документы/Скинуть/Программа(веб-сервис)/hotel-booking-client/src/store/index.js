import { configureStore, combineReducers } from '@reduxjs/toolkit';
import roomReducer from './reducers/roomReducer';
import additionalsReducer from './reducers/additionalsReducer';
import dealReducer from './reducers/dealReducer';
import rateReducer from './reducers/rateReducer';
import userReducer from './reducers/userReducer';
import bookingReducer from './reducers/bookingReducer';

const rootReducer = combineReducers({
  roomStore: roomReducer,
  additionalsStore: additionalsReducer,
  dealStore: dealReducer,
  rateStore: rateReducer,
  userStore: userReducer,
  bookingStore: bookingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
