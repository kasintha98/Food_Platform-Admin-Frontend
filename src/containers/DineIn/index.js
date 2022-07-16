import React, { useState } from "react";
import { useSelector } from "react-redux";
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

export const DineIn = () => {
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);
  const stores = useSelector((state) => state.store.stores);

  const [selectedStore, setSelectedStore] = useState(user.resturantName);
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId: user.restaurantId,
    storeId: user.storeId,
  });
  const [ShowCheckout, setShowCheckout] = useState(false);

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

  return (
    <Layout sidebar headerTitle="Welcome">
      <Row className="align-items-center" style={{ marginTop: "-10px" }}>
        <Col className="col-sm-7">
          {ShowCheckout ? (
            <Button
              onClick={() => {
                setShowCheckout(false);
              }}
            >
              <ArrowBackIcon></ArrowBackIcon> &nbsp; Back
            </Button>
          ) : null}
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
              <Select
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
              </Select>
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
          ></NewCheckout>
        ) : (
          <NewMenu
            setShowCheckout={setShowCheckout}
            restaurantId={selectedStoreObj.restaurantId}
            storeId={selectedStoreObj.storeId}
          ></NewMenu>
        )}
      </div>
    </Layout>
  );
};
