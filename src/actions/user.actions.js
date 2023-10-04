import axios from "../helpers/axios";
import { userConstants, taxConstants } from "./constants";
import { resetCart } from "./cart.action";
import { toast } from "react-toastify";


const user = localStorage.getItem("user");
let userObj = {};
if (user) {
  userObj = JSON.parse(user)
}

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
export const getRoles = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_ROLES_REQUEST });

      const res = await axios.get(`/getAllRoles`,{
        params: {
          restaurantId: restaurantId,
        },
      });

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
export const getModules = (restaurantId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_MODULES_REQUEST });

      const res = await axios.get(`/getAllModule`,{
        params: {
          restaurantId: restaurantId,
          storeId:"ALL"
        },
      });

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
        dispatch(getRoles(user.restaurantId));
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

export const getUsersByRole = (roleCategory, restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USERS_BY_ROLE_REQUEST });

      const res = await axios.get(`/getUsersByRoleCategory`, {
        params: { restaurantId: restaurantId,
          roleCategory : roleCategory,
          storeId:storeId },
      });

      if (res.status === 200) {
        let filteredData = res.data;
        if (res.data && restaurantId) {
          filteredData = res.data.filter(function (el) {
            return el.restaurantId === restaurantId;
          });
        }

        if (res.data && storeId) {
          filteredData = res.data.filter(function (el) {
            return el.storeId === storeId;
          });
        }

        dispatch({
          type: userConstants.GET_USERS_BY_ROLE_SUCCESS,
          payload: filteredData,
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
        dispatch(getRoles(user.restaurantId));
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
        dispatch({ type: userConstants.ADD_USER_ORDER_SUCCESS });
        console.log(res);
        dispatch(resetCart());
        localStorage.removeItem("cart");
        localStorage.setItem("VERIFIED_OFFER", "N");
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
        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error from our end, Please try again!");
      return false;
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

export const GetCustomerAddress = (mobileNumber,restaurantId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_CUSTOMER_ADDRESS_REQUEST });
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (specialChars.test(mobileNumber)) {
        encodeURIComponent(mobileNumber);
      }

      const res = await axios.get("/getCustomerAddressDtlsByMobNum", {
        params: { restaurantId:restaurantId, mobno: mobileNumber },
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
        dispatch(GetCustomerAddress(payload.mobileNumber,user.restaurantId));

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

export const saveNewCoupon = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.SAVE_COUPON_REQUEST });

      const res = await axios.post(`/saveCoupon`, payload);

      if (res.status === 200) {
        dispatch({
          type: userConstants.SAVE_COUPON_SUCCESS,
          payload: res.data,
        });
        toast.success("Coupon saved successfully!");
        return res.data;
      } else {
        dispatch({
          type: userConstants.SAVE_COUPON_FAILURE,
          payload: { error: "Error saving data data!" },
        });
        toast.error("Failed to save coupon!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.SAVE_COUPON_FAILURE,
        payload: { error: "Error saving data!" },
      });
      toast.error("Failed to save coupon!");
    }
  };
};

export const updateCoupon = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.UPDATE_COUPON_REQUEST });

      const res = await axios.post(`/saveCoupon`, payload);

      if (res.status === 200) {
        dispatch({
          type: userConstants.UPDATE_COUPON_SUCCESS,
          payload: res.data,
        });
        toast.success("Coupon updated successfully!");
        return res.data;
      } else {
        dispatch({
          type: userConstants.UPDATE_COUPON_FAILURE,
          payload: { error: "Error saving data data!" },
        });
        toast.error("Failed to updated coupon!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.UPDATE_COUPON_FAILURE,
        payload: { error: "Error saving data!" },
      });
      toast.error("Failed to updated coupon!");
    }
  };
};

export const validateCoupon = (couponCode) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.VALIDATE_COUPON_REQUEST });

      const res = await axios.post("/validateCoupon", null, {
        params: { couponCode },
      });

      if (res.status === 200 && res.data) {
        if (res.data.validationResult === "VALID_COUPON") {
          dispatch({
            type: userConstants.VALIDATE_COUPON_SUCCESS,
            payload: res.data,
          });
          toast.success("Coupon applied successfully!");
          return res.data;
        } else {
          dispatch({
            type: userConstants.VALIDATE_COUPON_FAILURE,
            payload: null,
          });
          toast.error("Coupon not valid!");
        }
      } else {
        dispatch({
          type: userConstants.VALIDATE_COUPON_FAILURE,
          payload: null,
        });
        toast.error("There was an error!");
      }
    } catch (error) {
      dispatch({
        type: userConstants.VALIDATE_COUPON_FAILURE,
        payload: null,
      });
      toast.error("There was an error from our end, Please try again!");
    }
  };
};

export const clearCoupon = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.CLEAR_COUPON_SUCCESS });
    } catch (error) {
      dispatch({
        type: userConstants.CLEAR_COUPON_FAILURE,
      });
    }
  };
};

export const getAllCoupons = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_COUPONS_REQUEST });

      const res = await axios.get("/getCouponsByRestroAndStore", {
        params: { restaurantId, storeId },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.GET_COUPONS_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_COUPONS_FAILURE,
          payload: [],
        });
        toast.error("There was an error getting data!");
      }
    } catch (error) {
      dispatch({
        type: userConstants.GET_COUPONS_FAILURE,
        payload: [],
      });
      toast.error("There was an error getting data!");
    }
  };
};

//--------------  OFFER API CALL -------------
export const getOffersByStatusCall = (restaurantId,storeId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_OFFER_REQUEST });

      const res = await axios.get("/getOffersByStatus", {
        params: { restaurantId, storeId: storeId, status: "ACTIVE"},
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.GET_OFFER_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_OFFER_FAILURE,
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: userConstants.GET_OFFER_FAILURE,
        payload: null,
      });
    }
  };
};


export const performEOD = (restaurantId, storeId, loginId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.PERFORM_EOD_REQUEST });

      const res = await axios.post(`/performEndOfDay`, null, {
        params: {
          restaurantId,
          storeId,
          loginId,
        },
      });

      if (res.status === 200) {
        dispatch({
          type: userConstants.PERFORM_EOD_SUCCESS,
          payload: res.data,
        });
        toast.success(
          "End Of Day Performed! " + res.data ? res.data.result : ""
        );
        return res.data;
      } else {
        dispatch({
          type: userConstants.PERFORM_EOD_FAILURE,
          payload: { error: "Error when performing EOD! Please try again!" },
        });
        toast.error("Error when performing EOD! Please try again!");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.PERFORM_EOD_FAILURE,
        payload: { error: "Error when performing EOD! Please try again!" },
      });
      toast.error("Error when performing EOD! Please try again!");
    }
  };
};

export const getBusinessDate = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_BUSINESS_DATE_REQUEST });

      const res = await axios.get("/getBusinessDateByRestroAndStore", {
        params: { restaurantId, storeId },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.GET_BUSINESS_DATE_SUCCESS,
          payload: res.data,
        });
        toast.success("Business date fetched successfully!");
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_BUSINESS_DATE_FAILURE,
          payload: null,
        });
        toast.error("There was an error getting business date!");
      }
    } catch (error) {
      dispatch({
        type: userConstants.GET_BUSINESS_DATE_FAILURE,
        payload: null,
      });
      toast.error("There was an error getting business date!");
    }
  };
};

export const getAllBusinessDates = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_ALL_BUSINESS_DATES_REQUEST });

      const res = await axios.get("/getAllBusinessDates",{
        params: {
          restaurantId: restaurantId,
        },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.GET_ALL_BUSINESS_DATES_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_ALL_BUSINESS_DATES_FAILURE,
          payload: null,
        });
        toast.error("There was an error getting business dates!");
      }
    } catch (error) {
      dispatch({
        type: userConstants.GET_ALL_BUSINESS_DATES_FAILURE,
        payload: null,
      });
      toast.error("There was an error getting business dates!");
    }
  };
};

export const updateBusinessDate = (body) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.UPDATE_BUSINESS_DATE_REQUEST });

      const res = await axios.post("/updateBusinessDate", body);

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.UPDATE_BUSINESS_DATE_SUCCESS,
          payload: res.data,
        });
        dispatch(getAllBusinessDates(user.restaurantId));
        toast.success("Business date updated!");
        return res.data;
      } else {
        dispatch({
          type: userConstants.UPDATE_BUSINESS_DATE_FAILURE,
          payload: null,
        });
        toast.error("There was an error when updating business date!");
      }
    } catch (error) {
      dispatch({
        type: userConstants.UPDATE_BUSINESS_DATE_FAILURE,
        payload: null,
      });
      toast.error("There was an error when updating business date!");
    }
  };
};

export const GetDeliveryPrice = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getDeliveryConfigByCriteria", {
        params: {
          restaurantId: restaurantId,
          storeId: storeId,
          criteria: "AMOUNT",
        },
      });
      dispatch({ type: userConstants.GET_DELIVERY_PRICE_REQUEST });

      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: userConstants.GET_DELIVERY_PRICE_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_DELIVERY_PRICE_FAILURE,
          payload: { error },
        });
        toast.error("There was an error when getting data!");
      }
    } catch (error) {
      toast.error("There was an error when getting delivery data!");
      console.log(error);
    }
  };
};

export const SaveDeliveryPrice = (newdelivery) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.UPDATE_DELIVERY_PRICE_REQUEST });

      const res = await axios.post(
        `/saveDeliveryConfigByCriteria`,
        newdelivery
      );
      console.log("aaa res", res);
      if (res.status === 200) {
        dispatch({
          type: userConstants.UPDATE_DELIVERY_PRICE_SUCCESS,
          payload: res.data,
        });
        // dispatch(getAllStores());
        // toast.success("Delivery Chargers Update Successfully!");
      } else {
        dispatch({
          type: userConstants.UPDATE_DELIVERY_PRICE_FAILURE,
          payload: [],
        });
        toast.error("Error when updating delivery Chargers! Please try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPaymentModes = (restaurantId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_PAYMENT_MODES_REQUEST });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId, // 
          storeId: "ALL",
          criteria: "PAYMENT_MODE",
        },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.GET_PAYMENT_MODES_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_PAYMENT_MODES_FAILURE,
          payload: null,
        });
        toast.error("There was an error getting payment modes!");
      }
    } catch (error) {
      dispatch({
        type: userConstants.GET_PAYMENT_MODES_FAILURE,
        payload: null,
      });
      toast.error("There was an error getting payment modes!");
    }
  };
};

// export const getPaymentModes = (restaurantId) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: userConstants.GET_PAYMENT_MODES_REQUEST });

//       const res = await axios.get("/getPaymentModes",{
//         params: {
//           restaurantId: restaurantId,
//         },
//       });

//       if (res.status === 200 && res.data) {
//         dispatch({
//           type: userConstants.GET_PAYMENT_MODES_SUCCESS,
//           payload: res.data,
//         });
//         return res.data;
//       } else {
//         dispatch({
//           type: userConstants.GET_PAYMENT_MODES_FAILURE,
//           payload: null,
//         });
//         toast.error("There was an error getting payment modes!");
//       }
//     } catch (error) {
//       dispatch({
//         type: userConstants.GET_PAYMENT_MODES_FAILURE,
//         payload: null,
//       });
//       toast.error("There was an error getting payment modes!");
//     }
//   };
// };

export const getOrderSourceConfigDetails = (restaurantId, storeId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_ORDER_SOURCE_CONFIG_REQUEST });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId,
          storeId: "ALL",
          criteria: "ORDER_SOURCE",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_ORDER_SOURCE_CONFIG_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_ORDER_SOURCE_CONFIG_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_ORDER_SOURCE_CONFIG_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getPaymentModeConfigDetails = (restaurantId, storeId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_PAYMENT_MODE_CONFIG_REQUEST });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId, // 
          storeId: "ALL",
          criteria: "PAYMENT_MODE",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_PAYMENT_MODE_CONFIG_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_PAYMENT_MODE_CONFIG_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_PAYMENT_MODE_CONFIG_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getPaymentConfigDetailsCashierReport = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({
        type: userConstants.GET_PAYMENT_MODE_CASHIER_REPORT_CONFIG_REQUEST,
      });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId,
          storeId: "ALL",
          criteria: "PAYMENT_MODE_CASHIER_REPORT",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_PAYMENT_MODE_CASHIER_REPORT_CONFIG_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_PAYMENT_MODE_CASHIER_REPORT_CONFIG_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_PAYMENT_MODE_CASHIER_REPORT_CONFIG_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getOrderSourceConfigDetailsCashierReport = ( // STATIC-ROO1
  restaurantId,
  storeId
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: userConstants.GET_ORDER_SOURCE_CASHIER_REPORT_CONFIG_REQUEST,
      });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId,
          storeId: "ALL",
          criteria: "ORDER_SOURCE_CASHIER_REPORT",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: userConstants.GET_ORDER_SOURCE_CASHIER_REPORT_CONFIG_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_ORDER_SOURCE_CASHIER_REPORT_CONFIG_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_ORDER_SOURCE_CASHIER_REPORT_CONFIG_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getKDSTime = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_KDS_TIME_REQUEST });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId,
          storeId: "ALL",
          criteria: "KDS_REFRESH_TIME",
        },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: userConstants.GET_KDS_TIME_SUCCESS,
          payload: Number(res.data[0].configCriteriaValue) * 1000,
        });
        return res.data;
      } else {
        dispatch({
          type: userConstants.GET_KDS_TIME_FAILURE,
          payload: { error: "Error fetching KDS time config data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: userConstants.GET_KDS_TIME_FAILURE,
        payload: { error: "Error fetching KDS time config data!" },
      });
    }
  };
};
