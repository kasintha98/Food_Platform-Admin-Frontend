import axios from "../helpers/axios";
import { productConstants } from "./constants";
import { toast } from "react-toastify";

const pizzaSort = [
  "Taste of India",
  "Simply Veg 2",
  "Simply Veg 3",
  "Simply Veg 1",
  "Simply Veg",
  "Combo",
];

const user = localStorage.getItem("user");
let userObj = {};
if(user){
  userObj = JSON.parse(user)
}

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
          restaurantId: restaurantId,
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
          // restaurantId: restaurantId ? restaurantId : "ALL",
          restaurantId : restaurantId,
          storeId: storeId ? storeId : "ALL",
        },
      });

      if (res.status === 200) {
        const sorted = res.data.sort(
          (a, b) => pizzaSort.indexOf(a) - pizzaSort.indexOf(b)
        );

        dispatch({
          type: productConstants.GET_DISHES_BY_SECTION_SUCCESS,
          payload: { res: sorted, section },
        });
        //console.log(sorted);
        return sorted;
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

export const getAllSectionsWithDishes = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_ALL_SECTIONS_WITH_DISHES_REQUEST,
      });

      const res = await axios.get(`/getAllSectionsWithDishes`, {
        params: {
          restaurantId: restaurantId ? restaurantId : "ALL",
          storeId: storeId ? storeId : "ALL",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_SECTIONS_WITH_DISHES_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_ALL_SECTIONS_WITH_DISHES_FAILURE,
        });
        console.log("error");
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_ALL_SECTIONS_WITH_DISHES_FAILURE,
      });
      console.log(error);
    }
  };
};

export const getProductsNewWithPaging = (
  restaurantId,
  storeId,
  start,
  end,
  list,
  sectionKeyword,
  categoryKeyword,
  nameKeyword,
  firstProductList
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_PAGE_REQUEST,
      });

      let res = null;

      if (!list || list.length < 1) {
        res = await axios.get(`/getMenuItemsByRestroAndStore`, {
          params: {
            restaurantId: restaurantId ? restaurantId : "ALL",
            storeId: storeId ? storeId : "ALL",
          },
        });

        if (res.data) {
          res = {
            ...res,
            data: filterSearch(
              res.data,
              sectionKeyword,
              categoryKeyword,
              nameKeyword
            ).slice(start, end),
          };
        }
      } else {
        res = {
          status: 200,
          data: filterSearch(
            list,
            sectionKeyword,
            categoryKeyword,
            nameKeyword
          ).slice(start, end),
        };
      }

      if (res && res.status === 200) {
        const productsList = {
          products: res.data,
        };
        console.log(productsList);

        dispatch({
          type: productConstants.GET_PRODUCTS_BY_PAGE_SUCCESS,
          payload: productsList,
        });

        if (sectionKeyword || categoryKeyword || nameKeyword) {
          dispatch({
            type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
            payload: productsList,
          });
        } /* else {
          if (firstProductList.length !== productsList.length) {
            dispatch({
              type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
              payload: firstProductList,
            });
          }
        } */

        return res.data;
      } else {
        console.log("error");
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_PAGE_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_PAGE_FAILURE,
      });
    }
  };
};

export const getAllMenuIngredientsByRestoAndStoreIdWithPaging = (
  restaurantId,
  storeId,
  start,
  end,
  list
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_ALL_MENU_INGREDIENTS_PAGE_REQUEST,
      });

      let res = null;

      if (!list || list.length < 1) {
        res = await axios.get(`/getMenuIngredientsByRestoAndStoreId`, {
          params: {
            restaurantId: restaurantId ? restaurantId : "ALL",
            storeId: storeId ? storeId : "ALL",
          },
        });

        res = { ...res, data: res.data.slice(start, end) };
      } else {
        res = {
          status: 200,
          data: list.slice(start, end),
        };
      }

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_MENU_INGREDIENTS_PAGE_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_ALL_MENU_INGREDIENTS_PAGE_FAILURE,
        });
        console.log("error");
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_ALL_MENU_INGREDIENTS_PAGE_FAILURE,
      });
      console.log(error);
    }
  };
};

export const updateMenuItem = (product) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.UPDATE_MENU_ITEM_REQUEST,
      });

      const res = await axios.post(`/saveMenuItem`, product);

      if (res.status === 200) {
        dispatch({
          type: productConstants.UPDATE_MENU_ITEM_SUCCESS,
          payload: res.data,
        });
        toast.success("Menu item updated successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.UPDATE_MENU_ITEM_FAILURE,
        });
        console.log("error");
        toast.error("Error when updating menu item, please try again!");
        return false;
      }
    } catch (error) {
      dispatch({
        type: productConstants.UPDATE_MENU_ITEM_FAILURE,
      });
      toast.error("Error when updating menu item, please try again!");
      console.log(error);
      return false;
    }
  };
};

export const updateMenuIngredient = (topping) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.UPDATE_MENU_INGREDIENT_REQUEST,
      });

      const res = await axios.post(`/saveMenuIngredient`, topping);

      if (res.status === 200) {
        dispatch({
          type: productConstants.UPDATE_MENU_INGREDIENT_SUCCESS,
          payload: res.data,
        });
        toast.success("Menu ingredient updated successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.UPDATE_MENU_INGREDIENT_FAILURE,
        });
        console.log("error");
        toast.error("Error when updating menu ingredient, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.UPDATE_MENU_INGREDIENT_FAILURE,
      });
      toast.error("Error when updating menu ingredient, please try again!");
      console.log(error);
    }
  };
};

export const saveMenuItem = (product) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.ADD_MENU_ITEM_REQUEST,
      });

      const res = await axios.post(`/saveMenuItem`, product);

      if (res.status === 200) {
        dispatch({
          type: productConstants.ADD_MENU_ITEM_SUCCESS,
          payload: res.data,
        });
        toast.success("Menu item added successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.ADD_MENU_ITEM_FAILURE,
        });
        console.log("error");
        toast.error("Error when adding menu item, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.ADD_MENU_ITEM_FAILURE,
      });
      toast.error("Error when adding menu item, please try again!");
      console.log(error);
    }
  };
};

export const saveMenuIngredient = (topping) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_NEW_MENU_INGREDIENT_REQUEST,
      });

      const res = await axios.post(`/saveMenuIngredient`, topping);

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_NEW_MENU_INGREDIENT_SUCCESS,
          payload: res.data,
        });
        toast.success("Menu ingredient saved successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_NEW_MENU_INGREDIENT_FAILURE,
        });
        console.log("error");
        toast.error("Error when saving menu ingredient, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_NEW_MENU_INGREDIENT_FAILURE,
      });
      toast.error("Error when saving menu ingredient, please try again!");
      console.log(error);
    }
  };
};

export const saveSubProduct = (subProduct) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_NEW_SUB_PRODUCT_REQUEST,
      });

      const res = await axios.post(`/saveSubProduct`, subProduct);

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_NEW_SUB_PRODUCT_SUCCESS,
          payload: res.data,
        });
        toast.success("Sub product saved successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_NEW_SUB_PRODUCT_FAILURE,
        });
        console.log("error");
        toast.error("Error when saving sub product, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_NEW_SUB_PRODUCT_FAILURE,
      });
      toast.error("Error when saving sub product, please try again!");
      console.log(error);
    }
  };
};

const filterSearch = (list, sectionKeyword, categoryKeyword, nameKeyword) => {
  console.log(list, sectionKeyword, categoryKeyword, nameKeyword);
  if (sectionKeyword && categoryKeyword && nameKeyword) {
    return list.filter(function (el) {
      return (
        el.section.toLowerCase().includes(sectionKeyword.toLowerCase()) &&
        el.dish.toLowerCase().includes(categoryKeyword.toLowerCase()) &&
        el.dishType.toLowerCase().includes(nameKeyword.toLowerCase())
      );
    });
  } else if (!sectionKeyword && categoryKeyword && nameKeyword) {
    return list.filter(function (el) {
      return (
        el.dish.toLowerCase().includes(categoryKeyword.toLowerCase()) &&
        el.dishType.toLowerCase().includes(nameKeyword.toLowerCase())
      );
    });
  } else if (sectionKeyword && !categoryKeyword && nameKeyword) {
    return list.filter(function (el) {
      return (
        el.section.toLowerCase().includes(sectionKeyword.toLowerCase()) &&
        el.dishType.toLowerCase().includes(nameKeyword.toLowerCase())
      );
    });
  } else if (sectionKeyword && categoryKeyword && !nameKeyword) {
    return list.filter(function (el) {
      return (
        el.section.toLowerCase().includes(sectionKeyword.toLowerCase()) &&
        el.dish.toLowerCase().includes(categoryKeyword.toLowerCase())
      );
    });
  } else if (!sectionKeyword && !categoryKeyword && nameKeyword) {
    return list.filter(function (el) {
      return el.dishType.toLowerCase().includes(nameKeyword.toLowerCase());
    });
  } else if (!sectionKeyword && categoryKeyword && !nameKeyword) {
    return list.filter(function (el) {
      return el.dish.toLowerCase().includes(categoryKeyword.toLowerCase());
    });
  } else if (sectionKeyword && !categoryKeyword && !nameKeyword) {
    return list.filter(function (el) {
      return el.section.toLowerCase().includes(sectionKeyword.toLowerCase());
    });
  } else {
    return list;
  }
};

export const getDishToppingMappingByRestoAndStore = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_DISH_TOPPING_MAPPING_BY_RESTRO_REQUEST,
      });

      const res = await axios.get(`/getDishToppingMappingByRestoAndStore`, {
        params: {
          restaurantId: restaurantId ? restaurantId : "ALL",
          storeId: storeId ? storeId : "ALL",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_DISH_TOPPING_MAPPING_BY_RESTRO_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_DISH_TOPPING_MAPPING_BY_RESTRO_FAILURE,
        });
        console.log("error");
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_DISH_TOPPING_MAPPING_BY_RESTRO_FAILURE,
      });
      console.log(error);
    }
  };
};

export const saveDishToToppingMapping = (topping) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_DISH_TO_TOPPING_REQUEST,
      });

      const res = await axios.post(`/saveDishToToppingMapping`, topping);

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_DISH_TO_TOPPING_SUCCESS,
          payload: res.data,
        });
        dispatch(
          getDishToppingMappingByRestoAndStore(
            topping.restaurantId,
            topping.storeId
          )
        );
        toast.success("Topping added successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_DISH_TO_TOPPING_FAILURE,
        });
        console.log("error");
        toast.error("Error when adding topping, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_DISH_TO_TOPPING_FAILURE,
      });
      toast.error("Error when adding topping, please try again!");
      console.log(error);
    }
  };
};

export const deleteDishToToppingMapping = (topping) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.DELETE_DISH_TO_TOPPING_REQUEST,
      });

      const res = await axios.delete(`/deleteDishToToppingMapping`, {
        data: topping,
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.DELETE_DISH_TO_TOPPING_SUCCESS,
          payload: res.data,
        });
        dispatch(
          getDishToppingMappingByRestoAndStore(
            topping.restaurantId,
            topping.storeId
          )
        );
        toast.success("Topping deleted successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.DELETE_DISH_TO_TOPPING_FAILURE,
        });
        console.log("error");
        toast.error("Error when deleting topping, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.DELETE_DISH_TO_TOPPING_FAILURE,
      });
      toast.error("Error when deleting topping, please try again!");
      console.log(error);
    }
  };
};

export const getAllSectionsFromMaster = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_ALL_SECTIONS_MASTER_REQUEST,
      });

      const res = await axios.get(`/getAllSectionsFromMaster`,{
        params: {
          restaurantId: restaurantId,
        },
      });

      if (res && res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_SECTIONS_MASTER_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_ALL_SECTIONS_MASTER_FAILURE,
          payload: [],
        });
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllDishesFromMaster = (restaurantId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_ALL_DISHES_MASTER_REQUEST,
      });

      const res = await axios.get(`/getAllDishesFromMaster`,{
        params:{
          restaurantId: restaurantId
        }
      });

      if (res && res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_DISHES_MASTER_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_ALL_DISHES_MASTER_FAILURE,
          payload: [],
        });
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveSection = (section) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_NEW_SECTION_REQUEST,
      });

      const res = await axios.post(`/saveSection`, section);

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_NEW_SECTION_SUCCESS,
          payload: res.data,
        });
        dispatch(getAllSectionsFromMaster(section.restaurantId));
        toast.success("Section added successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_NEW_SECTION_FAILURE,
        });
        console.log("error");
        toast.error("Error when adding section, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_NEW_SECTION_FAILURE,
      });
      toast.error("Error when adding section, please try again!");
      console.log(error);
    }
  };
};

export const saveDish = (dish) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_NEW_DISH_REQUEST,
      });

      const res = await axios.post(`/saveDish`, dish);

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_NEW_DISH_SUCCESS,
          payload: res.data,
        });
        dispatch(getAllDishesFromMaster());
        toast.success("Dish added successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_NEW_DISH_FAILURE,
        });
        console.log("error");
        toast.error("Error when adding dish, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_NEW_DISH_FAILURE,
      });
      toast.error("Error when adding dish, please try again!");
      console.log(error);
    }
  };
};

export const uploadImage = (image) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.UPLOAD_IMAGE_REQUEST,
      });

      const res = await axios.post(`/uploadFile`, image, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.UPLOAD_IMAGE_SUCCESS,
          payload: res.data,
        });
        toast.success("Image uploaded successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.UPLOAD_IMAGE_FAILURE,
        });
        console.log("error");
        toast.error("Error when uploading image, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.UPLOAD_IMAGE_FAILURE,
      });
      toast.error("Error when uploading image, please try again!");
      console.log(error);
    }
  };
};

export const saveProduct = (product) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_NEW_PRODUCT_REQUEST,
      });

      console.log("pro", product);

      const res = await axios.post(`/saveProduct`, product);

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_NEW_PRODUCT_SUCCESS,
          payload: res.data,
        });
        toast.success("Product added successfully!");

        console.log(res.data);
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_NEW_PRODUCT_FAILURE,
        });
        console.log("error");
        toast.error("Error when adding product, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_NEW_PRODUCT_FAILURE,
      });
      toast.error("Error when adding product, please try again!");
      console.log(error);
    }
  };
};

export const saveSubProductNew = (topping) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_NEW_SUB_PRODUCT_NEW_REQUEST,
      });

      const res = await axios.post(`/saveSubProduct`, topping);

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_NEW_SUB_PRODUCT_NEW_SUCCESS,
          payload: res.data,
        });
        toast.success("Sub product saved successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_NEW_SUB_PRODUCT_NEW_FAILURE,
        });
        console.log("error");
        toast.error("Error when saving sub product, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_NEW_SUB_PRODUCT_NEW_FAILURE,
      });
      toast.error("Error when saving sub product, please try again!");
      console.log(error);
    }
  };
};

export const getAllProduct = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_MASTER_PRODUCTS_REQUEST,
      });

      const res = await axios.get(`/getAllProduct`,{
        params: {
          restaurantId: restaurantId
        }
      });

      if (res && res.status === 200) {
        dispatch({
          type: productConstants.GET_MASTER_PRODUCTS_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        console.log("error");
        dispatch({
          type: productConstants.GET_MASTER_PRODUCTS_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_MASTER_PRODUCTS_FAILURE,
      });
    }
  };
};

export const saveProductMenuMapping = (mapArray, restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_PRODUCT_MAPPING_REQUEST,
      });

      const res = await axios.post(`/saveProductMenuMapping`, {
        mappings: mapArray,
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_PRODUCT_MAPPING_SUCCESS,
          payload: res.data,
        });
        //dispatch(getProductsNew(restaurantId, storeId));
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
          payload: {
            products: res.data,
          },
        });
        toast.success("Menu updated successfully!");
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_PRODUCT_MAPPING_FAILURE,
        });
        toast.error("Error when updating, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_PRODUCT_MAPPING_FAILURE,
      });
      toast.error("Error when updating, please try again!");
      console.log(error);
    }
  };
};

export const getAllSubProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_ALL_SUB_PRODUCTS_REQUEST,
      });

      const res = await axios.get(`/getAllSubProduct`);

      if (res && res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_SUB_PRODUCTS_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        console.log("error");
        dispatch({
          type: productConstants.GET_ALL_SUB_PRODUCTS_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_ALL_SUB_PRODUCTS_FAILURE,
      });
    }
  };
};

export const getAllOffers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_ALL_OFFERS_REQUEST,
      });

      const res = await axios.get(`/getAllOffers`, {params: {restaurantId:userObj.restaurantId, storeId:userObj.storeId}});

      if (res && res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_OFFERS_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        console.log("error");
        dispatch({
          type: productConstants.GET_ALL_OFFERS_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_ALL_OFFERS_FAILURE,
      });
    }
  };
};

export const saveOffer = (offer, isDelete) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.SAVE_OFFER_REQUEST,
      });

      const res = await axios.post(`/saveOffer`, offer);

      if (res.status === 200) {
        dispatch({
          type: productConstants.SAVE_OFFER_SUCCESS,
          payload: res.data,
        });

        isDelete
          ? toast.success("Offer deleted successfully!")
          : toast.success("Offer added successfully!");

        dispatch(getOffersByStatus("ACTIVE"));
        return res.data;
      } else {
        dispatch({
          type: productConstants.SAVE_OFFER_FAILURE,
        });
        console.log("error");
        toast.error("Error when adding offer, please try again!");
      }
    } catch (error) {
      dispatch({
        type: productConstants.SAVE_OFFER_FAILURE,
      });
      toast.error("Error when adding offer, please try again!");
      console.log(error);
    }
  };
};

export const getOffersByStatus = (status) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_ALL_OFFERS_BY_STATUS_REQUEST,
      });

      const res = await axios.get(`/getOffersByStatus`, {params: {status:status, restaurantId:userObj.restaurantId, storeId:userObj.storeId}});

      if (res && res.status === 200) {
        dispatch({
          type: productConstants.GET_ALL_OFFERS_BY_STATUS_SUCCESS,
          payload: res.data,
        });

        return res.data;
      } else {
        console.log("error");
        dispatch({
          type: productConstants.GET_ALL_OFFERS_BY_STATUS_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_ALL_OFFERS_BY_STATUS_FAILURE,
      });
    }
  };
};

export const getConfigOffersAppFlag = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_OFFERS_APP_FLAG_CONFIG_REQUEST,
      });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId,
          storeId: "ALL",
          criteria: "OFFERS_APPLICABLE_FLAG",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_OFFERS_APP_FLAG_CONFIG_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_OFFERS_APP_FLAG_CONFIG_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_OFFERS_APP_FLAG_CONFIG_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getConfigOffersCriteria = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_OFFERS_CRITERIA_CONFIG_REQUEST,
      });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId,
          storeId: "ALL",
          criteria: "OFFERS_CRITERIA",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_OFFERS_CRITERIA_CONFIG_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_OFFERS_CRITERIA_CONFIG_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_OFFERS_CRITERIA_CONFIG_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const getConfigOffersFunction = (restaurantId) => { // STATIC-ROO1
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.GET_OFFERS_FUNCTION_CONFIG_REQUEST,
      });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: restaurantId,
          storeId: "ALL",
          criteria: "OFFERS_FUNCTION",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_OFFERS_FUNCTION_CONFIG_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: productConstants.GET_OFFERS_FUNCTION_CONFIG_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_OFFERS_FUNCTION_CONFIG_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};
