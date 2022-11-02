import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import loginReducer from "../reducers/loginSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  loginMMS: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     login: loginReducer,
//   },
// });
