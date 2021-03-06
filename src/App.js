import { Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import {
  isUserLoggedIn,
  getVersion,
  getAllStores,
  getModulesForUser,
  updateCart,
} from "./actions";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import Products from "./containers/Products";
import Employee from "./containers/Employee";
import Inventory from "./containers/Inventory";
import Purchases from "./containers/Purchases";
import PrivateRoute from "./HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import Category from "./containers/Category";
import { KDS } from "./containers/KDS";
import { Restaurants } from "./containers/Restaurants";
import { DeliveryCharges } from "./containers/DeliveryCharges";
import { OrderAutomation } from "./containers/OrderAutomation";
import { UserEntitlement } from "./containers/UserEntitlement";
import { Customer } from "./containers/Customer";
import { DeliveryBoy } from "./containers/DeliveryBoy";
import { AdminDashboard } from "./containers/AdminDashboard";
import { NewReports } from "./containers/NewReports";
import { NewOrders } from "./containers/NewOrders";
import { DeliveryManagement } from "./containers/DeliveryManagement";
import { DeliveryTracking } from "./containers/DeliveryTracking";
import { NewTrack } from "./containers/NewTrack";
import { Welcome } from "./containers/Welcome";
import { PageNotFound } from "./containers/PageNotFound";
import { ForgotPassword } from "./containers/ForgotPassword";
import { DineIn } from "./containers/DineIn";
import { AdminMenu } from "./containers/AdminMenu";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const modulesForUser = useSelector((state) => state.user.modulesForUser);

  //checking user logging and getting initial data
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(updateCart());
    dispatch(getAllStores());

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(
        getModulesForUser(user.restaurantId, user.storeId, user.roleCategory)
      );
    }

    if (localStorage.getItem("user")) {
      dispatch(getVersion());
    }
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Switch>
        <PrivateRoute path="/" exact component={Welcome}></PrivateRoute>

        {modulesForUser.some((module) => module.moduleName === "DINE-IN") && (
          <PrivateRoute path="/dine-in" exact component={DineIn}></PrivateRoute>
        )}

        {modulesForUser.some((module) => module.moduleName === "DASHBOARD") && (
          <PrivateRoute
            path="/dashboard"
            exact
            component={AdminDashboard}
          ></PrivateRoute>
        )}

        {/* <PrivateRoute
          path="/newtrack"
          exact
          component={NewTrack}
        ></PrivateRoute> */}

        {/* <PrivateRoute path="/products" component={Products}></PrivateRoute> */}

        {modulesForUser.some(
          (module) => module.moduleName === "DELIVERY MGMT"
        ) && (
          <PrivateRoute
            path="/delivery-management"
            component={DeliveryManagement}
          ></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "DELIVERY TRACKING"
        ) && (
          <PrivateRoute
            path="/delivery-tracking"
            component={DeliveryTracking}
          ></PrivateRoute>
        )}

        {modulesForUser.some((module) => module.moduleName === "ORDERS") && (
          <PrivateRoute path="/orders" component={NewOrders}></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "KITCHEN DISPLAY SYSTEM"
        ) && <PrivateRoute path="/kds" component={KDS}></PrivateRoute>}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <PrivateRoute
            path="/restaurants"
            component={Restaurants}
          ></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <PrivateRoute
            path="/delivery-charges"
            component={DeliveryCharges}
          ></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <PrivateRoute
            path="/order-auto"
            component={OrderAutomation}
          ></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <PrivateRoute
            path="/user-entitle"
            component={UserEntitlement}
          ></PrivateRoute>
        )}

        {/* <PrivateRoute path="/categories" component={Category}></PrivateRoute> */}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <PrivateRoute path="/employee" component={Employee}></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <PrivateRoute path="/customer" component={Customer}></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "DELIVERY BOY"
        ) && (
          <PrivateRoute
            path="/delivery-boy"
            component={DeliveryBoy}
          ></PrivateRoute>
        )}

        {modulesForUser.some((module) => module.moduleName === "REPORTS") && (
          <PrivateRoute path="/reports" component={NewReports}></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <PrivateRoute path="/inventory" component={Inventory}></PrivateRoute>
        )}

        {modulesForUser.some(
          (module) => module.moduleName === "ADMIN FUNCTIONS"
        ) && (
          <PrivateRoute path="/products" component={AdminMenu}></PrivateRoute>
        )}

        <Route path="/signin" component={Signin}></Route>
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
