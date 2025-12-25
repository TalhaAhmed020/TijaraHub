// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import productReducer from '../features/product/slice';



const store = configureStore({
  reducer: {
    product: productReducer,
  },
  devTools: true,
});

export default store;
