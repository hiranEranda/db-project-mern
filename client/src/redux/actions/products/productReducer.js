import {
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_REQ,
  FETCH_PRODUCTS_SUCCESS,
} from "./types";

const initialState = {
  products: {
    loading: false,
    products: [],
    error: "",
  },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQ:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: "",
      };
    case FETCH_PRODUCTS_FAIL:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
