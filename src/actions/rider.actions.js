import { riderConstants } from "./constants";
import { toast } from "react-toastify";
import axios from "axios";

export const getAllRiderLocations = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: riderConstants.GET_ALL_RIDER_LOCATION_REQUEST });

      const res = await axios.get(`http://localhost:3005/riderLocations`);

      if (res.status === 200) {
        dispatch({
          type: riderConstants.GET_ALL_RIDER_LOCATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: riderConstants.GET_ALL_RIDER_LOCATION_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: riderConstants.GET_ALL_RIDER_LOCATION_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};

export const updateRiderLocations = (obj, latitude, longitude, time) => {
  return async (dispatch) => {
    try {
      dispatch({ type: riderConstants.ADD_RIDER_LOCATION_REQUEST });

      const riderObj = {
        id: obj.id,
        name: obj.name,
        latitude: latitude,
        longitude: longitude,
        time: time,
      };

      const res = await axios.put(
        `http://localhost:3005/riderLocations/${obj.id}`,
        riderObj
      );

      if (res.status === 200) {
        dispatch({
          type: riderConstants.ADD_RIDER_LOCATION_SUCCESS,
          payload: res.data,
        });
        //dispatch(getAllRiderLocations());
      } else {
        dispatch({
          type: riderConstants.ADD_RIDER_LOCATION_FAILURE,
          payload: { error: "Error fetching data!" },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: riderConstants.ADD_RIDER_LOCATION_FAILURE,
        payload: { error: "Error fetching data!" },
      });
    }
  };
};
