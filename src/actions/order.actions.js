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
  foodPackagedFlag,
  orderReceivedFromDate,
  orderSource,
  descending
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
        orderReceivedFromDate:
          orderReceivedFromDate === orderReceivedDate
            ? null
            : orderReceivedFromDate,
        orderSource,
        descending,
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
export const updateOrder = (
  orderId,
  orderStatus,
  tabType,
  hideToast,
  updatedBy
) => {
  return async (dispatch) => {
    //const businessDateAll = useSelector((state) => state.user.businessDate);

    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });

    try {
      const res = await axios.post("/updateStatusByOrderId", null, {
        params: {
          orderId,
          orderStatus,
          updatedBy,
        },
      });

      const today =
        new Date(/* businessDateAll && businessDateAll.businessDate */);

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
  isAutoSubProductUpdate,
  updatedBy
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
            updatedBy,
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

export const updateOrderDeliBoy = (orderId, deliveryUser, updatedBy) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_DELI_BOY_REQUEST });

    try {
      const res = await axios.post("/updateDeliveryUserByOrderId", null, {
        params: {
          orderId,
          deliveryUser,
          updatedBy,
        },
      });

      if (res.status === 200) {
        dispatch({
          type: orderConstants.UPDATE_ORDER_DELI_BOY_SUCCESS,
        });

        //const businessDateAll = useSelector((state) => state.user.businessDate);

        const today =
          new Date(/* businessDateAll && businessDateAll.businessDate */);
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

export const updateFoodPackagedFlag = (
  orderId,
  foodPackagedFlag,
  updatedBy
) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_SUBPROD_STATUS_REQUEST });
    try {
      const res = await axios.post("/updateFoodPackagedFlagByOrderId", null, {
        params: { orderId, foodPackagedFlag, updatedBy },
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

export const updateOrderPaymentAndStatus = (
  orderId,
  paymentMode,
  paymentStatus,
  orderStatus,
  tabType,
  updatedBy
) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_STATUS_PAYMENT_ORDER_REQUEST });

    try {
      const res = await axios.post("/updatePaymentModeByOrderId", null, {
        params: {
          orderId,
          paymentMode,
          paymentStatus,
          orderStatus,
          updatedBy,
        },
      });

      //const businessDateAll = useSelector((state) => state.user.businessDate);
      const today =
        new Date(/* businessDateAll && businessDateAll.businessDate */);

      if (res.status === 200) {
        dispatch({
          type: orderConstants.UPDATE_STATUS_PAYMENT_ORDER_SUCCESS,
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
        toast.success("Order updated successfully!");

        return res.data;
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_STATUS_PAYMENT_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error when updating please try again!");
    }
  };
};

export const updateFoodPackagedFlagByItem = (
  orderId,
  productId,
  subProductId,
  foodPackagedFlag,
  updatedBy
) => {
  return async (dispatch) => {
    dispatch({
      type: orderConstants.UPDATE_FOOD_PACKAGED_FLAG_BY_ITEM_REQUEST,
    });
    try {
      const res = await axios.post(
        "/updateFoodPackagedFlagForOrderItem",
        null,
        {
          params: {
            orderId,
            productId,
            subProductId,
            foodPackagedFlag,
            updatedBy,
          },
        }
      );

      if (res.status === 200) {
        dispatch({
          type: orderConstants.UPDATE_FOOD_PACKAGED_FLAG_BY_ITEM_SUCCESS,
          payload: res.data,
        });
        toast.success("Food package released successfully!");
        return res.data;
      } else {
        dispatch({
          type: orderConstants.UPDATE_FOOD_PACKAGED_FLAG_BY_ITEM_FAILURE,
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
