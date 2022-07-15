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
  }

  return state;
};
