import { Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { isUserLoggedIn, getInitialData, getAllStores } from "./actions";
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

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //checking user logging and getting initial data
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    /* dispatch(getInitialData()); */
    dispatch(getAllStores());
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Switch>
        <PrivateRoute path="/" exact component={AdminDashboard}></PrivateRoute>
        <PrivateRoute
          path="/newtrack"
          exact
          component={NewTrack}
        ></PrivateRoute>
        <PrivateRoute path="/products" component={Products}></PrivateRoute>
        <PrivateRoute
          path="/delivery-management"
          component={DeliveryManagement}
        ></PrivateRoute>
        <PrivateRoute
          path="/delivery-tracking"
          component={DeliveryTracking}
        ></PrivateRoute>
        <PrivateRoute path="/orders" component={NewOrders}></PrivateRoute>
        <PrivateRoute path="/kds" component={KDS}></PrivateRoute>
        <PrivateRoute
          path="/restaurants"
          component={Restaurants}
        ></PrivateRoute>
        <PrivateRoute
          path="/delivery-charges"
          component={DeliveryCharges}
        ></PrivateRoute>
        <PrivateRoute
          path="/order-auto"
          component={OrderAutomation}
        ></PrivateRoute>
        <PrivateRoute
          path="/user-entitle"
          component={UserEntitlement}
        ></PrivateRoute>
        <PrivateRoute path="/categories" component={Category}></PrivateRoute>
        <PrivateRoute path="/employee" component={Employee}></PrivateRoute>
        <PrivateRoute path="/customer" component={Customer}></PrivateRoute>
        <PrivateRoute
          path="/delivery-boy"
          component={DeliveryBoy}
        ></PrivateRoute>
        <PrivateRoute path="/reports" component={NewReports}></PrivateRoute>
        <PrivateRoute path="/inventory" component={Inventory}></PrivateRoute>
        <PrivateRoute path="/purchases" component={Purchases}></PrivateRoute>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    </div>
  );
}

export default App;
