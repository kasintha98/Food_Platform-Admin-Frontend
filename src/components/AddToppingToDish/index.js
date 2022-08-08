import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Checkbox from "@mui/material/Checkbox";
import { Alert, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuIngredientsByRestoAndStoreId,
  saveDishToToppingMapping,
  deleteDishToToppingMapping,
  getProductsNew,
  getDishToppingMappingByRestoAndStore,
} from "../../actions";

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

const CusMenuItem = styled(MenuItem)``;

export const AddToppingToDish = () => {
  const stores = useSelector((state) => state.store.stores);
  const productList = useSelector((state) => state.product.products);
  const allDishToppingMappingByRestoAndStore = useSelector(
    (state) => state.product.allDishToppingMappingByRestoAndStore
  );

  const allMenuIngredients = useSelector(
    (state) => state.product.allMenuIngredients
  );
  const menuIngredientsLoading = useSelector(
    (state) => state.product.menuIngredientsLoading
  );

  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [localDishToppingMapping, setLocalDishToppingMapping] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getProductsNew(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      );

      dispatch(
        getAllMenuIngredientsByRestoAndStoreId(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId
        )
      );

      dispatch(
        getDishToppingMappingByRestoAndStore(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId
        )
      ).then((res) => {
        if (res) {
          setLocalDishToppingMapping(res);
        }
      });
    }
  }, [selectedStoreObj]);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleChangeSave = (event, ing, productId) => {
    const newObj = {
      productId: productId,
      subProductId: ing.subProductId,
      restaurantId: ing.restaurantId,
      storeId: ing.storeId,
      ingredientAvailableFlag: "Y",
    };
    dispatch(saveDishToToppingMapping(newObj));
  };

  const handleChangeDelete = (event, ing, productId, deleteObj) => {
    //const newObjD = { ...ing, productId };
    console.log(deleteObj);
    dispatch(deleteDishToToppingMapping(deleteObj));
  };

  return (
    <div>
      <Row
        className="align-items-center justify-content-center"
        style={{ width: "100vw" }}
      >
        <div style={{ maxWidth: "125px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Select Store
          </Typography>
        </div>
        <Col sm={6} style={{ display: "flex" }}>
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
              id="selectstore"
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
          &nbsp;
        </Col>
      </Row>
      <div>
        {!selectedStore ? (
          <Alert className="mt-4" severity="warning">
            Please select a store!
          </Alert>
        ) : (
          <TableContainer
            className="mt-2"
            sx={{
              maxHeight: "475px",
              width: "101%",
            }}
          >
            <Table sx={{ minWidth: "800px" }} stickyHeader>
              <TableHead>
                <TableRow>
                  <CusTableCell
                    align="center"
                    sx={{
                      backgroundColor: "#2f5597",
                      color: "#ffffff",
                      height: "3rem",
                    }}
                  >
                    Dish
                    <br />
                    Selection
                  </CusTableCell>
                  <CusTableCell
                    align="center"
                    sx={{
                      backgroundColor: "#2f5597",
                      color: "#ffffff",
                      height: "3rem",
                    }}
                  >
                    Dish
                    <br />
                    Category
                  </CusTableCell>
                  <CusTableCell
                    align="center"
                    sx={{
                      backgroundColor: "#2f5597",
                      color: "#ffffff",
                      height: "3rem",
                    }}
                  >
                    Dish
                    <br />
                    Name
                  </CusTableCell>
                  <CusTableCell
                    align="center"
                    sx={{
                      backgroundColor: "#2f5597",
                      color: "#ffffff",
                      height: "3rem",
                    }}
                  >
                    Size
                  </CusTableCell>
                  {allMenuIngredients.map((item) => (
                    <CusTableCell
                      sx={{
                        backgroundColor: "#fff2cc",
                        verticalAlign: "sub",
                      }}
                      align="center"
                    >
                      <span
                        style={{
                          backgroundColor: "#688789",
                          color: "#ffffff",
                          display: "inline-block",
                          width: "100%",
                        }}
                      >
                        {item.size}
                      </span>
                      <br></br>
                      <span>{item.ingredientType}</span>
                    </CusTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {menuIngredientsLoading ? (
                  <TableRow>
                    <TableCell colSpan={25}>
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
                        {productList
                          .filter(function (el) {
                            return el.ingredientExistsFalg === "Y";
                          })
                          .map((item) => (
                            <TableRow key={item.id}>
                              <CusTableCell align="center">
                                {item.section}
                              </CusTableCell>
                              <CusTableCell align="center">
                                {item.dish}
                              </CusTableCell>
                              <CusTableCell align="center">
                                {item.dishType}
                              </CusTableCell>
                              <CusTableCell align="center">
                                {item.productSize}
                              </CusTableCell>
                              {allMenuIngredients.map((ing) => (
                                <CusTableCell align="center">
                                  <Checkbox
                                    sx={{
                                      "&.Mui-checked": {
                                        color: "#2e7d32",
                                      },
                                    }}
                                    checked={
                                      allDishToppingMappingByRestoAndStore.find(
                                        (x) =>
                                          x.productId === item.productId &&
                                          x.subProductId === ing.subProductId
                                      )
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        handleChangeSave(
                                          e,
                                          ing,
                                          item.productId
                                        );
                                      } else {
                                        handleChangeDelete(
                                          e,
                                          ing,
                                          item.productId,
                                          allDishToppingMappingByRestoAndStore.find(
                                            (x) =>
                                              x.productId === item.productId &&
                                              x.subProductId ===
                                                ing.subProductId
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </CusTableCell>
                              ))}
                            </TableRow>
                          ))}
                      </>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={25}>
                          <Alert severity="warning">
                            No ingredients found!
                          </Alert>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};
