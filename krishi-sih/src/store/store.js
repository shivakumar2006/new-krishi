// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import { weatherApi } from "./api/WeatherApi";
import { PricingSystemApi } from "./api/PricingSystem";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [PricingSystemApi.reducerPath]: PricingSystemApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, PricingSystemApi.middleware),
});
