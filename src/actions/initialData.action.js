import axios from "../helpers/axios";
import {
  categoryConstants,
  productConstants,
  orderConstants,
} from "./constants";

//get all categories, products and orders initially after login
export const getInitialData = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/initialData");

      if (res.status === 200) {
        const { categories, products, orders } = res.data;
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories },
        });
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
};
