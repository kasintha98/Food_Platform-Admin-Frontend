import { userConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  errormsg: null,
  roles: [],
  modules: [],
  usersByRole: [],
  userRoleLoading: false,
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
  }

  return state;
};
