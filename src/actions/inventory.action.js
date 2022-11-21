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
        dispatch(getAllSuppliers());
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
        id: id,
        supplierStatus: "INACTIVE",
        updatedBy: updatedBy,
      };

      const res = await axios.post("/saveSupplierStatus", supplier);

      if (res.status === 200) {
        dispatch({
          type: inventoryConstants.DELETE_SUPPLIERS_SUCCESS,
          payload: res.data,
        });
        dispatch(getAllSuppliers());
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
