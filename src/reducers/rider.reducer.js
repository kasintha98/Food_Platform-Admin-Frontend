import { riderConstants } from "../actions/constants";

const initState = {
  allLocations: [],
  location: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case riderConstants.GET_ALL_RIDER_LOCATION_REQUEST:
      state = {
        ...state,
      };
      break;
    case riderConstants.GET_ALL_RIDER_LOCATION_SUCCESS:
      state = {
        ...state,
        allLocations: action.payload,
      };
      break;
    case riderConstants.GET_ALL_RIDER_LOCATION_FAILURE:
      state = {
        ...state,
        allLocations: [],
      };
      break;
  }

  return state;
};
