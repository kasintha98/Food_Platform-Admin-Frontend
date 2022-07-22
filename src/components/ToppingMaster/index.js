import React, { useState, useEffect } from "react";
import { getAllMenuIngredientsByRestoAndStoreId } from "../../actions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Row, Col } from "react-bootstrap";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import {
  Typography,
  TextField,
  Button,
  Alert,
  NativeSelect,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const CusInputLabel = styled(InputLabel)`
  &.Mui-focused {
    top: 0px !important;
  }

  &.MuiFormLabel-filled {
    top: 0px !important;
  }
`;

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
`;

const CusTextField = styled(TextField)`
 & label {
  font-size: 0.75rem;
  top: -11px;
}

& .Mui-focused{
  top: 0px !important;
}

& fieldset{
  font-size: 0.75rem;
}

& .MuiFormLabel-filled{
  top: 0px !important;
}

& input{
  font-size: 0.75rem;
  padding: 0.25rem;
}
 }
`;

const CusMenuItem = styled(MenuItem)``;

export const ToppingMaster = () => {
  const stores = useSelector((state) => state.store.stores);
  const allMenuIngredients = useSelector(
    (state) => state.product.allMenuIngredients
  );
  const menuIngredientsLoading = useSelector(
    (state) => state.product.menuIngredientsLoading
  );

  const [selectedStore, setSelectedStore] = useState(
    //stores[0] ? stores[0].resturantName : null
    ""
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState(
    /* stores[0] */ null
  );
  const [currentRestaurent, setCurrentRestaurent] = useState("");
  const [currentToppingType, setCurrentToppingType] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [currentIngredientFlag, setCurrentIngredientFlag] = useState("");
  const [currentToppingName, setCurrentToppingName] = useState({});
  const [currentPrice, setCurrentPrice] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getAllMenuIngredientsByRestoAndStoreId(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId
        )
      );
    }
  }, [selectedStoreObj]);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleRestaurentUpdate = (event) => {
    setCurrentRestaurent(event.target.value);
  };

  const handleToppingTypeUpdate = (event) => {
    setCurrentToppingType(event.target.value);
  };

  const handleSizeUpdate = (event) => {
    setCurrentSize(event.target.value);
  };

  const handleIngredientFlagUpdate = (event) => {
    setCurrentIngredientFlag(event.target.value);
  };

  return (
    <div>
      <Row className="align-items-center justify-content-center">
        <div style={{ maxWidth: "125px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Select Store
          </Typography>
        </div>
        <Col sm={5}>
          <FormControl fullWidth>
            <CusInputLabel
              sx={{ fontSize: "0.75rem", lineHeight: "1rem", top: "-11px" }}
              id="demo-simple-select-label"
            >
              Please select the store
            </CusInputLabel>
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
        </Col>
      </Row>
      <div>
        <TableContainer className="mt-2" sx={{ maxHeight: 430 }}>
          <Table sx={{ minWidth: 800 }} stickyHeader>
            <TableHead>
              <TableRow>
                <CusTableCell align="center">Store Name</CusTableCell>
                <CusTableCell align="center">Topping Type</CusTableCell>
                <CusTableCell align="center">Topping Name</CusTableCell>
                <CusTableCell align="center">Size</CusTableCell>
                <CusTableCell align="center">Price</CusTableCell>
                <CusTableCell align="center">
                  Topping Available(Y/N)
                </CusTableCell>
                <CusTableCell align="center">Action</CusTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuIngredientsLoading ? (
                <TableRow>
                  <TableCell colSpan={15}>
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      ></div>
                    </div>
                    <div className="text-center">
                      <Typography>Loading Data...</Typography>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {allMenuIngredients && allMenuIngredients.length > 0 ? (
                    <>
                      {allMenuIngredients.map((item) => (
                        <TableRow>
                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={`${
                                  item.restaurantId - item.storeId
                                }`}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleRestaurentUpdate}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                {stores.map((store, index) => (
                                  <option
                                    key={index}
                                    value={`${
                                      store.restaurantId - store.storeId
                                    }`}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {store.resturantName}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={item.category}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleToppingTypeUpdate}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                <option
                                  value={"Topping"}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Topping
                                </option>
                                <option
                                  value={"Choise of Base"}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Choice of Base
                                </option>
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              defaultValue={item.ingredientType}
                              value={currentToppingName[item.id]}
                              onChange={(event) => {
                                const names = {
                                  ...currentToppingName,
                                  [item.id]: event.target.value,
                                };
                                setCurrentToppingName(names);
                              }}
                              fullWidth
                              variant="standard"
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <NativeSelect
                              defaultValue={item.size}
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={handleSizeUpdate}
                              sx={{ fontSize: "0.75rem" }}
                            >
                              <option
                                value={"Regular"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Regular
                              </option>
                              <option
                                value={"Small"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Small
                              </option>
                              <option
                                value={"Medium"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Medium
                              </option>
                              <option
                                value={"Large"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Large
                              </option>
                            </NativeSelect>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              defaultValue={item.price}
                              value={currentPrice[item.id]}
                              onChange={(event) => {
                                const prices = {
                                  ...currentPrice,
                                  [item.id]: event.target.value,
                                };
                                setCurrentPrice(prices);
                              }}
                              fullWidth
                              variant="standard"
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <NativeSelect
                              defaultValue={
                                /* product.ingredientExistsFalg */ "Y"
                              }
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={handleIngredientFlagUpdate}
                              sx={{ fontSize: "0.75rem" }}
                            >
                              <option
                                value={"Y"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Y
                              </option>
                              <option
                                value={"N"}
                                style={{ fontSize: "0.75rem" }}
                              >
                                N
                              </option>
                            </NativeSelect>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <Button
                              variant="contained"
                              color="success"
                              sx={{
                                fontSize: "0.75rem",
                                lineHeight: "1rem",
                                padding: "5px 16px",
                              }}
                            >
                              {" "}
                              SAVE
                            </Button>
                          </CusTableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={15}>
                        <Alert severity="warning">No ingrefients found!</Alert>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mt-3 text-center">
        <Button variant="contained" color="success">
          ADD NEW TOPPING
        </Button>
      </div>
    </div>
  );
};
