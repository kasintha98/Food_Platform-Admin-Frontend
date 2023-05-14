import axios from "../helpers/axios";
import { storeConstants } from "./constants";
import { toast } from "react-toastify";

const user = localStorage.getItem("user");
let userObj = {};
if (user) {
  userObj = JSON.parse(user)
}

// export const getAllStores = () => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.get(`/getAllStores`);

//       if (res.status === 200) {
//         const filteredStores = res.data.filter(function (el) {
//           return el.storeActiveFlag === "Y";
//         });

//         dispatch({
//           type: storeConstants.GET_ALL_STORES_SUCCESS,
//           payload: filteredStores,
//         });
//       } else {
//         dispatch({
//           type: storeConstants.GET_ALL_STORES_FAILURE,
//           payload: [],
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const getAllStores = (restaurantId) => {
  return async (dispatch) => {
    try {
      // const res = await axios.get(`/getStoresByRestaurantId`);
      const res = await axios.get(`/getStoresByRestaurantId`, {
        params: {
          restaurantId: restaurantId,
        },
      });

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

export const saveStore = (newstore) => {
  return async (dispatch) => {
    try {
      dispatch({ type: storeConstants.ADD_STORES_REQUEST });

      const res = await axios.post(`/saveStore`, newstore);
      console.log("aaa res", res);
      if (res.status === 200) {
        dispatch({
          type: storeConstants.ADD_STORES_SUCCESS,
          payload: res.data,
        });
        // dispatch(getAllStores());
        dispatch(getAllStores(userObj.restaurantId));
        toast.success("Store Add/Update Successfully!");
      } else {
        dispatch({
          type: storeConstants.ADD_STORES_FAILURE,
          payload: [],
        });
        toast.error("Error when adding store! Please try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
