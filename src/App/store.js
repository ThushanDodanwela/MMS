import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import alertReducer from "../reducers/alertSlice";
import loginReducer from "../reducers/loginSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: "alertMMS",
};

const rootReducer = combineReducers({
  loginMMS: loginReducer,
  alertMMS: alertReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
