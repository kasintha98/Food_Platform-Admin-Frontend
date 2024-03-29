import axios from "../helpers/axios";
import { authConstants } from "./constants";
import { userConstants } from "./constants";
import { toast } from "react-toastify";
import { getModulesForUser, getBusinessDate } from "./user.actions";

//action for login
export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    //post request from front end to signin with the data from frontend
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });

    //if respond is 200 (user successfully login)
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });

      //show success notification
      toast.success("Login Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    //if backend error
    if (res.status === 202) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { errormsg: res.data.errormsg },
      });
      //show error notification
      toast.error(res.data.errormsg, {
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

export const loginTest = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    //post request from front end to signin with the data from frontend

    //if respond is 200 (user successfully login)

    localStorage.setItem("token", user);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: authConstants.LOGIN_SUCCESS,
      payload: {
        token: user,
        user,
      },
    });

    //show success notification
    toast.success("Login Success!");
  };
};

export const newLogin = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });

      const res = await axios.post(`/employeeLogin`, {
        ...user,
      });

      if (res.status === 200) {
        if (res.data.loginResponse === "SUCCESS") {
          if (user.password === "default") {
            toast.warn("This is your first time login!", {
              autoClose: 8000,
            });
            toast.warn(
              "Please change your default password to a new password!!",
              {
                autoClose: 8000,
              }
            );
            return { isFirstTime: true };
          } else {
            const { user, restaurantName } = res.data;
            const userObj = { ...user, resturantName: restaurantName };
            localStorage.setItem("token", userObj);
            localStorage.setItem("user", JSON.stringify(userObj));
            dispatch({
              type: authConstants.LOGIN_SUCCESS,
              payload: {
                token: userObj,
                user: userObj,
              },
            });

            dispatch(
              getModulesForUser(
                userObj.restaurantId,
                userObj.storeId,
                userObj.roleCategory
              )
            );

            dispatch(getVersion(userObj.restaurantId));

            dispatch(getBusinessDate(userObj.restaurantId, userObj.storeId));
            //show success notification
            toast.success("Login Success!");
            return res.data;
          }
        }
        if (res.data.loginResponse === "INCORRECT_ID") {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { errormsg: "Login ID is incorrect!" },
          });
          toast.error("Login ID is incorrect!");
        }
        if (res.data.loginResponse === "INCORRECT_PASSWORD") {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { errormsg: "Password is incorrect!" },
          });
          toast.error("Password is incorrect!");
        }
      }
    } catch (error) {
      toast.error("There was an error, please try again!");
    }
  };
};

//action for signup
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_SIGNUP_REQUEST });

    const res = await axios.post(`/admin/signup`, user);

    //if respond is 201 (user successfully signup)
    if (res.status === 201) {
      dispatch({
        type: userConstants.USER_SIGNUP_SUCCESS,
        payload: { error: res.data },
      });

      //show success notification
      toast.success("Signup Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      //if backend error
      dispatch({
        type: userConstants.USER_SIGNUP_FAILURE,
        payload: { errormsg: res.data.errormsg },
      });

      //show error notification
      toast.error(res.data.errormsg, {
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

//if user is logged in then stop user going again to /signin
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    //getting stored token in the localstorage
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      //if backend error
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login!" },
      });
    }
  };
};

//action for signout
export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });

    //const res = await axios.post("/admin/signout");
    const res = "aa";

    //if respond is 200 (user successfully signout)
    if (/* res.status === 200 */ true) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const resetPassword = (loginId, loginPassword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.RESET_PASSWORD_REQUEST });

      const res = await axios.post(`/updateEmployeePasswordByLoginId`, {
        loginId,
        loginPassword,
      });

      if (res.status === 200 && res.data) {
        if (res.data.loginResponse === "SUCCESS") {
          dispatch({
            type: authConstants.RESET_PASSWORD_SUCCESS,
            payload: res.data,
          });
          toast.success(
            "Password reset successfull! Please use the new password for login!"
          );
          return res.data;
        }
        if (res.data.loginResponse === "INCORRECT_ID") {
          dispatch({
            type: authConstants.RESET_PASSWORD_FAILURE,
            payload: null,
          });
          toast.error("Login ID is incorrect!");
        }
      } else {
        dispatch({
          type: authConstants.RESET_PASSWORD_FAILURE,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error! Please try again!");
    }
  };
};

export const getVersion = (restaurantId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.GET_VERSION_REQUEST });

      const res = await axios.get("/getAppDetails?restaurantId="+restaurantId+"&storeId=ALL");

      if (res.status === 200 && res.data) {
        dispatch({
          type: authConstants.GET_VERSION_SUCCESS,
          payload: res.data[0],
        });
      } else {
        dispatch({
          type: authConstants.GET_VERSION_FAILURE,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const getVersion = () => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: authConstants.GET_VERSION_REQUEST });

//       const res = await axios.get(`/getAppDetails`);

//       if (res.status === 200 && res.data) {
//         dispatch({
//           type: authConstants.GET_VERSION_SUCCESS,
//           payload: res.data[0],
//         });
//       } else {
//         dispatch({
//           type: authConstants.GET_VERSION_FAILURE,
//           payload: null,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
