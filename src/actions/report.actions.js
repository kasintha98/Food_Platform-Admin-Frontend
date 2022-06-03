import axios from "../helpers/axios";
import { reportConstants } from "./constants";

export const getAllReports = (restaurantId, storeId, fromDate, toDate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: reportConstants.GET_ALL_REPORTS_REQUEST });

      const reqBody = {
        restaurantId,
        storeId,
        fromDate,
        toDate,
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
