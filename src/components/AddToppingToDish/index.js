import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import {
  getAllMenuIngredientsByRestoAndStoreId,
  getAllMenuIngredientsByRestoAndStoreIdWithPaging,
} from "../../actions";
import {
  getProductsNew,
  getAllSections,
  getAllSectionsWithDishes,
  getProductsNewWithPaging,
} from "../../actions";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
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
  Pagination,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

//const itemsPerPage = 50;

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

const useStyles = makeStyles({
  sticky: {
    position: "sticky",
    left: 0,
  }
});

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
  const [newDishSection, setNewDishSection] = useState("");
  const [newDishCategory, setNewDishCategory] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [currentDish, setCurrentDish] = useState("");
  const [currentVeg, setCurrentVeg] = useState("");
  const [currentSpice, setCurrentSpice] = useState("");
  const [currentDishType, setCurrentDishType] = useState({});
  const [currentDishDesc, setCurrentDishDesc] = useState({});
  const [currentImageName, setCurrentImageName] = useState({});
  const [currentMenuFlag, setCurrentMenuFlag] = useState("");
  const [productImage, setProductImage] = useState({});
  const [productsOfPage, setProductsOfPage] = useState([]);
  const [isSave, setIsSave] = useState({});
  const [sectionKeyword, setSectionKeyword] = useState("");
  const [categoryKeyword, setCategoryKeyword] = useState("");
  const [nameKeyword, setNameKeyword] = useState("");
  const [firstProductList, setFirstProductList] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const dispatch = useDispatch();
  const itemsPerPage = 33;

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
          productsOfPage.map((item) => {
            console.log(item);
          })
        });
      }
    }
  }, [page, selectedStoreObj, sectionKeyword, categoryKeyword, nameKeyword]);

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
          // Number(page - 1) * itemsPerPage,
          // page * itemsPerPage,
          // allMenuIngredients
        )
      ).then((res) => {
        setToppingssOfPage(res);
      });
    }
  }, [page, selectedStoreObj]);

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

  const handleToppingTypeUpdate = (event) => {
    setCurrentToppingType(event.target.value);
  };

  const classes = useStyles();

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
              minWidth: "120px",
            }}
            variant="contained"
            color="success"
          >
            ADD NEW DISH
          </Button>
        </Col>
      </Row>
      <div>
        <TableContainer className="mt-2" sx={{ maxHeight: 530, maxWidth: 'full'}}>
            <Table sx={{ minWidth: 1850 }} stickyHeader>
              <TableHead>
                <Fragment>
                  <TableRow>
                    <CusTableCell align="center"  style={{ backgroundColor: '#2f5597', color: '#ffffff', width: 100, position: 'sticky', left: 0}}>Dish<br/>Selection</CusTableCell>
                    <CusTableCell align="center"  style={{ backgroundColor: '#2f5597', color: '#ffffff', width: 100, position: 'sticky', left: 0 }}>Dish<br/>Category</CusTableCell>
                    <CusTableCell align="center"  style={{ backgroundColor: '#2f5597', color: '#ffffff', width: 150, position: 'sticky', left: 0 }}>Dish<br/>Name</CusTableCell>
                    <CusTableCell align="center"  style={{ backgroundColor: '#2f5597', color: '#ffffff', width: 70, position: 'sticky', left: 0 }}>Size</CusTableCell>
                    <div style={{ overflowX: 'auto', maxWidth: 1500 }} >
                      {ToppingssOfPage.map((item) => (
                        <CusTableCell  >
                          <div align="center" style={{ backgroundColor: '#688789', color: '#ffffff',}} >{item.size}</div>
                          <div align="center" style={{ backgroundColor: '#fff2cc', color: '#1e1e1e',}}>{item.ingredientType}</div>
                        </CusTableCell>
                      ))}
                    </div>
                  </TableRow>
                </Fragment>
              </TableHead>
              <TableBody>
                {menuIngredientsLoading ? (
                  <TableRow>
                    <TableCell>
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
                        {productsOfPage.map((product) => {
                            // <TableRow><CusTableCell>Hellow</CusTableCell></TableRow>
                            <TableRow key={product.id}>
                              <CusTableCell>{product.section}</CusTableCell>
                              <CusTableCell>{product.dish}</CusTableCell>
                              <CusTableCell>{product.dishCategory}</CusTableCell>
                              <CusTableCell>{product.productSize}</CusTableCell>
                              {/* <CusTableCell>
                              <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Label" />
                              </FormGroup>
                              </CusTableCell> */}
                            </TableRow>
                        })}
                        
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
    </div>
  );
};