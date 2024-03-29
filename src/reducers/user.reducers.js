import { userConstants, taxConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  errormsg: null,
  roles: [],
  modules: [],
  usersByRole: [],
  userRoleLoading: false,
  rolesWithModules: [],
  loadingRWM: false,
  configDetails: [],
  modulesForUser: [],
  orderStatus: [],
  taxDetails: null,
  customerAddress: [],
  currentCustomer: null,
  currentAddress: null,
  currentGetAddress: null,
  coupon: null,
  allCoupons: [],
  businessDate: null,
  allBusinessDates: [],
  deliveryPrice: null,
  paymentModes: [],
  orderSources: [],
  configPaymentModes: [],
  paymentModesForCashierReport: [],
  orderSourcesForCashierReport: [],
  kdsTime: 30000,
  saveOrderLoading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_SIGNUP_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_SIGNUP_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        errormsg: action.payload.errormsg,
      };
      break;
    case userConstants.GET_ROLES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_ROLES_SUCCESS:
      state = {
        ...state,
        loading: false,
        roles: action.payload,
      };
      break;
    case userConstants.GET_ROLES_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
        roles: [],
      };
      break;
    case userConstants.GET_MODULES_FOR_USER_REQUEST:
      state = {
        ...state,
      };
      break;
    case userConstants.GET_MODULES_FOR_USER_SUCCESS:
      state = {
        ...state,
        modulesForUser: action.payload,
      };
      break;
    case userConstants.GET_MODULES_FOR_USER_FAILURE:
      state = {
        ...state,
        error: action.payload,
        modulesForUser: [],
      };
      break;
    case userConstants.GET_CONFIG_DETAILS_REQUEST:
      state = {
        ...state,
      };
      break;
    case userConstants.GET_CONFIG_DETAILS_SUCCESS:
      state = {
        ...state,
        configDetails: action.payload,
      };
      break;
    case userConstants.GET_CONFIG_DETAILS_FAILURE:
      state = {
        ...state,
        error: action.payload,
        configDetails: [],
      };
      break;
    case userConstants.GET_MODULES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_MODULES_SUCCESS:
      state = {
        ...state,
        loading: false,
        modules: action.payload,
      };
      break;
    case userConstants.GET_MODULES_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
        modules: [],
      };
      break;
    case userConstants.GET_USERS_BY_ROLE_REQUEST:
      state = {
        ...state,
        userRoleLoading: true,
      };
      break;
    case userConstants.GET_USERS_BY_ROLE_SUCCESS:
      state = {
        ...state,
        usersByRole: action.payload,
        userRoleLoading: false,
      };
      break;
    case userConstants.GET_USERS_BY_ROLE_FAILURE:
      state = {
        ...state,
        userRoleLoading: false,
      };
      break;
    case userConstants.GET_ROLES_WITH_MODULE_REQUEST:
      state = {
        ...state,
        loadingRWM: true,
      };
      break;
    case userConstants.GET_ROLES_WITH_MODULE_SUCCESS:
      state = {
        ...state,
        loadingRWM: false,
        rolesWithModules: action.payload,
      };
      break;
    case userConstants.GET_ROLES_WITH_MODULE_FAILURE:
      state = {
        ...state,
        loadingRWM: false,
        rolesWithModules: [],
      };
      break;

    case userConstants.GET_ORDER_STATUS_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_ORDER_STATUS_SUCCESS:
      state = {
        ...state,
        orderStatus: action.payload,
      };
      break;

    case userConstants.GET_ORDER_STATUS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case taxConstants.GET_TAX_SUCCESS:
      state = {
        ...state,
        taxDetails: action.payload,
      };
      break;

    case userConstants.GET_CUSTOMER_ADDRESS_SUCCESS:
      state = {
        ...state,
        customerAddress: action.payload,
      };
      break;

    case userConstants.GET_CUSTOMER_ADDRESS_FAILURE:
      state = {
        ...state,
        customerAddress: [],
      };
      break;

    case userConstants.ADD_NEW_CUSTOMER_SUCCESS:
      state = {
        ...state,
        currentCustomer: action.payload,
      };
      break;

    case userConstants.ADD_NEW_CUSTOMER_FAILURE:
      state = {
        ...state,
        currentCustomer: null,
      };
      break;

    case userConstants.UPDATE_CUSTOMER_DETAILS_SUCCESS:
      state = {
        ...state,
        currentCustomer: action.payload,
      };
      break;

    case userConstants.UPDATE_CUSTOMER_DETAILS_FAILURE:
      state = {
        ...state,
        currentCustomer: null,
      };
      break;

    case userConstants.GET_CUSTOMER_DETAILS_SUCCESS:
      state = {
        ...state,
        currentCustomer: action.payload,
      };
      break;

    case userConstants.GET_CUSTOMER_DETAILS_FAILURE:
      state = {
        ...state,
        currentCustomer: null,
      };
      break;

    case userConstants.ADD_UPDATE_CUSTOMER_ADDRESS_SUCCESS:
      state = {
        ...state,
        currentAddress: action.payload,
      };
      break;

    case userConstants.ADD_UPDATE_CUSTOMER_ADDRESS_FAILURE:
      state = {
        ...state,
        currentAddress: null,
      };
      break;

    case userConstants.GET_CUSTOMER_ADDRESS_SUCCESS:
      state = {
        ...state,
        currentGetAddress: action.payload[0],
      };
      break;

    case userConstants.GET_CUSTOMER_ADDRESS_FAILURE:
      state = {
        ...state,
        currentGetAddress: null,
      };
      break;

    case userConstants.VALIDATE_COUPON_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.VALIDATE_COUPON_SUCCESS:
      state = {
        ...state,
        coupon: action.payload,
      };
      break;

    case userConstants.VALIDATE_COUPON_FAILURE:
      state = {
        ...state,
        coupon: null,
      };
      break;

    case userConstants.CLEAR_COUPON_SUCCESS:
      state = {
        ...state,
        coupon: null,
      };
      break;

    case userConstants.GET_COUPONS_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_COUPONS_SUCCESS:
      state = {
        ...state,
        allCoupons: action.payload,
      };
      break;

    case userConstants.GET_COUPONS_FAILURE:
      state = {
        ...state,
        allCoupons: [],
      };
      break;

    case userConstants.GET_BUSINESS_DATE_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_BUSINESS_DATE_SUCCESS:
      state = {
        ...state,
        businessDate: action.payload,
      };
      break;

    case userConstants.GET_BUSINESS_DATE_FAILURE:
      state = {
        ...state,
        businessDate: null,
      };
      break;

    case userConstants.GET_ALL_BUSINESS_DATES_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_ALL_BUSINESS_DATES_SUCCESS:
      state = {
        ...state,
        allBusinessDates: action.payload,
      };
      break;

    case userConstants.GET_ALL_BUSINESS_DATES_FAILURE:
      state = {
        ...state,
        allBusinessDates: [],
      };
      break;

    case userConstants.GET_DELIVERY_PRICE_SUCCESS:
      state = {
        ...state,
        deliveryPrice: action.payload,
      };
      break;

    case userConstants.GET_PAYMENT_MODES_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_PAYMENT_MODES_SUCCESS:
      state = {
        ...state,
        paymentModes: action.payload,
      };
      break;

    case userConstants.GET_PAYMENT_MODES_FAILURE:
      state = {
        ...state,
        paymentModes: [],
      };
      break;

    case userConstants.GET_ORDER_SOURCE_CONFIG_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_ORDER_SOURCE_CONFIG_SUCCESS:
      state = {
        ...state,
        orderSources: action.payload,
      };
      break;

      case userConstants.GET_OFFER_SUCCESS:
      state = {
        ...state,
        offersData: action.payload,
      };
      break;

    case userConstants.GET_ORDER_SOURCE_CONFIG_FAILURE:
      state = {
        ...state,
        orderSources: [],
      };
      break;

    case userConstants.GET_PAYMENT_MODE_CASHIER_REPORT_CONFIG_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_PAYMENT_MODE_CASHIER_REPORT_CONFIG_SUCCESS:
      state = {
        ...state,
        paymentModesForCashierReport: action.payload,
      };
      break;

    case userConstants.GET_PAYMENT_MODE_CASHIER_REPORT_CONFIG_FAILURE:
      state = {
        ...state,
        paymentModesForCashierReport: [],
      };
      break;

    case userConstants.GET_ORDER_SOURCE_CASHIER_REPORT_CONFIG_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_ORDER_SOURCE_CASHIER_REPORT_CONFIG_SUCCESS:
      state = {
        ...state,
        orderSourcesForCashierReport: action.payload,
      };
      break;

    case userConstants.GET_ORDER_SOURCE_CASHIER_REPORT_CONFIG_FAILURE:
      state = {
        ...state,
        orderSourcesForCashierReport: [],
      };
      break;

    case userConstants.GET_PAYMENT_MODE_CONFIG_REQUEST:
      state = {
        ...state,
      };
      break;

    case userConstants.GET_PAYMENT_MODE_CONFIG_SUCCESS:
      state = {
        ...state,
        configPaymentModes: action.payload,
      };
      break;

    case userConstants.GET_PAYMENT_MODE_CONFIG_FAILURE:
      state = {
        ...state,
        configPaymentModes: [],
      };
      break;

    case userConstants.GET_KDS_TIME_SUCCESS:
      state = {
        ...state,
        kdsTime: action.payload,
      };
      break;

    case userConstants.ADD_USER_ORDER_REQUEST:
      state = {
        ...state,
        saveOrderLoading: true,
      };
      break;

    case userConstants.ADD_USER_ORDER_SUCCESS:
      state = {
        ...state,
        saveOrderLoading: false,
      };
      break;

    case userConstants.ADD_USER_ORDER_FAILURE:
      state = {
        ...state,
        saveOrderLoading: false,
      };
      break;
  }

  return state;
};
