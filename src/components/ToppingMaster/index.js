import React, { useState, useEffect } from "react";
import {
  getAllMenuIngredientsByRestoAndStoreId,
  getAllMenuIngredientsByRestoAndStoreIdWithPaging,
  updateMenuIngredient,
} from "../../actions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Row, Col, Modal } from "react-bootstrap";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import {
  Typography,
  TextField,
  Button,
  Alert,
  NativeSelect,
  Pagination,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const itemsPerPage = 10;

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
  const [page, setPage] = useState(1);
  const [ToppingssOfPage, setToppingssOfPage] = useState([]);
  const [isSave, setIsSave] = useState({});
  const [showAdd, setShowAdd] = useState(false);

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

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getAllMenuIngredientsByRestoAndStoreIdWithPaging(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId,
          Number(page - 1) * itemsPerPage,
          page * itemsPerPage,
          allMenuIngredients
        )
      ).then((res) => {
        setToppingssOfPage(res);
      });
    }
  }, [page, selectedStoreObj]);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

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

  const handlePage = (event, value) => {
    setPage(value);
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const saveUpdateTopping = (topping) => {
    const newTopping = {
      ...topping,
      ingredientType: currentToppingName[topping.id]
        ? currentToppingName[topping.id]
        : topping.ingredientType,
      price: currentPrice[topping.id]
        ? currentPrice[topping.id]
        : topping.price,
      category: currentToppingType ? currentToppingType : topping.category,
      size: currentSize ? currentSize : topping.size,
    };
    console.log(newTopping);
    dispatch(updateMenuIngredient(newTopping));
  };

  const renderAddModal = () => {
    return (
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW TOPPING</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
          &nbsp;
          <Button
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              padding: "5px 16px",
              minWidth: "160px",
            }}
            onClick={handleShowAdd}
            variant="contained"
            color="success"
          >
            ADD NEW TOPPING
          </Button>
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
                {/* <CusTableCell align="center">
                  Topping Available(Y/N)
                </CusTableCell> */}
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
                      {ToppingssOfPage.map((item) => (
                        <TableRow key={item.id}>
                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                key={item.id}
                                defaultValue={`${
                                  item.restaurantId - item.storeId
                                }`}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleRestaurentUpdate}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={true}
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
                                key={item.id}
                                defaultValue={item.category}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleToppingTypeUpdate}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={!isSave[item.id]}
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
                              key={item.id}
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
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <NativeSelect
                              key={item.id}
                              defaultValue={item.size}
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={handleSizeUpdate}
                              sx={{ fontSize: "0.75rem" }}
                              disabled={!isSave[item.id]}
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
                              key={item.id}
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
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>
                          {/* <CusTableCell align="center">
                            <NativeSelect
                              defaultValue={
                                 "Y"
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
                          </CusTableCell> */}
                          <CusTableCell align="center">
                            {isSave[item.id] ? (
                              <Button
                                key={item.id}
                                variant="contained"
                                color="success"
                                sx={{
                                  fontSize: "0.75rem",
                                  lineHeight: "1rem",
                                  padding: "5px 16px",
                                }}
                                onClick={() => {
                                  onSaveClickHandle(item.id);
                                  saveUpdateTopping(item);
                                }}
                              >
                                Save
                              </Button>
                            ) : (
                              <Button
                                key={item.id}
                                variant="contained"
                                color="warning"
                                sx={{
                                  fontSize: "0.75rem",
                                  lineHeight: "1rem",
                                  padding: "5px 16px",
                                }}
                                onClick={() => {
                                  onEditClickHandle(item.id);
                                }}
                              >
                                EDIT
                              </Button>
                            )}
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
      {allMenuIngredients && allMenuIngredients.length > 0 && selectedStore ? (
        <div
          className="mt-3 mb-3"
          style={{ justifyContent: "center", display: "flex" }}
        >
          <Pagination
            count={Math.ceil(allMenuIngredients.length / itemsPerPage)}
            page={page}
            onChange={handlePage}
          />
        </div>
      ) : null}
      {renderAddModal()}
    </div>
  );
};
