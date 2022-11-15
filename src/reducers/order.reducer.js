import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
  allOrders: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload,
        loading: false,
      };
      break;
    case orderConstants.GET_CUSTOMER_ORDER_FAILURE:
      state = {
        ...state,
        loading: false,
      };
      break;

    case orderConstants.GET_CUSTOMER_ORDER_SILENT_SUCCESS:
      state = {
        ...state,
        orders: action.payload,
      };
      break;

    case orderConstants.GET_ALL_ORDER_REQUEST:
      state = {
        ...state,
      };
      break;
    case orderConstants.GET_ALL_ORDER_SUCCESS:
      state = {
        ...state,
        allOrders: action.payload,
      };
      break;
    case orderConstants.GET_ALL_ORDER_FAILURE:
      state = {
        ...state,
      };
      break;
  }
  return state;
};
