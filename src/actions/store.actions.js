import axios from "../helpers/axios";
import { storeConstants } from "./constants";

export const getAllStores = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getAllStores`);

      if (res.status === 200) {
        const filteredStores = res.data.filter(function (el) {
          return el.storeActiveFlag === "Y";
        });

        dispatch({
          type: storeConstants.GET_ALL_STORES_SUCCESS,
          payload: filteredStores,
        });
      } else {
        dispatch({
          type: storeConstants.GET_ALL_STORES_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
