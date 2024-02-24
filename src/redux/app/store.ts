import { configureStore } from '@reduxjs/toolkit';
import orderDataSlice from '../reduxSlice/orderDataSlice';

export const store = configureStore({
  reducer: {
    orderDataSlice
  }, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

});

export type RootState = ReturnType<typeof store.getState>
