import { authConstants } from "../actions/constants";

//initial state of user object
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    nic: "",
    gender: "",
    email: "",
    fullName: "",
    contactNumber: "",
    address: "",
    username: "",
    role: "",
    picture: "",
    loginId: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  errormsg: null,
  message: "",
  version: null,
};

//check what is the request and returning suitable state for the request
export default (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        errormsg: action.payload.errormsg,
        authenticate: false,
        authenticating: false,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        loading: false,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    case authConstants.GET_VERSION_REQUEST:
      state = {
        ...state,
      };
      break;
    case authConstants.GET_VERSION_SUCCESS:
      state = {
        ...state,
        version: action.payload,
      };
      break;
    case authConstants.GET_VERSION_FAILURE:
      state = {
        ...state,
      };
      break;
  }

  return state;
};
