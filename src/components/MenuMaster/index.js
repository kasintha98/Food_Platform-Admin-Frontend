import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getProductsNew,
  getAllSections,
  getAllSectionsWithDishes,
  getProductsNewWithPaging,
} from "../../actions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Row, Col, Form } from "react-bootstrap";
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
  Pagination,
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

const CusTextField2 = styled(TextField)`
 & label {
  font-size: 0.75rem;
  top: -11px;
}

& .Mui-focused{
  top: 0px !important;
  & lable{
    display: none
  }
}

& label .Mui-focused{
  display: none
}

& fieldset{
  font-size: 0.75rem;
}

& .MuiFormLabel-filled{
  top: 0px !important;
  & lable{
    display: none
  }
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

const CusTableCell2 = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const CusMenuItem = styled(MenuItem)``;

const CusNativeSelect = styled(NativeSelect)`
  & svg {
    display: none;
  }
`;

const itemsPerPage = 33;

export const MenuMaster = () => {
  const stores = useSelector((state) => state.store.stores);
  const productList = useSelector((state) => state.product.products);
  //const productsOfPage = useSelector((state) => state.product.productsOfPage);
  const allDishesBySection = useSelector(
    (state) => state.product.allDishesBySection
  );
  const productListLoading = useSelector((state) => state.product.loading);
  const dishSectionLoading = useSelector(
    (state) => state.product.dishSectionLoading
  );
  //const allDishOfSection = useSelector((state) => state.product.allDishOfSection);
  const sections = useSelector((state) => state.product.sections);

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
  const [currentDishType, setCurrentDishType] = useState({});
  const [currentDishDesc, setCurrentDishDesc] = useState({});
  const [currentImageName, setCurrentImageName] = useState({});
  const [currentPrice, setCurrentPrice] = useState({});
  const [currentMenuFlag, setCurrentMenuFlag] = useState("");
  const [currentIngredientFlag, setCurrentIngredientFlag] = useState("");
  const [currentSize, setCurrentSize] = useState("");
  const [productImage, setProductImage] = useState({});
  const [page, setPage] = useState(1);
  const [productsOfPage, setProductsOfPage] = useState([]);
  const [isSave, setIsSave] = useState({});
  const [sectionKeyword, setSectionKeyword] = useState("");
  const [categoryKeyword, setCategoryKeyword] = useState("");
  const [nameKeyword, setNameKeyword] = useState("");
  const [firstProductList, setFirstProductList] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(
        getProductsNew(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      ).then((res) => {
        if (res) {
          setFirstProductList(res);
        }
      });

      dispatch(
        getAllSections(selectedStoreObj.restaurantId, selectedStoreObj.storeId)
      );

      dispatch(
        getAllSectionsWithDishes(
          selectedStoreObj.restaurantId,
          selectedStoreObj.storeId
        )
      );
    }
  }, [selectedStoreObj]);

  useEffect(() => {
    console.log(sectionKeyword, categoryKeyword, nameKeyword);
    if (selectedStoreObj) {
      if (isSearched && !sectionKeyword && !categoryKeyword && !nameKeyword) {
        dispatch(
          getProductsNew(
            selectedStoreObj.restaurantId,
            selectedStoreObj.storeId
          )
        ).then((res) => {
          if (res) {
            setFirstProductList(res);
            dispatch(
              getProductsNewWithPaging(
                selectedStoreObj.restaurantId,
                selectedStoreObj.storeId,
                Number(page - 1) * itemsPerPage,
                page * itemsPerPage,
                res,
                sectionKeyword,
                categoryKeyword,
                nameKeyword,
                res
              )
            ).then((res) => {
              setProductsOfPage(res);
            });
          }
        });
      } else {
        dispatch(
          getProductsNewWithPaging(
            selectedStoreObj.restaurantId,
            selectedStoreObj.storeId,
            Number(page - 1) * itemsPerPage,
            page * itemsPerPage,
            productList,
            sectionKeyword,
            categoryKeyword,
            nameKeyword,
            firstProductList
          )
        ).then((res) => {
          setProductsOfPage(res);
        });
      }
    }
  }, [page, selectedStoreObj, sectionKeyword, categoryKeyword, nameKeyword]);

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

  const handlePage = (event, value) => {
    setPage(value);
  };

  const handleProductImage = (e, id) => {
    if (e.target.files[0].size > 400000) {
      toast.error("File is too big. Please enter a image under 400 kb!");
      return;
    }

    if (e.target.files[0].type !== "image/jpeg") {
      toast.error("Only JPG images are accepted!");
      return;
    }

    let images = { ...productImage, [id]: e.target.files[0] };
    setProductImage(images);
    console.log(images);
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  return (
    <div>
      <Row className="align-items-center">
        <div style={{ minWidth: "180px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Select Store
          </Typography>
        </div>
        <Col sm={2}>
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
        <Col sm={4}>
          <Button
            sx={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              padding: "5px 16px",
            }}
            variant="contained"
            color="success"
          >
            ADD NEW DISH
          </Button>
        </Col>
      </Row>
      <Row className="align-items-center mt-2">
        <div style={{ minWidth: "180px" }}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            Add new Dish Section
          </Typography>
        </div>
        <Col sm={2}>
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
        <Col sm={2}>
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
        <TableContainer className="mt-2" sx={{ maxHeight: 430, width: "101%" }}>
          <Table sx={{ minWidth: 1700 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <CusTableCell align="center">No</CusTableCell>
                <CusTableCell align="center">Store Name</CusTableCell>
                <CusTableCell2 align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Dish Section &nbsp;
                    <CusTextField2
                      value={sectionKeyword}
                      onChange={(event) => {
                        setIsSearched(true);
                        setSectionKeyword(event.target.value);
                      }}
                      sx={{ width: "150px" }}
                      label="Search"
                    />
                  </div>
                </CusTableCell2>
                <CusTableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Dish Category &nbsp;
                    <CusTextField2
                      value={categoryKeyword}
                      onChange={(event) => {
                        setIsSearched(true);
                        setCategoryKeyword(event.target.value);
                      }}
                      sx={{ width: "150px" }}
                      label="Search"
                    />
                  </div>
                </CusTableCell>
                <CusTableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Dish Name &nbsp;
                    <CusTextField2
                      value={nameKeyword}
                      onChange={(event) => {
                        setIsSearched(true);
                        setNameKeyword(event.target.value);
                      }}
                      sx={{ width: "150px" }}
                      label="Search"
                    />
                  </div>
                </CusTableCell>
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
              {productListLoading ? (
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
                  {productList && productList.length > 0 && productsOfPage ? (
                    <>
                      {productsOfPage.map((product, index) => (
                        <TableRow key={product.id}>
                          <CusTableCell align="center">
                            {index + 1 + (page - 1) * itemsPerPage}
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "175px" }}
                          >
                            <FormControl fullWidth>
                              <CusNativeSelect
                                defaultValue={`${
                                  product.restaurantId - product.storeId
                                }`}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleRestaurentUpdate}
                                sx={{
                                  fontSize: "0.75rem",
                                  "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor:
                                      isSave[product.id] && "black",
                                  },
                                }}
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
                              </CusNativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "100px" }}
                          >
                            <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={product.section}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleSectionUpdate}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={!isSave[product.id]}
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
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "100px" }}
                          >
                            <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={product.dish}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleDishUpdate}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={!isSave[product.id]}
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
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "150px" }}
                          >
                            <CusTextField
                              disabled={!isSave[product.id]}
                              key={product.id}
                              defaultValue={product.dishType}
                              value={currentDishType[product.id]}
                              onChange={(event) => {
                                const dishTypes = {
                                  ...currentDishType,
                                  [product.id]: event.target.value,
                                };
                                setCurrentDishType(dishTypes);
                              }}
                              fullWidth
                              variant="standard"
                            />
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "50px" }}
                          >
                            <FormControl fullWidth>
                              <NativeSelect
                                defaultValue={product.dishCategory}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleVegUpdate}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={!isSave[product.id]}
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
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "130px" }}
                          >
                            <FormControl fullWidth>
                              <NativeSelect
                                disabled={!isSave[product.id]}
                                defaultValue={product.dishSpiceIndicatory}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleSpiceUpdate}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                <option
                                  value={""}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  None
                                </option>
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
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "250px" }}
                          >
                            <CusTextField
                              disabled={!isSave[product.id]}
                              key={product.id}
                              defaultValue={product.dishDescriptionId}
                              value={currentDishDesc[product.id]}
                              onChange={(event) => {
                                const dishDescriptionIds = {
                                  ...currentDishDesc,
                                  [product.id]: event.target.value,
                                };
                                setCurrentDishDesc(dishDescriptionIds);
                              }}
                              fullWidth
                              variant="standard"
                            />
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "80px" }}
                          >
                            <NativeSelect
                              disabled={!isSave[product.id]}
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
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "70px" }}
                          >
                            <div style={{ display: "flex" }}>
                              &nbsp;
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  marginTop: "0.25rem",
                                  color: isSave[product.id]
                                    ? "black"
                                    : "rgb(0,0,0, 0.38)",
                                }}
                              >
                                Rs.{" "}
                              </span>
                              <CusTextField
                                disabled={!isSave[product.id]}
                                key={product.id}
                                defaultValue={product.price}
                                value={currentPrice[product.id]}
                                onChange={(event) => {
                                  const prices = {
                                    ...currentPrice,
                                    [product.id]: event.target.value,
                                  };
                                  setCurrentPrice(prices);
                                }}
                                fullWidth
                                variant="standard"
                              />
                            </div>
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ display: "flex", minWidth: "450px" }}
                          >
                            <Form.Group
                              controlId="formFileSm"
                              className="mb-1"
                              style={{ width: "175px" }}
                            >
                              <Form.Control
                                disabled={!isSave[product.id]}
                                type="file"
                                size="sm"
                                accept=".jpg"
                                maxFileSize={400000}
                                onChange={(e) => {
                                  handleProductImage(e, product.id);
                                }}
                              />
                            </Form.Group>
                            {/* <div className="input-group mb-1">
                              <input
                                type="file"
                                name="productImage"
                                className="form-control"
                                id="inputGroupFile01"
                                accept=".jpg"
                                max={400000}
                              
                                onChange={(e) => {
                                  handleProductImage(e, product.id);
                                }}
                                style={{ fontSize: "12px" }}
                              />
                            </div> */}
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: isSave[product.id]
                                  ? "black"
                                  : "rgb(0,0,0, 0.38)",
                              }}
                            >
                              Current Image : {product.imagePath}
                            </Typography>

                            {/* <CusTextField
                              defaultValue={product.imagePath}
                              value={currentImageName[product.id]}
                              onChange={(event) => {
                                const imagePaths = {
                                  ...currentImageName,
                                  [product.id]: event.target.value,
                                };
                                setCurrentImageName(imagePaths);
                              }}
                              fullWidth
                              variant="standard"
                            /> */}
                          </CusTableCell>
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "50px" }}
                          >
                            <NativeSelect
                              disabled={!isSave[product.id]}
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
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "50px" }}
                          >
                            <NativeSelect
                              disabled={!isSave[product.id]}
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
                          <CusTableCell
                            align="center"
                            style={{ minWidth: "130px" }}
                          >
                            {product.ingredientExistsFalg === "Y" ? (
                              <Button
                                sx={{
                                  fontSize: "0.75rem",
                                  lineHeight: "1rem",
                                  padding: "5px 16px",
                                }}
                                disabled={!isSave[product.id]}
                              >
                                Add Toppings
                              </Button>
                            ) : null}
                          </CusTableCell>
                          <CusTableCell align="center">
                            {isSave[product.id] ? (
                              <Button
                                key={product.id}
                                variant="contained"
                                color="success"
                                sx={{
                                  fontSize: "0.75rem",
                                  lineHeight: "1rem",
                                  padding: "5px 16px",
                                }}
                                onClick={() => {
                                  onSaveClickHandle(product.id);
                                }}
                              >
                                Save
                              </Button>
                            ) : (
                              <Button
                                key={product.id}
                                variant="contained"
                                color="warning"
                                sx={{
                                  fontSize: "0.75rem",
                                  lineHeight: "1rem",
                                  padding: "5px 16px",
                                }}
                                onClick={() => {
                                  onEditClickHandle(product.id);
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
      {productList && productList.length > 0 && selectedStore ? (
        <div
          className="mt-3"
          style={{ justifyContent: "center", display: "flex" }}
        >
          <Pagination
            count={Math.ceil(productList.length / itemsPerPage)}
            page={page}
            onChange={handlePage}
          />
        </div>
      ) : null}
    </div>
  );
};
