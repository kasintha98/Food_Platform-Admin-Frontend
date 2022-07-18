import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsNew = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getMenuItemsByRestroAndStore`, {
        params: {
          restaurantId: restaurantId ? restaurantId : "ALL",
          storeId: storeId ? storeId : "ALL",
        },
      });

      if (res && res.status === 200) {
        const productsList = {
          products: res.data,
        };
        console.log(productsList);

        dispatch({
          type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
          payload: productsList,
        });

        return res.data;
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMenuIngredientsByProductId = (id, restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getMenuIngredientsByMenuId`, {
        params: {
          productId: id,
          restaurantId: restaurantId ? restaurantId : "ALL",
          storeId: storeId ? storeId : "ALL",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_MENU_INGREDIENTS_BY_PRODUCT_ID_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllSections = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getAllSections`, {
        params: {
          restaurantId: restaurantId ? restaurantId : "ALL",
          storeId: storeId ? storeId : "ALL",
        },
      });

      if (res && res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_SECTIONS_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_ALL_SECTIONS_FAILURE,
          payload: [],
        });
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDishesBySection = (section, restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getDishesBySection`, {
        params: {
          section: section,
          restaurantId: restaurantId ? restaurantId : "ALL",
          storeId: storeId ? storeId : "ALL",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_DISHES_BY_SECTION_SUCCESS,
          payload: res.data,
        });
        //console.log(res.data);
        return res.data;
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
