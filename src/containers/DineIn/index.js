import React, { useState, useEffect } from "react";
import { getOrderSourceConfigDetails } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Typography, Button } from "@mui/material";
import Layout from "../NewLayout";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NewMenu from "../NewMenu";
import NewCheckout from "../NewCheckout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CusMenuItem = styled(MenuItem)``;

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 3px;
    padding-bottom: 3px;
  }
`;

const orderTypes = [
  { name: "DINE IN", code: "D", paymentStatus: "PAID" },
  { name: "STORE TAKE-AWAY", code: "ST", paymentStatus: "PAID" },
  { name: "STORE DELIVERY", code: "SD", paymentStatus: "PAID" },
  { name: "PHONE SELF-COLLECT", code: "PT", paymentStatus: "Not Paid" },
  { name: "PHONE DELIVERY", code: "PD", paymentStatus: "Not Paid" },
];

export const DineIn = () => {
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);
  const stores = useSelector((state) => state.store.stores);

  const dispatch = useDispatch();

  const [selectedStore, setSelectedStore] = useState(
    stores[0] ? stores[0].resturantName : user.resturantName
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState(
    stores[0]
      ? stores[0]
      : {
          restaurantId: user.restaurantId,
          storeId: user.storeId,
        }
  );
  const [ShowCheckout, setShowCheckout] = useState(false);
  //const [orderTypesT, setOrderTypesT] = useState([]);
  const [selectedOrderType, setSelectedOrderType] = useState("DINE IN");
  const [selectedOrderTypeObj, setSelectedOrderTypeObj] = useState(
    orderTypes[0]
  );

  /* useEffect(() => {
    dispatch(getOrderSourceConfigDetails(user.restaurantId, user.storeId)).then(
      (res) => {
        if (res) {
          let newOrderSources = [];

          for (let i = 0; i < res.length; i++) {
            if (
              res[i].configCriteriaDesc === "DINE IN" ||
              res[i].configCriteriaDesc === "STORE TAKE AWAY" ||
              res[i].configCriteriaDesc === "STORE DELIVERY" ||
              res[i].configCriteriaDesc === "PHONE SELF COLLECT" ||
              res[i].configCriteriaDesc === "PHONE DELIVERY"
            )
              newOrderSources.push({
                ...res[i],
                name: res[i].configCriteriaDesc,
                code: res[i].configCriteriaValue,
                paymentStatus:
                  res[i].configCriteriaDesc === "DINE IN" ||
                  res[i].configCriteriaDesc === "STORE TAKE AWAY" ||
                  res[i].configCriteriaDesc === "STORE DELIVERY"
                    ? "PAID"
                    : "Not Paid",
              });
          }

          setOrderTypesT(newOrderSources);
        }
      }
    );
  }, []); */

  if (auth.authenticate !== true) {
    return <Redirect to={"/signin"} />;
  }

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };
  const handleChangeOrderType = (event) => {
    setSelectedOrderType(event.target.value);
  };

  const handleChangeOrderTypeObj = (type) => {
    setSelectedOrderTypeObj(type);
  };

  return (
    <Layout sidebar headerTitle="Welcome">
      <Row className="align-items-center" style={{ marginTop: "-10px" }}>
        <Col className="col-sm-7">
          {ShowCheckout ? (
            <Button
              sx={{ padding: 0, marginRight: "20px" }}
              onClick={() => {
                setShowCheckout(false);
              }}
            >
              <ArrowBackIcon></ArrowBackIcon> &nbsp; Back
            </Button>
          ) : null}
          <FormControl sx={{ width: "200px" }}>
            <InputLabel
              sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
              id="demo-simple-select-label"
            >
              Order Type
            </InputLabel>
            <CusSelect
              sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOrderType}
              label="Please select the store"
              onChange={handleChangeOrderType}
            >
              {orderTypes.map((type) => (
                <CusMenuItem
                  onClick={() => {
                    handleChangeOrderTypeObj(type);
                  }}
                  value={type.name}
                >
                  <span>{type.name}</span>
                </CusMenuItem>
              ))}
            </CusSelect>
          </FormControl>
        </Col>
        <div style={{ maxWidth: "125px !important" }}>
          <Typography
            sx={{
              color: "#7F7F7F",
              fontWeight: "bold",
              fontSize: "0.75rem",
              lineHeight: "1rem",
            }}
          >
            {user.roleCategory === "SUPER_ADMIN"
              ? "Select Store"
              : "Your Store"}
          </Typography>
        </div>
        <Col className="col-sm-4" style={{ display: "flex" }}>
          {user.roleCategory === "SUPER_ADMIN" ? (
            <FormControl fullWidth>
              <InputLabel
                sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                id="demo-simple-select-label"
              >
                Please select the store
              </InputLabel>
              <CusSelect
                sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedStore}
                label="Please select the store"
                onChange={handleChangeStore}
              >
                {stores.map((store) => (
                  <CusMenuItem
                    onClick={() => {
                      handleSelectedStore(store);
                    }}
                    value={store.resturantName}
                  >
                    <span>{store.resturantName}</span>
                  </CusMenuItem>
                ))}
              </CusSelect>
            </FormControl>
          ) : (
            <span>
              {user.resturantName ? user.resturantName : user.restaurantId}
            </span>
          )}
        </Col>
      </Row>
      <div>
        {ShowCheckout ? (
          <NewCheckout
            restaurantId={selectedStoreObj.restaurantId}
            storeId={selectedStoreObj.storeId}
            storeObj={selectedStoreObj}
            selectedOrderTypeObj={selectedOrderTypeObj}
            isShowDeliveryCharge={
              selectedOrderTypeObj.code === "SD" ||
              selectedOrderTypeObj.code === "PD"
                ? true
                : false
            }
          ></NewCheckout>
        ) : (
          <NewMenu
            setShowCheckout={setShowCheckout}
            restaurantId={selectedStoreObj.restaurantId}
            storeId={selectedStoreObj.storeId}
            isShowDeliveryCharge={
              selectedOrderTypeObj.code === "SD" ||
              selectedOrderTypeObj.code === "PD"
                ? true
                : false
            }
          ></NewMenu>
        )}
      </div>
    </Layout>
  );
};
