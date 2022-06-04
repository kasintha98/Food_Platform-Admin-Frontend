import axios from "../helpers/axios";
import { orderConstants } from "./constants";
import { toast } from "react-toastify";

//action to get customer orders from the database
export const getCustomerOrders = (
  restaurantId,
  storeId,
  orderStatus,
  orderReceivedDate
) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
    try {
      const body = {
        restaurantId,
        storeId,
        orderStatus,
        orderReceivedDate,
      };

      const res = await axios.post("/queryOrderViewByParams", body);

      if (res.status === 200) {
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: res.data,
        });
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

//action to update order status
export const updateOrder = (orderId, orderStatus, tabType) => {
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

        dispatch(
          getCustomerOrders(
            null,
            null,
            tabType,
            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
          )
        );

        toast.success("Order status updated successfully!");
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
