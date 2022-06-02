import { reportConstants } from "../actions/constants";

const initState = {
  allReports: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case reportConstants.GET_ALL_REPORTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case reportConstants.GET_ALL_REPORTS_SUCCESS:
      state = {
        ...state,
        allReports: action.payload,
        loading: false,
      };
      break;
    case reportConstants.GET_ALL_REPORTS_FAILURE:
      state = {
        ...state,
        allReports: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
