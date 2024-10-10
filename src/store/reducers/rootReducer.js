import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import postReducer from "./postReducer";
import { categoryReducer } from "./categoryReducer";
import { priceReducer } from "./priceReducer";
import { areaReducer } from "./areaReducer";
import { provinceReducer } from "./provinceReducer";
import { districtReducer } from "./districtReducer";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  post: postReducer,
  category: categoryReducer,
  prices: priceReducer,
  areas: areaReducer,
  provinces: provinceReducer,
  districts: districtReducer,
});

export default rootReducer;
