import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage
//Auth Reducers
import userAuthReducer from "../auth/userAuthSlice.js"

// Shared Reducers
import sidebarReducer from "../features/sidebarSlice.js"
import activitiesReducer from "../features/activityLogSlice.js"
import saleReducer from "../features/saleSlice.js"
const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userAuthReducer);

 const store = configureStore({
  reducer: {
    //Auth Reducers
    userAuth: persistedReducer,

    //Shared Reducers
    sidebar: sidebarReducer,
    activityLogs: activitiesReducer,
    sales: saleReducer
  },
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
    },
  }),
})
export const persistor = persistStore(store);
export default store;