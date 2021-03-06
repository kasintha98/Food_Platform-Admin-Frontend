import axios from "../helpers/axios";
import { userConstants, taxConstants } from "./constants";
import { resetCart } from "./cart.action";
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

export const getConfigDetails = (restaurantId, storeId, criteria) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_CONFIG_DETAILS_REQUEST });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId,
          storeId,
          criteria,
        },
      });

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_CONFIG_DETAILS_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_CONFIG_DETAILS_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_CONFIG_DETAILS_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const addConfigDetails = (configDetails) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.ADD_CONFIG_DETAILS_REQUEST });

      const res = await axios.post(
        `/addConfigDetailsByCriteria`,
        configDetails
      );

      if (res.status === 200) {
        dispatch({
          type: userConstants.ADD_CONFIG_DETAILS_SUCCESS,
          payload: res.data,
        });
        /* dispatch(
          getConfigDetails(
            configDetails.restaurantId,
            configDetails.storeId,
            "ORDER_SOURCE"
          )
        ); */
        toast.success("Order source added successfully!");
        return res.data;
      } else {
        dispatch({
          type: userConstants.ADD_CONFIG_DETAILS_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.ADD_CONFIG_DETAILS_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getModulesForUser = (restaurantId, storeId, roleCategory) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_MODULES_FOR_USER_REQUEST });

      const res = await axios.get(`/getRoleWithModuleAccess`, {
        params: { restaurantId, storeId, roleCategory },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.GET_MODULES_FOR_USER_SUCCESS,
          payload: res.data[0].modules,
        });
      } else {
        dispatch({
          type: userConstants.GET_MODULES_FOR_USER_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_MODULES_FOR_USER_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const GetOrderProcessStatus2 = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getOrderProcessingDetailsByOrderId", {
        params: { orderId: id },
      });
      dispatch({ type: userConstants.GET_ORDER_STATUS_REQUEST });

      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: userConstants.GET_ORDER_STATUS_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_ORDER_STATUS_FAILURE,
          payload: { error },
        });
        toast.error("There was an error when getting order status data!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetTaxDetails = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getTaxDetailsByRestroAndStore", {
        params: { restaurantId: restaurantId, storeId: storeId },
      });
      dispatch({ type: taxConstants.GET_TAX_REQUEST });

      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: taxConstants.GET_TAX_SUCCESS,
          payload: res.data,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: taxConstants.GET_TAX_FAILURE,
          payload: { error },
        });
        toast.error("There was an error when getting data!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add new order
export const saveNewOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/saveNewOrder", payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });

      if (res.status === 200 && res.data) {
        console.log(res);
        dispatch(resetCart());
        localStorage.removeItem("cart");
        //dispatch(getCartItems());
        toast.success("Order Placed Successfully!");
        return res;
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
        toast.error("There was an error!");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error from our end, Please try again!");
    }
  };
};

export const addNewCustomer = (mobileNumber) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.ADD_NEW_CUSTOMER_REQUEST });

      const res = await axios.get("/customer/register", {
        params: { mobno: mobileNumber },
      });

      if (res.data) {
        dispatch({
          type: userConstants.ADD_NEW_CUSTOMER_SUCCESS,
          payload: res.data,
        });

        toast.success("New Customer Saved!");
        return res.data;
      } else {
        dispatch({
          type: userConstants.ADD_NEW_CUSTOMER_FAILURE,
          payload: { errormsg: res.data.errormsg },
        });
        toast.error(res.data.errormsg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCustomerDetails = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: userConstants.UPDATE_CUSTOMER_DETAILS_REQUEST,
      });

      const res = await axios.put("/customer/update", payload);

      if (res.status === 200) {
        const { id, firstName, lastName, emailId, mobileNumber } = res.data;

        dispatch({
          type: userConstants.UPDATE_CUSTOMER_DETAILS_SUCCESS,
          payload: res.data,
        });

        toast.success("Details updated successfully!");
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.UPDATE_CUSTOMER_DETAILS_FAILURE,
          payload: { error },
        });

        toast.error("There was an error please try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error please try again!");
    }
  };
};

export const GetCustomerAddress = (mobileNumber) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_CUSTOMER_ADDRESS_REQUEST });
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (specialChars.test(mobileNumber)) {
        encodeURIComponent(mobileNumber);
      }

      const res = await axios.get("/getCustomerAddressDtlsByMobNum", {
        params: { mobno: mobileNumber },
      });

      if (res.status === 200) {
        console.log(res);

        const filteredAddresses = res.data.filter(function (el) {
          return el.active === "Y";
        });

        dispatch({
          type: userConstants.GET_CUSTOMER_ADDRESS_SUCCESS,
          payload: res.data.filter(function (el) {
            return el.active === "Y";
          }),
        });

        if (filteredAddresses && filteredAddresses.length > 0) {
          toast.success("Existing address found for this number!");
        } else {
          toast.warning(
            "No address added for this number, Please add a new address!"
          );
        }

        return filteredAddresses;
      } else {
        const { error } = res.data;
        toast.error("No address found for this number!");
        dispatch({
          type: userConstants.GET_CUSTOMER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      toast.error("No address found for this number!");
      console.log(error);
    }
  };
};

export const AddUpdateCustomerAddress = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.ADD_UPDATE_CUSTOMER_ADDRESS_REQUEST });

      const res = await axios.post("/saveCustomerDtls", payload);

      if (res.status === 200) {
        dispatch(GetCustomerAddress(payload.mobileNumber));

        dispatch({
          type: userConstants.ADD_UPDATE_CUSTOMER_ADDRESS_SUCCESS,
          payload,
        });

        console.log(res);
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_UPDATE_CUSTOMER_ADDRESS_FAILURE,
          payload: { error },
        });

        toast.error("There was an error adding new address!");
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error adding new address!");
    }
  };
};

export const GetCustomerDetails = (mobileNumber) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_CUSTOMER_DETAILS_REQUEST });
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (specialChars.test(mobileNumber)) {
        encodeURIComponent(mobileNumber);
      }
      const res = await axios.get("/getCustomerDtlsByMobNum", {
        params: { mobno: mobileNumber },
      });

      if (res.status === 200) {
        console.log(res);

        dispatch({
          type: userConstants.GET_CUSTOMER_DETAILS_SUCCESS,
          payload: res.data,
        });

        if (res.data) {
          toast.success("Existing user found for this number!");
        } else {
          toast.warning("No user found for this number!");
        }

        return res.data;
      } else {
        const { error } = res.data;
        toast.error("No user found for this number!");
        dispatch({
          type: userConstants.GET_CUSTOMER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      toast.error("There was an error adding new address!");
      console.log(error);
    }
  };
};
