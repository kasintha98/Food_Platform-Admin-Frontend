import styled from "@emotion/styled";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
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
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuIngredientsByRestoAndStoreId,
  getAllSections,
  getAllSectionsWithDishes,
  getProductsNew,
} from "../../actions";
import "./style.css";

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

  const allMenuIngredients = useSelector(
    (state) => state.product.allMenuIngredients
  );
  const menuIngredientsLoading = useSelector(
    (state) => state.product.menuIngredientsLoading
  );

  const [selectedStore, setSelectedStore] = useState("");

  const [selectedStoreObj, setSelectedStoreObj] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getProductsNew(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      );

      dispatch(
        getAllSections(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      );

      dispatch(
        getAllSectionsWithDishes(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId
        )
      );

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

  return (
    <div>
      <Row className="align-items-center justify-content-center">
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
          <Alert severity="warning">Please select a store!</Alert>
        ) : (
          <TableContainer
            className="mt-2"
            sx={{
              maxHeight: 530,
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
              scrollSnapType: "x mandatory",
              width: "91rem",
            }}
          >
            <Table sx={{ minWidth: "20rem" }} stickyHeader>
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
                      sx={{ backgroundColor: "#fff2cc", verticalAlign: "sub" }}
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
                        {productList.map((item) => (
                          <TableRow>
                            <CusTableCell key={item.id} align="center">
                              {item.section}
                            </CusTableCell>
                            <CusTableCell key={item.id} align="center">
                              {item.dishCategory}
                            </CusTableCell>
                            <CusTableCell key={item.id} align="center">
                              {item.dish}
                            </CusTableCell>
                            <CusTableCell key={item.id} align="center">
                              {item.productSize}
                            </CusTableCell>
                            {allMenuIngredients.map((ing) => (
                              <CusTableCell key={ing.id} align="center">
                                {ing.id}
                              </CusTableCell>
                            ))}
                          </TableRow>
                        ))}
                      </>
                    ) : (
                      <TableRow>
                        <TableCell colSpan={15}>
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
