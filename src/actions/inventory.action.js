import axios from "../helpers/axios";
import { inventoryConstants } from "./constants";
import { toast } from "react-toastify";

//get inventory from database
export const getInventory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_INVENTORY_REQUEST });

      const res = await axios.get("/inventory");
      console.log(res);

      if (res.status === 200) {
        const { inventory } = res.data;

        dispatch({
          type: inventoryConstants.GET_INVENTORY_SUCCESS,
          payload: { inventory: inventory },
        });
      } else {
        dispatch({
          type: inventoryConstants.GET_INVENTORY_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//action to add inventory to database
export const addInventory = (form) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.ADD_INVENTORY_REQUEST });

    try {
      const res = await axios.post("/inventory/add", form);
      if (res.status === 201) {
        dispatch({
          type: inventoryConstants.ADD_INVENTORY_SUCCESS,
          payload: { inventory: res.data.inventory },
        });
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        dispatch({
          type: inventoryConstants.ADD_INVENTORY_FAILURE,
          payload: res.data.error,
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.reponse);
    }
  };
};

//action to delete inventory from database
export const deleteInventory = (id) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.DELETE_INVENTORY_REQUEST });

    const res = await axios.delete("/inventory/delete/" + id);

    if (res.status === 200) {
      dispatch(getInventory());
      dispatch({
        type: inventoryConstants.DELETE_INVENTORY_SUCCESS,
      });
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: inventoryConstants.DELETE_INVENTORY_FAILURE,
        payload: { error },
      });

      toast.error(res.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

export const getAllSuppliers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_ALL_SUPPLIERS_REQUEST });

      const res = await axios.get("/getAllSuppliers");
      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.GET_ALL_SUPPLIERS_SUCCESS,
          payload: res.data,
        });
      } else {
        toast.error("Error getting supplier data!");
        dispatch({
          type: inventoryConstants.GET_ALL_SUPPLIERS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting supplier data!");
      dispatch({
        type: inventoryConstants.GET_ALL_SUPPLIERS_FAILURE,
        payload: [],
      });
    }
  };
};

export const saveUpdateSupplier = (supplier) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.SAVE_UPDATE_SUPPLIERS_REQUEST });

    try {
      const res = await axios.post("/saveSupplier", supplier);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_SUPPLIERS_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveSuppliers());
        toast.success("Supplier Saved Successfully!");
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_SUPPLIERS_FAILURE,
          payload: null,
        });
        toast.error("Error when saving! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when saving! Please try again!");
    }
  };
};

export const deleteSupplier = (id, updatedBy) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.DELETE_SUPPLIERS_REQUEST });

    try {
      const supplier = {
        supplierId: id,
        supplierStatus: "INACTIVE",
        updatedBy: updatedBy,
      };

      const res = await axios.post("/saveSupplierStatus", supplier);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.DELETE_SUPPLIERS_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveSuppliers());
        toast.success("Supplier Soft Deleted Successfully!");
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.DELETE_SUPPLIERS_FAILURE,
          payload: null,
        });
        toast.error("Error when deleting! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when deleting! Please try again!");
    }
  };
};

export const getAllInventory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_ALL_INVENTORY_ITEMS_REQUEST });

      const res = await axios.get("/getAllItems");
      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.GET_ALL_INVENTORY_ITEMS_SUCCESS,
          payload: res.data,
        });
      } else {
        toast.error("Error getting inventory data!");
        dispatch({
          type: inventoryConstants.GET_ALL_INVENTORY_ITEMS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting inventory data!");
      dispatch({
        type: inventoryConstants.GET_ALL_INVENTORY_ITEMS_FAILURE,
        payload: [],
      });
    }
  };
};

export const getActiveInventory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_REQUEST });

      const res = await axios.get("/getItemsByStatus?status=ACTIVE");
      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        toast.error("Error getting inventory data!");
        dispatch({
          type: inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting inventory data!");
      dispatch({
        type: inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_FAILURE,
        payload: [],
      });
    }
  };
};

export const getInventoryUOM = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_UOM_REQUEST });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: "R001",
          storeId: "ALL",
          criteria: "INVENTORY_ITEM_UOM",
        },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: inventoryConstants.GET_UOM_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.GET_UOM_FAILURE,
          payload: { error: "Error fetching UOM config data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: inventoryConstants.GET_UOM_FAILURE,
        payload: { error: "Error fetching UOM config data!" },
      });
    }
  };
};

export const getInventoryCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_INVENTORY_CATEGORIES_REQUEST });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: "R001",
          storeId: "ALL",
          criteria: "INVENTORY_ITEM_CATEGORY",
        },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: inventoryConstants.GET_INVENTORY_CATEGORIES_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.GET_INVENTORY_CATEGORIES_FAILURE,
          payload: { error: "Error fetching categories config data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: inventoryConstants.GET_INVENTORY_CATEGORIES_FAILURE,
        payload: { error: "Error fetching categories config data!" },
      });
    }
  };
};

export const saveUpdateInventoryItem = (item) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.SAVE_UPDATE_INVENYORY_ITEM_REQUEST });

    try {
      const res = await axios.post("/saveItem", item);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_INVENYORY_ITEM_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveInventory());
        toast.success("Item Saved Successfully!");
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_INVENYORY_ITEM_FAILURE,
          payload: null,
        });
        toast.error("Error when saving! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when saving! Please try again!");
    }
  };
};

export const deleteInventoryItem = (id, updatedBy) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.DELETE_INVENTORY_ITEM_REQUEST });

    try {
      const item = {
        itemId: id,
        itemStatus: "INACTIVE",
        updatedBy: updatedBy,
      };

      const res = await axios.post("/saveItemStatus", item);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.DELETE_INVENTORY_ITEM_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveInventory());
        toast.success("Item Soft Deleted Successfully!");
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.DELETE_INVENTORY_ITEM_FAILURE,
          payload: null,
        });
        toast.error("Error when deleting! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when deleting! Please try again!");
    }
  };
};

export const getActiveSuppliers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_ALL_SUPPLIERS_REQUEST });

      const res = await axios.get("/getAllActiveSuppliers");
      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.GET_ALL_SUPPLIERS_SUCCESS,
          payload: res.data,
        });
      } else {
        toast.error("Error getting supplier data!");
        dispatch({
          type: inventoryConstants.GET_ALL_SUPPLIERS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting supplier data!");
      dispatch({
        type: inventoryConstants.GET_ALL_SUPPLIERS_FAILURE,
        payload: [],
      });
    }
  };
};

export const getActiveRecipes = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_ACTIVE_RECIPES_REQUEST });

      const res = await axios.get("/getAllActiveRecipes");
      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.GET_ACTIVE_RECIPES_SUCCESS,
          payload: res.data,
        });
      } else {
        toast.error("Error getting recipe data!");
        dispatch({
          type: inventoryConstants.GET_ACTIVE_RECIPES_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting recipe data!");
      dispatch({
        type: inventoryConstants.GET_ACTIVE_RECIPES_FAILURE,
        payload: [],
      });
    }
  };
};

export const saveUpdateRecipeItem = (item) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.SAVE_UPDATE_RECIPE_ITEM_REQUEST });

    try {
      const res = await axios.post("/saveRecipe", item);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_RECIPE_ITEM_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveRecipes());
        toast.success("Recipe saved Successfully!");
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_RECIPE_ITEM_FAILURE,
          payload: null,
        });
        toast.error("Error when saving! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when saving! Please try again!");
    }
  };
};

export const deleteRecipeItem = (id, updatedBy) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.DELETE_RECIPE_ITEM_REQUEST });

    try {
      const item = {
        id: id,
        itemStatus: "INACTIVE",
        updatedBy: updatedBy,
      };

      const res = await axios.post("/saveRecipeStatus", item);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.DELETE_RECIPE_ITEM_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveRecipes());
        toast.success("Item Soft Deleted Successfully!");
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.DELETE_RECIPE_ITEM_FAILURE,
          payload: null,
        });
        toast.error("Error when deleting! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when deleting! Please try again!");
    }
  };
};

export const getInventoryPurchaseCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: inventoryConstants.GET_PURCHASE_ORDER_CATEGORY_REQUEST,
      });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: "R001",
          storeId: "ALL",
          criteria: "PURCHASE_ORDER_CATEGORY",
        },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: inventoryConstants.GET_PURCHASE_ORDER_CATEGORY_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.GET_PURCHASE_ORDER_CATEGORY_FAILURE,
          payload: { error: "Error fetching purchase order config data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: inventoryConstants.GET_PURCHASE_ORDER_CATEGORY_FAILURE,
        payload: { error: "Error fetching purchase order config data!" },
      });
    }
  };
};

export const saveUpdatePurchaseOrder = (item, isPullPo) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.SAVE_UPDATE_PURCHASE_ORDER_REQUEST });

    try {
      const res = await axios.post("/savePurchaseOrder", item);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_PURCHASE_ORDER_SUCCESS,
          payload: res.data,
        });
        let billStr = item.billNumber
          ? ` with Bill NO: ${item.billNumber}`
          : "";
        toast.success(
          "PO NO: " +
            res.data.purchaseOrderId +
            billStr +
            " Saved Successfully!"
        );
        if (isPullPo) {
          dispatch(getSubmittedRecievedPurchaseOrders());
        }
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_PURCHASE_ORDER_FAILURE,
          payload: null,
        });
        toast.error("Error when saving! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when saving! Please try again!");
    }
  };
};

export const getClosedPurchaseOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_REQUEST });

      const res = await axios.get("/getPurchaseOrdersByStatus?status=CLOSED");
      /* const res = await axios.get("/getAllPurchaseOrders"); */
      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        toast.error("Error getting purchase order data!");
        dispatch({
          type: inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting purchase order data!");
      dispatch({
        type: inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_FAILURE,
        payload: [],
      });
    }
  };
};

export const getItemConsumptionSummery = (store) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: inventoryConstants.GET_ITEM_CONSUMPTION_SUMMARY_REQUEST,
      });

      const res = await axios.get("/getItemConsumptionSummery");
      if (res.status === 200) {
        let filteredData = res.data.filter(function (el) {
          return (
            el.restaurantId === store.restaurantId &&
            el.storeId === store.storeId
          );
        });

        dispatch({
          type: inventoryConstants.GET_ITEM_CONSUMPTION_SUMMARY_SUCCESS,
          payload: filteredData,
        });
        return filteredData;
      } else {
        toast.error("Error getting item consumption data!");
        dispatch({
          type: inventoryConstants.GET_ITEM_CONSUMPTION_SUMMARY_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting item consumption data!");
      dispatch({
        type: inventoryConstants.GET_ITEM_CONSUMPTION_SUMMARY_FAILURE,
        payload: [],
      });
    }
  };
};

export const saveItemConsumptionSummery = (item) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.SAVE_UPDATE_ITEM_CONSUMPTION_REQUEST });

    try {
      const res = await axios.post("/saveItemConsumptionSummery", item);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_ITEM_CONSUMPTION_SUCCESS,
          payload: res.data,
        });
        toast.success("Item Updated Successfully!");

        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_ITEM_CONSUMPTION_FAILURE,
          payload: null,
        });
        toast.error("Error when updating! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when updating! Please try again!");
    }
  };
};

export const saveAllItemConsumptionSummery = (items) => {
  return async (dispatch) => {
    dispatch({
      type: inventoryConstants.SAVE_UPDATE_ALL_ITEM_CONSUMPTION_REQUEST,
    });

    try {
      const res = await axios.post("/saveAllItemConsumptionSummery", items);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_ALL_ITEM_CONSUMPTION_SUCCESS,
          payload: res.data,
        });
        toast.success("Items Updated Successfully!");

        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_ALL_ITEM_CONSUMPTION_FAILURE,
          payload: null,
        });
        toast.error("Error when updating! Please try again!");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error when updating! Please try again!");
    }
  };
};

export const getSubmittedRecievedPurchaseOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_REQUEST });

      /* const res = await axios.get("/getPurchaseOrdersByStatus?status=CLOSED"); */
      const res = await axios.get("/getAllPurchaseOrders");
      if (res.status === 200) {
        let data = res.data.filter(function (el) {
          return (
            el.purchaseOrderStatus === "SUBMITTED" ||
            el.purchaseOrderStatus === "RECEIVED"
          );
        });

        dispatch({
          type: inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_SUCCESS,
          payload: data,
        });
        return data;
      } else {
        toast.error("Error getting purchase order data!");
        dispatch({
          type: inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting purchase order data!");
      dispatch({
        type: inventoryConstants.GET_CLOSED_PURCHASE_ORDERS_FAILURE,
        payload: [],
      });
    }
  };
};

export const savePurchaseOrderStatus = (item) => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.SAVE_PURCHASE_ORDER_STATUS_REQUEST });

      const res = await axios.post("/savePurchaseOrderStatus", item);
      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_PURCHASE_ORDER_STATUS_SUCCESS,
          payload: res.data,
        });
        toast.success("Saved purchase order status!");
        /* dispatch(getSubmittedRecievedPurchaseOrders()); */
        return res.data;
      } else {
        toast.error("Error saving purchase order status!");
        dispatch({
          type: inventoryConstants.SAVE_PURCHASE_ORDER_STATUS_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error saving purchase order status!");
      dispatch({
        type: inventoryConstants.SAVE_PURCHASE_ORDER_STATUS_FAILURE,
        payload: [],
      });
    }
  };
};

export const performInventoryUpdateEOD = (storeId, restaurantId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.PERFORM_INV_UPDATE_EOD_REQUEST });

      const res = await axios.get(
        `/performInventoryUpdateEOD?restaurantId=${restaurantId}&storeId=${storeId}`
      );
      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.PERFORM_INV_UPDATE_EOD_SUCCESS,
          payload: res.data,
        });
        toast.success("Inventory EOD success!");
        return true;
      } else {
        toast.error("Inventory EOD error!");
        dispatch({
          type: inventoryConstants.PERFORM_INV_UPDATE_EOD_FAILURE,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Inventory EOD error!");
      dispatch({
        type: inventoryConstants.PERFORM_INV_UPDATE_EOD_FAILURE,
        payload: [],
      });
    }
  };
};
