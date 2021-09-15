import { combineReducers } from "redux";
import productReducer from "./actions/products/productReducer";

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;
