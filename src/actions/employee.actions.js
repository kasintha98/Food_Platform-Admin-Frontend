import axios from "../helpers/axios";
import { employeeConstants } from "./constants";
import { toast } from "react-toastify";

export const getEmployeesByRes = (restaurantId, storeId, status) => {
  return async (dispatch) => {
    try {
      dispatch({ type: employeeConstants.GET_EMPLOYEE_BY_RES_REQUEST });

      const res = await axios.get("/getAllEmployee", {
        params: { restaurantId, storeId, status },
      });
      console.log(res);

      if (res.status === 200) {
        dispatch({
          type: employeeConstants.GET_EMPLOYEE_BY_RES_SUCCESS,
          payload: res.data,
        });
        return res.data;
      } else {
        dispatch({
          type: employeeConstants.GET_EMPLOYEE_BY_RES_FAILURE,
          payload: [],
        });
        toast.error("Error, please try again!");
      }
    } catch (error) {
      toast.error("Error, please try again!");
      console.log(error);
    }
  };
};

export const addUpdateEmployee = (employee) => {
  return async (dispatch) => {
    try {
      dispatch({ type: employeeConstants.ADD_EMPLOYEE_REQUEST });

      console.log(employee);

      const res = await axios.post("/addUpdateEmployee", employee);

      if (res.status === 200) {
        dispatch({
          type: employeeConstants.ADD_EMPLOYEE_SUCCESS,
          payload: res.data,
        });
        dispatch(
          getEmployeesByRes(employee.restaurantId, employee.storeId, "ACTIVE")
        );
        return res.data;
      } else {
        dispatch({
          type: employeeConstants.ADD_EMPLOYEE_FAILURE,
          payload: [],
        });
        toast.error("Error, please try again!");
      }
    } catch (error) {
      toast.error("Error, please try again!");
      console.log(error);
    }
  };
};
