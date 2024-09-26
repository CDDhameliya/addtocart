import {
  UPDATE_ITEM_QUANTITY,
  FETCH_ITEMS_ERROR,
  FETCH_ITEMS_SUCCESS,
  DELETE_CART_ITEM_SUCCESS,
  FETCH_ITEMS_REQUEST,
  ADD_TO_CART_SUCCESS,
  SET_CART_LENGTH,
  UPDATE_CART_ITEM_QUANTITY, // New action type
  UPDATE_CART_ITEM_ERROR // New action type
} from "./ActionType";

const initialState = {
  cart: [],
  error: null,
  cartLength: 0, // Add cartLength to initial state
  loading: false
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload
      };
    case FETCH_ITEMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(
          item =>
            item.id === action.payload.itemId
              ? { ...item, quantity: action.payload.quantity }
              : item
        )
      };
    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case SET_CART_LENGTH:
      return {
        ...state,
        cartLength: action.payload
      };
    case UPDATE_CART_ITEM_QUANTITY: // New case for handling quantity updates
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case UPDATE_CART_ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
