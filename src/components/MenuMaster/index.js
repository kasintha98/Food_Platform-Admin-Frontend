import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsNew,
  getAllSections,
  getDishesBySection,
} from "../../actions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Row, Col } from "react-bootstrap";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import {
  Typography,
  TextField,
  Button,
  Alert,
  NativeSelect,
  TableContainer,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
`;

const CusMenuItem = styled(MenuItem)``;

export const MenuMaster = () => {
  const stores = useSelector((state) => state.store.stores);
  const productList = useSelector((state) => state.product.products);
  const allDishesBySection = useSelector(
    (state) => state.product.allDishesBySection
  );
  const productListLoading = useSelector((state) => state.product.loading);
  const dishSectionLoading = useSelector(
    (state) => state.product.dishSectionLoading
  );
  //const allDishOfSection = useSelector((state) => state.product.allDishOfSection);
  const sections = useSelector((state) => state.product.sections);
  const user = useSelector((state) => state.auth.user);

  const [selectedStore, setSelectedStore] = useState(
    //stores[0] ? stores[0].resturantName : null
    null
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState(
    /* stores[0] */ null
  );
  const [newDishSection, setNewDishSection] = useState("");
  const [newDishCategory, setNewDishCategory] = useState("");
  const [currentRestaurent, setCurrentRestaurent] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [currentDish, setCurrentDish] = useState("");
  const [currentVeg, setCurrentVeg] = useState("");
  const [currentSpice, setCurrentSpice] = useState("");
  const [currentDishType, setCurrentDishType] = useState("");
  const [currentDishDesc, setCurrentDishDesc] = useState("");
  const [currentImageName, setCurrentImageName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentMenuFlag, setCurrentMenuFlag] = useState("");
  const [currentIngredientFlag, setCurrentIngredientFlag] = useState("");
  const [currentSize, setCurrentSize] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getProductsNew(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      );
      dispatch(
        getAllSections(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      ).then((res) => {
        if (res) {
          for (let i = 0; i < res.length; i++) {
            dispatch(
              getDishesBySection(
                res[i],
                selectedStoreObj.restaurantId,
                selectedStoreObj.storeId
              )
            );
          }
          console.log("done");
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

  const handleRestaurentUpdate = (event) => {
    console.log(event.target.value);
    setCurrentRestaurent(event.target.value);
  };

  const handleSectionUpdate = (event) => {
    console.log(event.target.value);
    setCurrentSection(event.target.value);
  };

  const handleDishUpdate = (event) => {
    console.log(event.target.value);
    setCurrentDish(event.target.value);
  };

  const handleVegUpdate = (event) => {
    console.log(event.target.value);
    setCurrentVeg(event.target.value);
  };

  const handleSpiceUpdate = (event) => {
    console.log(event.target.value);
    setCurrentSpice(event.target.value);
  };

  const handleMenuFlagUpdate = (event) => {
    console.log(event.target.value);
    setCurrentMenuFlag(event.target.value);
  };

  const handleIngredientFlagUpdate = (event) => {
    console.log(event.target.value);
    setCurrentIngredientFlag(event.target.value);
  };

  const handleSizeUpdate = (event) => {
    console.log(event.target.value);
    setCurrentSize(event.target.value);
  };

  return (
    <div>
      <Row className="align-items-center">
        <div style={{ minWidth: "180px" }}>
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
        <Col sm={6}></Col>
      </Row>
      <Row className="align-items-center mt-2">
        <div style={{ minWidth: "180px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Add new Dish Section
          </Typography>
        </div>
        <Col sm={5}>
          <CusTextField
            label="New Dish Section"
            value={newDishSection}
            onChange={(event) => {
              setNewDishSection(event.target.value);
            }}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <Button
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              padding: "5px 16px",
            }}
            variant="contained"
            color="warning"
          >
            SAVE
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center mt-2">
        <div style={{ minWidth: "180px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Add new Dish Category
          </Typography>
        </div>
        <Col sm={5}>
          <CusTextField
            label="New Dish Category"
            value={newDishCategory}
            onChange={(event) => {
              setNewDishCategory(event.target.value);
            }}
            fullWidth
          />
        </Col>
        <Col sm={3}>
          <Button
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              padding: "5px 16px",
            }}
            variant="contained"
            color="warning"
          >
            SAVE
          </Button>
        </Col>
      </Row>
      <div>
        <TableContainer className="mt-2" sx={{ maxHeight: 430 }}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <CusTableCell align="center">Store Name</CusTableCell>
                <CusTableCell align="center">Dish Section</CusTableCell>
                <CusTableCell align="center">Dish Category</CusTableCell>
                <CusTableCell align="center">Dish Name</CusTableCell>
                <CusTableCell align="center">Veg (Y/N)</CusTableCell>
                <CusTableCell align="center">Spicy Indicator</CusTableCell>
                <CusTableCell align="center">Dish Description</CusTableCell>
                <CusTableCell align="center">Size</CusTableCell>
                <CusTableCell align="center">Price</CusTableCell>
                <CusTableCell align="center">Image Name</CusTableCell>
                <CusTableCell align="center">Dish Visible (Y/N)</CusTableCell>
                <CusTableCell align="center">KDS Counter Name</CusTableCell>
                <CusTableCell align="center">Topping (Y/N)</CusTableCell>
                <CusTableCell align="center">Add Toppings</CusTableCell>
                <CusTableCell align="center">Action</CusTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productListLoading ||
              Object.keys(allDishesBySection).length !== sections.length ? (
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
                  {productList && productList.length > 0 ? (
                    <>
                      {productList.map((product) => (
                        <TableRow>
                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={`${
                                  product.restaurantId - product.storeId
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
                                defaultValue={product.section}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleSectionUpdate}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                {sections.map((section, index) => (
                                  <option
                                    key={index}
                                    value={section}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {section}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={product.dish}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleDishUpdate}
                                sx={{ fontSize: "0.75rem" }}
                                /* onClick={() => {
                                  if (!allDishOfSection[product.section]) {
                                    console.log(
                                      product.section,
                                      currentSection
                                    );
                                    dispatch(
                                      getDishesBySection(
                                        product.section,
                                        selectedStoreObj.restaurantId,
                                        selectedStoreObj.storeId
                                      )
                                    ).then((res) => {
                                      if (res) {
                                        const data = {
                                          ...allDishOfSection,
                                          [product.section]: res,
                                        };
                                        setAllDishOfSection(data);
                                      }
                                    });
                                  }
                                }} */
                              >
                                {allDishesBySection[product.section] &&
                                allDishesBySection[product.section].length >
                                  0 &&
                                allDishesBySection[product.section].some(
                                  (el) => el === product.dish
                                ) ? (
                                  allDishesBySection[product.section].map(
                                    (dish, index) => (
                                      <option
                                        key={index}
                                        value={dish}
                                        style={{ fontSize: "0.75rem" }}
                                      >
                                        {dish}
                                        {index === allDishesBySection.length &&
                                          dishSectionLoading && (
                                            <div className="d-flex justify-content-center">
                                              <div
                                                className="spinner-border text-primary"
                                                role="status"
                                              ></div>
                                            </div>
                                          )}
                                      </option>
                                    )
                                  )
                                ) : (
                                  <option
                                    value={product.dish}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {product.dish}
                                    {dishSectionLoading && (
                                      <div className="d-flex justify-content-center">
                                        <div
                                          className="spinner-border text-primary"
                                          role="status"
                                        ></div>
                                      </div>
                                    )}
                                  </option>
                                )}
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              value={
                                currentDishType
                                  ? currentDishType
                                  : product.dishType
                              }
                              onChange={(event) => {
                                setCurrentDishType(event.target.value);
                              }}
                              fullWidth
                              variant="standard"
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={product.dishCategory}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleVegUpdate}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                <option
                                  value={"Veg"}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Y
                                </option>
                                <option
                                  value={"Non-Veg"}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  N
                                </option>
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            {product.dishSpiceIndicatory ? (
                              <FormControl fullWidth>
                                <NativeSelect
                                  defaultValue={product.dishSpiceIndicatory}
                                  inputProps={{
                                    name: "status",
                                    id: "uncontrolled-native",
                                  }}
                                  onChange={handleSpiceUpdate}
                                  sx={{ fontSize: "0.75rem" }}
                                >
                                  <option
                                    value={"Less Spicy"}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    Less Spicy
                                  </option>
                                  <option
                                    value={"Medium Spicy"}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    Medium Spicy
                                  </option>
                                  <option
                                    value={"Extra Hot"}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    Extra Hot
                                  </option>
                                </NativeSelect>
                              </FormControl>
                            ) : null}
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              value={
                                currentDishDesc
                                  ? currentDishDesc
                                  : product.dishDescriptionId
                              }
                              onChange={(event) => {
                                setCurrentDishDesc(event.target.value);
                              }}
                              fullWidth
                              variant="standard"
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <NativeSelect
                              defaultValue={product.productSize}
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
                              defaultValue={product.price}
                              value={currentPrice}
                              onChange={(event) => {
                                setCurrentPrice(event.target.value);
                              }}
                              fullWidth
                              variant="standard"
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              value={
                                currentImageName
                                  ? currentImageName
                                  : product.imagePath
                              }
                              onChange={(event) => {
                                setCurrentImageName(event.target.value);
                              }}
                              fullWidth
                              variant="standard"
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <NativeSelect
                              defaultValue={product.menuAvailableFlag}
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={handleMenuFlagUpdate}
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
                            {product.kdsRoutingName}
                          </CusTableCell>
                          <CusTableCell align="center">
                            <NativeSelect
                              defaultValue={product.ingredientExistsFalg}
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
                            {product.ingredientExistsFalg === "Y" ? (
                              <Button
                                sx={{
                                  fontSize: "0.75rem",
                                  lineHeight: "1rem",
                                  padding: "5px 16px",
                                }}
                              >
                                Add Toppings
                              </Button>
                            ) : null}
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
                              Save
                            </Button>
                          </CusTableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={15}>
                        <Alert severity="warning">
                          {selectedStoreObj
                            ? "No products found!"
                            : "Please select a store!"}{" "}
                        </Alert>
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
          ADD NEW DISH
        </Button>
      </div>
    </div>
  );
};
