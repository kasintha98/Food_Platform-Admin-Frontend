import axios from "../helpers/axios";
import { inventoryConstants } from "./constants";
import { toast } from "react-toastify";

const user = localStorage.getItem("user");
let userObj = {};
if (user) {
  userObj = JSON.parse(user)
}

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

      const res = await axios.get("/getAllSuppliers", { params: { restaurantId: userObj.restaurantId, storeId: userObj.storeId } });
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

export const saveUpdateSupplier = (supplier, restaurantId) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.SAVE_UPDATE_SUPPLIERS_REQUEST });

    try {
      const res = await axios.post("/saveSupplier", supplier);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_SUPPLIERS_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveSuppliers(restaurantId, "ALL"));
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

// export const saveUpdateSupplier = (supplier) => {
//   return async (dispatch) => {
//     dispatch({ type: inventoryConstants.SAVE_UPDATE_SUPPLIERS_REQUEST });

//     try {
//       const res = await axios.post("/saveSupplier", supplier);

//       if (res.status === 200) {
//         dispatch({
//           type: inventoryConstants.SAVE_UPDATE_SUPPLIERS_SUCCESS,
//           payload: res.data,
//         });
//         dispatch(getActiveSuppliers());
//         toast.success("Supplier Saved Successfully!");
//         return res.data;
//       } else {
//         dispatch({
//           type: inventoryConstants.SAVE_UPDATE_SUPPLIERS_FAILURE,
//           payload: null,
//         });
//         toast.error("Error when saving! Please try again!");
//       }
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//       toast.error("Error when saving! Please try again!");
//     }
//   };
// };

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

      const res = await axios.get("/getAllItems", { params: { restaurantId: userObj.restaurantId, storeId: "ALL" } });
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

      const res = await axios.get("/getItemsByStatus", { params: { status: "ACTIVE", restaurantId: userObj.restaurantId, storeId: "ALL" } });
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

// export const getActiveInventory = () => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_REQUEST });

//       const res = await axios.get("/getItemsByStatus?status=ACTIVE");
//       if (res.status === 200) {
//         dispatch({
//           type: inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_SUCCESS,
//           payload: res.data,
//         });
//         return res.data;
//       } else {
//         toast.error("Error getting inventory data!");
//         dispatch({
//           type: inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_FAILURE,
//           payload: [],
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error getting inventory data!");
//       dispatch({
//         type: inventoryConstants.GET_ACTIVE_INVENTORY_ITEMS_FAILURE,
//         payload: [],
//       });
//     }
//   };
// };

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
          // criteria: "INVENTORY_ITEM_CATEGORY",
          criteria: "ITEM_CATEGORY",

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

// export const getInventorySubCategories = () => { //TODO: This need to check
//   return async (dispatch) => {
//     try {
//       dispatch({ type: inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_REQUEST });

//       const res = await axios.get("/getConfigDetailsByCriteria?restaurantId=R001&storeId=ALL&criteria=ITEM_SUB_CATEGORY");

//       if (res.status === 200 && res.data) {
//         dispatch({
//           type: inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_SUCCESS,
//           payload: res.data,
//         });
//         return res.data;
//       } else {
//         dispatch({
//           type: inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_FAILURE,
//           payload: { error: "Error fetching categories config data!" },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch({
//         type: inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_FAILURE,
//         payload: { error: "Error fetching categories config data!" },
//       });
//     }
//   };
// };

export const getInventorySubCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_REQUEST });

      const res = await axios.get(`/getConfigDetailsByCriteria`, {
        params: {
          restaurantId: "R001",
          storeId: "ALL",
          criteria: "ITEM_SUB_CATEGORY",
        },
      });

      if (res.status === 200 && res.data) {
        dispatch({
          type: inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_FAILURE,
          payload: { error: "Error fetching categories config data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: inventoryConstants.GET_INVENTORY_SUB_CATEGORIES_FAILURE,
        payload: { error: "Error fetching categories config data!" },
      });
    }
  };
};

export const saveUpdateInventoryItem = (item, restaurantId) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.SAVE_UPDATE_INVENYORY_ITEM_REQUEST });

    try {
      const res = await axios.post("/saveItem", item);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_INVENYORY_ITEM_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveInventory(restaurantId));
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

export const deleteInventoryItem = (id, updatedBy, restaurantId) => {
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
        dispatch(getActiveInventory(restaurantId));
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

export const getActiveSuppliers = (restaurantId, storeId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: inventoryConstants.GET_ALL_SUPPLIERS_REQUEST });

      const res = await axios.get("/getAllActiveSuppliers?restaurantId=" + restaurantId + "&storeId=" + storeId);
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

export const getActiveRecipes = (restaurantId, storeId) => {
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

// export const getActiveRecipes = () => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: inventoryConstants.GET_ACTIVE_RECIPES_REQUEST });

//       const res = await axios.get("/getAllActiveRecipes");
//       if (res.status === 200) {
//         dispatch({
//           type: inventoryConstants.GET_ACTIVE_RECIPES_SUCCESS,
//           payload: res.data,
//         });
//       } else {
//         toast.error("Error getting recipe data!");
//         dispatch({
//           type: inventoryConstants.GET_ACTIVE_RECIPES_FAILURE,
//           payload: [],
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error getting recipe data!");
//       dispatch({
//         type: inventoryConstants.GET_ACTIVE_RECIPES_FAILURE,
//         payload: [],
//       });
//     }
//   };
// };

export const saveUpdateRecipeItem = (item, restaurantId) => {
  return async (dispatch) => {
    dispatch({ type: inventoryConstants.SAVE_UPDATE_RECIPE_ITEM_REQUEST });

    try {
      const res = await axios.post("/saveRecipe", item);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.SAVE_UPDATE_RECIPE_ITEM_SUCCESS,
          payload: res.data,
        });
        dispatch(getActiveRecipes(restaurantId, "ALL"));
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

// export const saveUpdateRecipeItem = (item) => {
//   return async (dispatch) => {
//     dispatch({ type: inventoryConstants.SAVE_UPDATE_RECIPE_ITEM_REQUEST });

//     try {
//       const res = await axios.post("/saveRecipe", item);

//       if (res.status === 200) {
//         dispatch({
//           type: inventoryConstants.SAVE_UPDATE_RECIPE_ITEM_SUCCESS,
//           payload: res.data,
//         });
//         dispatch(getActiveRecipes());
//         toast.success("Recipe saved Successfully!");
//         return res.data;
//       } else {
//         dispatch({
//           type: inventoryConstants.SAVE_UPDATE_RECIPE_ITEM_FAILURE,
//           payload: null,
//         });
//         toast.error("Error when saving! Please try again!");
//       }
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//       toast.error("Error when saving! Please try again!");
//     }
//   };
// };

export const deleteRecipeItem = (id, updatedBy, restaurantId) => {
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
        dispatch(getActiveRecipes(restaurantId, "ALL"));
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

// export const deleteRecipeItem = (id, updatedBy) => {
//   return async (dispatch) => {
//     dispatch({ type: inventoryConstants.DELETE_RECIPE_ITEM_REQUEST });

//     try {
//       const item = {
//         id: id,
//         itemStatus: "INACTIVE",
//         updatedBy: updatedBy,
//       };

//       const res = await axios.post("/saveRecipeStatus", item);

//       if (res.status === 200) {
//         dispatch({
//           type: inventoryConstants.DELETE_RECIPE_ITEM_SUCCESS,
//           payload: res.data,
//         });
//         dispatch(getActiveRecipes());
//         toast.success("Item Soft Deleted Successfully!");
//         return res.data;
//       } else {
//         dispatch({
//           type: inventoryConstants.DELETE_RECIPE_ITEM_FAILURE,
//           payload: null,
//         });
//         toast.error("Error when deleting! Please try again!");
//       }
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//       toast.error("Error when deleting! Please try again!");
//     }
//   };
// };

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

export const getItemConsumptionSummery = (store, type) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: inventoryConstants.GET_ITEM_CONSUMPTION_SUMMARY_REQUEST,
      });

      const res = await axios.get("/getItemConsumptionSummery", null, { params: { type: type } });
      if (res.status === 200) {
        let filteredData = res.data.filter(function (el) {
          return (
            el.restaurantId === store.restaurantId &&
            el.storeId === store.storeId &&
            el.itemCategory === type
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

export const returnSearchedList = (list, closedPurchaseOrders, selectedStoreObj, user, billNo, selectedSupplierObj, dateState, selectedSearchPOstatus, mList) => {
  return async (dispatch) => {
    try {
      /* dispatch({ type: inventoryConstants.PERFORM_INV_UPDATE_EOD_REQUEST });

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
      } */
      let list = mList ? mList : closedPurchaseOrders;
      let searched = [];
      if (list) {

        if (selectedStoreObj) {
          searched = list.filter(function (el) {
            return (
              selectedStoreObj.restaurantId === el.restaurantId &&
              selectedStoreObj.storeId === el.storeId
            );
          });
        }

        if (user.roleCategory !== "SUPER_ADMIN") {
          searched = list.filter(function (el) {
            return (
              user.restaurantId === el.restaurantId &&
              user.storeId === el.storeId
            );
          });
        }

        if (billNo) {
          searched = list.filter(function (el) {
            return el.billNumber.toLowerCase().includes(billNo.toLowerCase());
          });
        }

        if (selectedSupplierObj) {
          searched = list.filter(function (el) {
            return selectedSupplierObj.supplierId === el.supplierId;
          });
        }

        if (dateState[0]) {
          searched = list.filter(function (el) {
            return (
              dateState[0].startDate.getTime() <=
              new Date(el.purchaseDate).getTime() &&
              dateState[0].endDate.getTime() >=
              new Date(el.purchaseDate).getTime()
            );
          });
        }

        if (selectedSearchPOstatus) {
          searched = list.filter(function (el) {
            return el.purchaseOrderStatus.toLowerCase() === selectedSearchPOstatus.toLowerCase();
          });
        }


        //groupBypurchaseOrderId(searched);
      }
      return searched;

    } catch (error) {
      toast.error("Error");
      /* dispatch({
        type: inventoryConstants.PERFORM_INV_UPDATE_EOD_FAILURE,
        payload: [],
      }); */
    }
  };
};