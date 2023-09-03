import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import rootReducer from "./root";

const persistConfig = {
  key: "root", // This is the key used to store data in storage
  storage, // Specify the storage mechanism (e.g., localStorage, sessionStorage)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
