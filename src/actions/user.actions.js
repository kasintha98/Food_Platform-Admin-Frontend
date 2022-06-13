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
        toast.error("Failed to save role!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.SAVE_ROLE_WITH_MODULES_FAILURE,
        payload: { error: "Error saving data!" },
      });
      toast.error("Failed to save role!");
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

export const getRoleWithModuleAccess = (
  restaurantId,
  storeId,
  roleCategory
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_ROLES_WITH_MODULE_REQUEST });

      const res = await axios.get(`/getRoleWithModuleAccess`, {
        params: { restaurantId, storeId, roleCategory },
      });

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_ROLES_WITH_MODULE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: userConstants.GET_ROLES_WITH_MODULE_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_ROLES_WITH_MODULE_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const deleteRoleWithModuleAccess = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.DELETE_ROLE_WITH_MODULES_REQUEST });

      const res = await axios.post(`/deleteRoleWithModuleAccess`, payload);

      if (res.status === 200) {
        dispatch({
          type: userConstants.DELETE_ROLE_WITH_MODULES_SUCCESS,
          payload: res.data,
        });
        toast.success("Role deleted successfully!");
        dispatch(getRoles());
        return true;
      } else {
        dispatch({
          type: userConstants.DELETE_ROLE_WITH_MODULES_FAILURE,
          payload: { error: "Error deleting data!" },
        });
        toast.error("Failed to delete role!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.DELETE_ROLE_WITH_MODULES_FAILURE,
        payload: { error: "Error saving data!" },
      });
      toast.error("Failed to delete role!");
    }
  };
};
