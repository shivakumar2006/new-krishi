// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import { weatherApi } from "./api/WeatherApi";
import { PricingSystemApi } from "./api/PricingSystem";
import { cropsApi } from "./api/CropsApi";
import { vegetableApi } from "./api/VegetableApi";
import { fruitsApi } from "./api/FruitsApi";
import { pulsesApi } from "./api/PulsesApi";
import { JwtAuth } from "./api/JwtAuth";
import authReducer from "./authSlice";
import { coldStorageApi } from "./api/ColdStorageApi";
import { productApi } from "./api/ProductApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [PricingSystemApi.reducerPath]: PricingSystemApi.reducer,
    [cropsApi.reducerPath]: cropsApi.reducer,
    [vegetableApi.reducerPath]: vegetableApi.reducer,
    [fruitsApi.reducerPath]: fruitsApi.reducer,
    [pulsesApi.reducerPath]: pulsesApi.reducer,
    [JwtAuth.reducerPath]: JwtAuth.reducer,
    [coldStorageApi.reducerPath]: coldStorageApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, PricingSystemApi.middleware, cropsApi.middleware, vegetableApi.middleware, fruitsApi.middleware, pulsesApi.middleware, JwtAuth.middleware, coldStorageApi.middleware, productApi.middleware),
});
