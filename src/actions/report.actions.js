import axios from "../helpers/axios";
import { reportConstants } from "./constants";

export const getAllReports = (
  restaurantId,
  storeId,
  fromDate,
  toDate,
  reportName
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: reportConstants.GET_ALL_REPORTS_REQUEST });

      const reqBody = {
        restaurantId: "R001",
        storeId,
        fromDate,
        toDate,
        reportName,
      };

      console.log(reqBody);

      const res = await axios.post(`/getReports`, reqBody);

      if (res.status === 200) {
        dispatch({
          type: reportConstants.GET_ALL_REPORTS_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: reportConstants.GET_ALL_REPORTS_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: reportConstants.GET_ALL_REPORTS_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getReportTypes = (restaurantId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: reportConstants.GET_REPORT_TYPES_REQUEST });

      const res = await axios.get("/getConfigDetailsByCriteria", {
        params: {
          restaurantId: "R001",
          storeId: "ALL",
          criteria: "REPORTS",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: reportConstants.GET_REPORT_TYPES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: reportConstants.GET_REPORT_TYPES_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: reportConstants.GET_REPORT_TYPES_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getReportByType = (
  restaurantId,
  storeId,
  fromDate,
  toDate,
  reportName
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: reportConstants.GET_REPORT_BY_TYPE_REQUEST });

      const reqBody = {
        restaurantId: "R001",
        storeId,
        fromDate,
        toDate,
        reportName,
      };

      console.log(reqBody);

      const res = await axios.post(`/getReports`, reqBody);

      if (res.status === 200) {
        dispatch({
          type: reportConstants.GET_REPORT_BY_TYPE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: reportConstants.GET_REPORT_BY_TYPE_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: reportConstants.GET_REPORT_BY_TYPE_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getSalesSummeryByDateListReports = (
  restaurantId,
  storeId,
  fromDate,
  toDate
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_DATE_LIST_REQUEST,
      });

      const reqBody = {
        restaurantId: "R001",
        storeId,
        fromDate,
        toDate,
        reportName: "SALES_SUMMARY_BY_DATE_LIST",
      };

      console.log(reqBody);

      const res = await axios.post(`/getReports`, reqBody);

      if (res.status === 200 && res.data) {
        dispatch({
          type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_DATE_LIST_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_DATE_LIST_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_DATE_LIST_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getSalesSummeryByOrderSourceReports = (
  restaurantId,
  storeId,
  fromDate,
  toDate
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_ORDER_SOURCE_REQUEST,
      });

      const reqBody = {
        restaurantId: "R001",
        storeId,
        fromDate,
        toDate,
        reportName: "SALES_SUMMARY_BY_ORDER_SOURCE",
      };

      console.log(reqBody);

      const res = await axios.post(`/getReports`, reqBody);

      if (res.status === 200) {
        dispatch({
          type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_ORDER_SOURCE_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_ORDER_SOURCE_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_ORDER_SOURCE_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getSalesSummeryByPaymentModeReports = (
  restaurantId,
  storeId,
  fromDate,
  toDate
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_PAYMENT_MODE_REQUEST,
      });

      const reqBody = {
        restaurantId: "R001",
        storeId,
        fromDate,
        toDate,
        reportName: "SALES_SUMMARY_BY_PAYMENT_MODE",
      };

      console.log(reqBody);

      const res = await axios.post(`/getReports`, reqBody);

      if (res.status === 200) {
        dispatch({
          type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_PAYMENT_MODE_SUCCESS,
          payload: res.data.salesSummeryByPaymentMode,
        });

        return res.data.salesSummeryByPaymentMode;
      } else {
        dispatch({
          type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_PAYMENT_MODE_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: reportConstants.GET_REPORT_SALES_SUMMARY_BY_PAYMENT_MODE_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};
