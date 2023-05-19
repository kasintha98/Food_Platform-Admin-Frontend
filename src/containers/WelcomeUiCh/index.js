import React, { useEffect }  from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import Layout from "../NewLayout";
import { Redirect } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";

import chef from "../../img/Chef_Landing.png";
import hangries_Landing_Page from "../../img/hangries_Landing_Page.png";

import {
  getInventoryUOM,
  getInventoryCategories,
  getInventorySubCategories,
  getKDSTime,
  getPaymentModes,
  getOrderSourceConfigDetails,
  getAllStores
} from "../../actions";

export const Welcome = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (user.restaurantId !== undefined) {
      dispatch(getInventoryUOM(user.restaurantId));
      dispatch(getInventoryCategories(user.restaurantId));
      dispatch(getInventorySubCategories(user.restaurantId));
      dispatch(getKDSTime(user.restaurantId)); // ADDED FOR STATIC-R001
      dispatch(getPaymentModes(user.restaurantId));
      dispatch(getOrderSourceConfigDetails(user.restaurantId, user.storeId));
      dispatch(getAllStores(user.restaurantId));
    }
  }, []);

  if (auth.authenticate !== true) {
    return <Redirect to={"/signin"} />;
  }

  return (
    <Layout sidebar headerTitle="Welcome">
    <Row className="align-items-center" style={{ marginTop: "-10px" }} >
      <Col style={{maxWidth: '33.33%', marginTop:'110px'}} ><img className="chefImg" src={chef} alt="chef"></img></Col>
      <Col className="hangriesImgStyle">
            <Col>
            <img className="hangriesImg align-items-center" src={hangries_Landing_Page} alt="han"></img>
            </Col>

            <Col>
              <Typography className="welcomeTxtStyle align-items-center">
                Welcome to Hangries
              </Typography>
            </Col>

            <Col className="userInfoColStyle">
              <Typography className="userInfoTxtStyle">
                {user.firstName.toString().toUpperCase()} {user.lastName.toString().toUpperCase()}, you are logged-in as {user.roleCategory} and tagged to {user.resturantName} store
              </Typography>
            </Col>
      </Col>
    </Row>
  </Layout>
  );
};