import axios from "../helpers/axios";
import { orderConstants } from "./constants";
import { toast } from "react-toastify";

//action to get customer orders from the database
export const getCustomerOrders = (
  restaurantId,
  storeId,
  orderStatus,
  orderReceivedDate,
  orderId,
  deliveryUserId,
  orderDeliveryType,
  foodPackagedFlag
) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
    try {
      const body = {
        restaurantId,
        storeId,
        orderStatus,
        orderReceivedDate,
        orderId,
        deliveryUserId,
        orderDeliveryType,
        foodPackagedFlag,
      };

      console.log(body);

      const res = await axios.post("/queryOrderViewByParams", body);

      if (res.status === 200) {
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: res.data,
        });
        dispatch(getAllOrders(orderReceivedDate));
        return res.data;
      } else {
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
          payload: res.data,
        });
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to get all orders from the database
export const getAllOrders = (orderReceivedDate) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ALL_ORDER_REQUEST });
    try {
      const body = {
        orderReceivedDate,
      };

      const res = await axios.post("/queryOrderViewByParams", body);

      if (res.status === 200) {
        dispatch({
          type: orderConstants.GET_ALL_ORDER_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: orderConstants.GET_ALL_ORDER_FAILURE,
          payload: res.data,
        });
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to update order status
export const updateOrder = (orderId, orderStatus, tabType, hideToast) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });

    try {
      const res = await axios.post("/updateStatusByOrderId", null, {
        params: {
          orderId,
          orderStatus,
        },
      });

      const today = new Date();

      if (res.status === 200) {
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS,
        });

        if (tabType) {
          dispatch(
            getCustomerOrders(
              null,
              null,
              tabType,
              `${today.getFullYear()}-${
                today.getMonth() + 1
              }-${today.getDate()}`
            )
          );
        }

        if (!hideToast) {
          toast.success("Order status updated successfully!");
        }

        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to update order sub prod status status
export const updateOrderSubProdStatus = (
  orderId,
  productId,
  subProductId,
  orderStatus,
  tabType,
  isAutoSubProductUpdate
) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_SUBPROD_STATUS_REQUEST });

    try {
      const res = await axios.post(
        "/updateOrderDetailsStatusBySubProductId",
        null,
        {
          params: {
            orderId,
            productId,
            subProductId,
            status: orderStatus,
          },
        }
      );

      if (res.status === 200) {
        dispatch({
          type: orderConstants.UPDATE_ORDER_SUBPROD_STATUS_SUCCESS,
        });

        if (!isAutoSubProductUpdate) {
          toast.success("Order item status updated successfully!");
        }

        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_ORDER_SUBPROD_STATUS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrderDeliBoy = (orderId, deliveryUser) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_DELI_BOY_REQUEST });

    try {
      const res = await axios.post("/updateDeliveryUserByOrderId", null, {
        params: {
          orderId,
          deliveryUser,
        },
      });

      if (res.status === 200) {
        dispatch({
          type: orderConstants.UPDATE_ORDER_DELI_BOY_SUCCESS,
        });

        const today = new Date();
        dispatch(
          getCustomerOrders(
            null,
            null,
            null,
            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            null,
            null,
            "DELIVERY"
          )
        );

        toast.success("Order delivery boy updated successfully!");

        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_ORDER_DELI_BOY_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateFoodPackagedFlag = (orderId, foodPackagedFlag) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_SUBPROD_STATUS_REQUEST });
    try {
      const res = await axios.post("/updateFoodPackagedFlagByOrderId", null, {
        params: { orderId, foodPackagedFlag },
      });

      if (res.status === 200) {
        dispatch({
          type: orderConstants.UPDATE_ORDER_SUBPROD_STATUS_SUCCESS,
          payload: res.data,
        });
        toast.success("Food package released successfully!");
        return res.data;
      } else {
        dispatch({
          type: orderConstants.UPDATE_ORDER_SUBPROD_STATUS_FAILURE,
          payload: res.data,
        });
        toast.success("Error please try again!!");
        return false;
      }
    } catch (error) {
      toast.success("Error please try again!!");
      console.log(error);
    }
  };
};
