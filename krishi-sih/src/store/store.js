// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import { weatherApi } from "./api/WeatherApi";
import { PricingSystemApi } from "./api/PricingSystem";
import { cropsApi } from "./api/CropsApi";
import { vegetableApi } from "./api/VegetableApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [PricingSystemApi.reducerPath]: PricingSystemApi.reducer,
    [cropsApi.reducerPath]: cropsApi.reducer,
    [vegetableApi.reducerPath]: vegetableApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, PricingSystemApi.middleware, cropsApi.middleware, vegetableApi.middleware),
});
