// src/redux/actions/cartActions.js

import axios from "axios";
import {
  ADD_TO_CART_ERROR,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  DELETE_CART_ITEM_ERROR,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  FETCH_ITEMS_ERROR,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  SET_CART_LENGTH,
  UPDATE_CART_ITEM_ERROR,
  UPDATE_CART_ITEM_QUANTITY,
  UPDATE_ITEM_QUANTITY
} from "./ActionType";

// Action Creators for Cart

export const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST
});

export const fetchItemsSuccess = items => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: items
});

export const fetchItemsError = error => ({
  type: FETCH_ITEMS_ERROR,
  payload: error
});

export const addToCartRequest = ({ item, quantity }) => ({
  type: ADD_TO_CART_REQUEST,
  payload: { item, quantity }
});

export const addToCartSuccess = ({ item, quantity }) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: { item, quantity }
});

export const addToCartError = error => ({
  type: ADD_TO_CART_ERROR,
  payload: error
});

// Action Creators for Updating Cart Item Quantity
export const updateItemQuantityRequest = (itemId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { itemId, quantity }
});

export const updateItemQuantitySuccess = (item, quantity) => (
  console.log(item, quantity),
  {
  type: UPDATE_ITEM_QUANTITY,
  payload: { item, quantity }
});

export const updateItemQuantityFailure = error => ({
  type: UPDATE_CART_ITEM_ERROR,
  payload: error
});

export const deleteCartItemRequest = itemId => ({
  type: DELETE_CART_ITEM_REQUEST,
  payload: itemId
});

export const deleteCartItemSuccess = itemId => ({
  type: DELETE_CART_ITEM_SUCCESS,
  payload: itemId
});

export const deleteCartItemError = error => ({
  type: DELETE_CART_ITEM_ERROR,
  payload: error
});

export const fetchData = () => {
  return async dispatch => {
    dispatch(fetchItemsRequest());
    try {
      const response = await axios.get("http://localhost:3000/products");
      dispatch(fetchItemsSuccess(response.data));
    } catch (error) {
      dispatch(fetchItemsError(error));
    }
  };
};

export const deleteCartItem = itemId => async dispatch => {
  dispatch(deleteCartItemRequest(itemId));
  try {
    await axios.delete(`http://localhost:3000/cart/${itemId}`);
    dispatch(deleteCartItemSuccess(itemId));
  } catch (error) {
    dispatch(deleteCartItemError(error));
  }
};
