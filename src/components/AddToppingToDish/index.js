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
import {withStyles} from "@material-ui/core";
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

  const [page, setPage] = useState(1);
  const [ToppingssOfPage, setToppingssOfPage] = useState([]);
  const [productsOfPage, setProductsOfPage] = useState([]);
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
        // ToppingssOfPage.forEach(() => {
        //   console.log('hi');
        // })
      });
    }
  }, [page, selectedStoreObj]);

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
          {selectedStore === '' ? <h5 align="center" style={{ color: '#688789', marginTop: '2rem'}}>Please select a store</h5> : (
            <TableContainer className="mt-2" sx={{ maxHeight: 530, maxWidth: 'full'}} style={{ overflowX: "initial" }}>
              <Table sx={{ minWidth: 3700 }} stickyHeader>
              <TableHead>
                  <Fragment>
                    <TableRow>
                      <CusTableCell align="center"  style={{ backgroundColor: '#2f5597', color: '#ffffff', width: 100, position: 'sticky', left: 0}}>Dish<br/>Selection</CusTableCell>
                      <CusTableCell align="center"  style={{ backgroundColor: '#2f5597', color: '#ffffff', width: 100, position: 'sticky', left: 0 }}>Dish<br/>Category</CusTableCell>
                      <CusTableCell align="center"  style={{ backgroundColor: '#2f5597', color: '#ffffff', width: 150, position: 'sticky', left: 0 }}>Dish<br/>Name</CusTableCell>
                      <CusTableCell align="center"  style={{ backgroundColor: '#2f5597', color: '#ffffff', width: 70, position: 'sticky', left: 0 }}>Size</CusTableCell>
                        {ToppingssOfPage.map((item) => (
                          <CusTableCell  >
                            <div align="center" style={{ backgroundColor: '#688789', color: '#ffffff',}} >{item.size}</div>
                            <div align="center" style={{ backgroundColor: '#fff2cc', color: '#1e1e1e',}}>{item.ingredientType}</div>
                          </CusTableCell>
                        ))}
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
                          
                            {productsOfPage.map((item) => (
                              <TableRow>
                              <CusTableCell key={item.id} align="center">{item.section}</CusTableCell>
                              <CusTableCell key={item.id} align="center">{item.dishCategory}</CusTableCell>
                              <CusTableCell key={item.id} align="center">{item.dish}</CusTableCell>
                              <CusTableCell key={item.id} align="center">{item.productSize}</CusTableCell>
                              {ToppingssOfPage.map((item) => (
                                <CusTableCell key={item.id}><div style={{ display: 'flex', justifyContent: 'center', paddingLeft: '1rem', paddingTop: '0.3rem'}}><FormControlLabel control={<Checkbox />} /></div></CusTableCell>
                              ))}
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
          )}
        
        
      </div>
    </div>
  );
};