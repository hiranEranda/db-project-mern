import axios from "axios";

import {
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_REQ,
  FETCH_PRODUCTS_SUCCESS,
} from "./types";

export const fetchProductsReq = () => {
  return {
    type: FETCH_PRODUCTS_REQ,
  };
};

export const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProductsFail = (error) => {
  return {
    type: FETCH_PRODUCTS_FAIL,
    payload: error,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsReq);
    axios("http://localhost:5000/api/products/all")
      .then((res) => {
        console.log(res.data);
        const products = res.data;
        dispatch(fetchProductsSuccess(products));
      })
      .catch((e) => {
        const errorMsg = e.message;
        dispatch(fetchProductsFail(errorMsg));
      });
  };
};
