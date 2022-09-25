import { reportConstants } from "../actions/constants";

const initState = {
  allReports: [],
  loading: false,
  error: null,
  reportTypes: [],
  reportByType: null,
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

    case reportConstants.GET_REPORT_TYPES_REQUEST:
      state = {
        ...state,
      };
      break;
    case reportConstants.GET_REPORT_TYPES_SUCCESS:
      state = {
        ...state,
        reportTypes: action.payload,
      };
      break;
    case reportConstants.GET_REPORT_TYPES_FAILURE:
      state = {
        ...state,
        reportTypes: action.payload.error,
      };
      break;

    case reportConstants.GET_REPORT_BY_TYPE_REQUEST:
      state = {
        ...state,
      };
      break;
    case reportConstants.GET_REPORT_BY_TYPE_SUCCESS:
      state = {
        ...state,
        reportByType: action.payload,
      };
      break;
    case reportConstants.GET_REPORT_BY_TYPE_FAILURE:
      state = {
        ...state,
        reportByType: action.payload.error,
      };
      break;
  }
  return state;
};
