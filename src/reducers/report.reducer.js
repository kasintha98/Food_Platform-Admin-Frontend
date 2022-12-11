import { reportConstants } from "../actions/constants";

const initState = {
  allReports: [],
  loading: false,
  error: null,
  reportTypes: [],
  reportByType: null,
  salesSummeryByDateList: {},
  salesSummeryByOrderSource: {},
  salesSummeryByPaymentMode: [],
  dashboardSummaryReport: {},
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

    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_DATE_LIST_REQUEST:
      state = {
        ...state,
      };
      break;
    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_DATE_LIST_SUCCESS:
      state = {
        ...state,
        salesSummeryByDateList: action.payload,
      };
      break;
    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_DATE_LIST_FAILURE:
      state = {
        ...state,
        salesSummeryByDateList: {},
      };
      break;

    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_ORDER_SOURCE_REQUEST:
      state = {
        ...state,
      };
      break;
    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_ORDER_SOURCE_SUCCESS:
      state = {
        ...state,
        salesSummeryByOrderSource: action.payload,
      };
      break;
    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_ORDER_SOURCE_FAILURE:
      state = {
        ...state,
        salesSummeryByOrderSource: [],
      };
      break;

    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_PAYMENT_MODE_REQUEST:
      state = {
        ...state,
      };
      break;
    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_PAYMENT_MODE_SUCCESS:
      state = {
        ...state,
        salesSummeryByPaymentMode: action.payload,
      };
      break;
    case reportConstants.GET_REPORT_SALES_SUMMARY_BY_PAYMENT_MODE_FAILURE:
      state = {
        ...state,
        salesSummeryByPaymentMode: [],
      };
      break;
    case reportConstants.GET_REPORT_DASHBOARD_SUMMARY_SUCCESS:
      state = {
        ...state,
        dashboardSummaryReport: action.payload,
      };
      break;
    case reportConstants.GET_REPORT_DASHBOARD_SUMMARY_FAILURE:
      state = {
        ...state,
        dashboardSummaryReport: {},
      };
        break;
  }
  return state;
};
