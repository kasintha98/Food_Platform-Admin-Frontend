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
        restaurantId,
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
          restaurantId: restaurantId,
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
        restaurantId,
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
