import axios from "../helpers/axios";
import { userConstants } from "./constants";
import { toast } from "react-toastify";

//action to signup
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_SIGNUP_REQUEST });
    //post request from front end to signin with the data from frontend
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    //if respond is 201 (user successfully signup)
    if (res.status === 201) {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_SIGNUP_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_SIGNUP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

//action get roles
export const getRoles = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_ROLES_REQUEST });

      const res = await axios.get(`/getAllRoles`);

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_ROLES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: userConstants.GET_ROLES_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_ROLES_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

//action get modules
export const getModules = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_MODULES_REQUEST });

      const res = await axios.get(`/getAllModule`);

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_MODULES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: userConstants.GET_MODULES_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_MODULES_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

//action save modules
export const saveRoleWithModules = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.SAVE_ROLE_WITH_MODULES_REQUEST });

      const res = await axios.post(`/saveNewRoleWithModuleAccess`, payload);

      if (res.status === 200) {
        dispatch({
          type: userConstants.SAVE_ROLE_WITH_MODULES_SUCCESS,
          payload: res.data,
        });
        toast.success("Role saved successfully!");
        dispatch(getRoles());
        return true;
      } else {
        dispatch({
          type: userConstants.SAVE_ROLE_WITH_MODULES_FAILURE,
          payload: { error: "Error saving data data!" },
        });
        toast.success("Failed to save role successfully!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.SAVE_ROLE_WITH_MODULES_FAILURE,
        payload: { error: "Error saving data!" },
      });
      toast.success("Failed to save role successfully!");
    }
  };
};

export const getUsersByRole = (roleCategory) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USERS_BY_ROLE_REQUEST });

      const res = await axios.get(`/getUsersByRoleCategory`, {
        params: { roleCategory },
      });

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_USERS_BY_ROLE_SUCCESS,
          payload: res.data,
        });
        return true;
      } else {
        dispatch({
          type: userConstants.GET_USERS_BY_ROLE_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_USERS_BY_ROLE_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};
