import { storeConstants } from "../actions/constants";

const initState = {
  stores: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case storeConstants.GET_ALL_STORES_SUCCESS:
      state = {
        ...state,
        stores: action.payload,
        loading: false,
      };
      break;
    case storeConstants.GET_ALL_STORES_FAILURE:
      state = {
        ...state,
        stores: action.payload.error,
        loading: false,
      };
      break;
    case storeConstants.ADD_STORES_SUCCESS:
      state = {
        ...state,
        // stores: [...state.stores, action.payload],
        store: action.payload,
        loading: false,
      };
      break;
    case storeConstants.ADD_STORES_FAILURE:
      state = {
        ...state,
        store: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
