import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsNew = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST,
      });

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
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
      });
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
      dispatch({
        type: productConstants.GET_DISHES_BY_SECTION_REQUEST,
      });

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
          payload: { res: res.data, section },
        });
        //console.log(res.data);
        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_DISHES_BY_SECTION_FAILURE,
        });
        console.log("error");
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_DISHES_BY_SECTION_FAILURE,
      });
      console.log(error);
    }
  };
};
export const getAllMenuIngredientsByRestoAndStoreId = (
  restaurantId,
  storeId
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_ALL_MENU_INGREDIENTS_REQUEST,
      });

      const res = await axios.get(`/getMenuIngredientsByRestoAndStoreId`, {
        params: {
          restaurantId: restaurantId ? restaurantId : "ALL",
          storeId: storeId ? storeId : "ALL",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_MENU_INGREDIENTS_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_ALL_MENU_INGREDIENTS_FAILURE,
        });
        console.log("error");
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_ALL_MENU_INGREDIENTS_FAILURE,
      });
      console.log(error);
    }
  };
};
