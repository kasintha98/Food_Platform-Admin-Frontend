import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Modal, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Alert,
  Button,
  Typography,
  FormControl,
  NativeSelect,
  TextField,
  IconButton,
  Autocomplete,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from '@mui/icons-material/Done';
import {
  getActiveRecipes,
  getActiveInventory,
  saveUpdateRecipeItem,
  deleteRecipeItem,
  getCustomerDetails,
} from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import Layout from "../../containers/NewLayout"

const MyPaginate = styled(ReactPaginate)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const CusAutocomplete = styled(Autocomplete)`
  & input {
    font-size: 0.75rem;
    padding: 0 !important;
    height: 0.75rem !important;
  }

  & legend {
    font-size: 0.75rem !important;
    padding: 0;
  }

  & label {
    font-size: 0.75rem !important;
    padding: 0 !important;
    top: -15px;
  }

  & .MuiAutocomplete-root label {
    top: 0px !important;
  }
`;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #35455e;
  color: #fff;
`;

const SaveButton = styled(Button)`
  background-color: #92d050;
  width: 150px;
  color: #fff;
  border-radius: 10px;

  &:hover {
    background-color: #7cbf33;
    color: #fff;
  }
`;

// const CusTableCell = styled(TableCell)`
//   padding: 0;
//   font-size: 14px;
//   border: 1px solid #000;
// `;

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 0.75rem;
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

 & .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color:  #404040;
  }
`;

const CusTypo = styled(Typography)`
  color: #7f7f7f;
  font-weight: bold;
`;

export const RecipeMaster = () => {
  const activeRecipes = useSelector((state) => state.inventory.activeRecipes);
  const activeRecipesLoading = useSelector(
    (state) => state.inventory.activeRecipesLoading
  );

  // const activeInventory = useSelector(
  //   (state) => state.inventory.activeInventory
  // );

  const activeInventory = useSelector(
    (state) => state.inventory.activeInventory.filter(recipe => {
      return recipe.itemCategory === "RECIPE";
    })
  );

  // console.log("******* activeInventory ********");
  // console.log(activeInventory);

  const activeInventoryLoading = useSelector(
    (state) => state.inventory.activeInventoryLoading
  );
  const uomList = useSelector((state) => state.inventory.uomList);
  const user = useSelector((state) => state.auth.user);
  const productListMaster = useSelector(
    (state) => state.product.masterProducts
  );
  const productListLoading = useSelector((state) => state.product.loading);

  const [pagination, setPagination] = useState({
    data: productListMaster,
    offset: 0,
    numberPerPage: 20,
    pageCount: 0,
    currentData: productListMaster.slice(0, 20),
  });
  const [showAdd, setShowAdd] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentItemQty, setCurrentItemQty] = useState({});
  const [itemUom, setItemUOM] = useState({});
  const [itemIngredient, setItemIngredient] = useState({});
  const [currentItemCost, setCurrentItemCost] = useState({});
  const [isAddNew, setIsAddNew] = useState(false);

  const [newItemQty, setNewItemQty] = useState("");
  const [newItemUOM, setNewItemUOM] = useState("");
  const [newItemIngredient, setNewItemIngredient] = useState("");
  const [newItemIngredientObj, setNewItemIngredientObj] = useState(null);
  const [newItemCost, setNewItemCost] = useState("");
  const [changed, setChanged] = useState(false);

  const [itemCostPerUnit, setitemCostPerUnit] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveRecipes());
    dispatch(getActiveInventory());
  }, []);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: productListMaster.length / prevState.numberPerPage,
      currentData: productListMaster.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, productListMaster]);

  const getIngredientsByProductId = (id, list) => {
    let filtered = list.filter((x) => x.productId === id);
    return filtered;
  };

  const calcMenuCost = (id, list) => {
    const items = getIngredientsByProductId(id, list);
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      // total = total + Number(items[i].itemQty) * Number(items[i].itemCost);
      total = total +  Number(items[i].itemCost);
    }

    return total.toFixed(2);
  };

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    setIsAddNew(false);
    clearData();
    setChanged(false);
  };
  const handleShowAdd = () => setShowAdd(true);

  const saveNewIngredient = () => {
    /* if (isAddNew) {
      if (!newItemIngredient || !newItemIngredientObj) {
        toast.error("Please select ingredient to add new ingredient item!");
        return;
      }

      if (!newItemQty) {
        toast.error("Please select quantity to add new ingredient item!");
        return;
      }

      const newItem = {
        restaurantId: "R001",
        productId: currentProduct.productId,
        itemId: newItemIngredientObj.itemId,
        itemQty: newItemQty,
        itemCost: newItemCost ? newItemCost : "0.0",
        itemUom: newItemUOM,
        itemStatus: "ACTIVE",
        createdBy: user.loginId,
        createdDate: new Date(),
        updatedBy: user.loginId,
        updatedDate: new Date(),
      };
      setChanged(true);
      dispatch(saveUpdateRecipeItem(newItem));
    } */

    const allList = getIngredientsByProductId(
      currentProduct.productId,
      activeRecipes
    );

    for (let i = 0; i < allList.length; i++) {
      const newItem = {
        restaurantId: allList[i].restaurantId,
        productId: allList[i].productId,
        itemId: itemIngredient[allList[i].itemId]
          ? itemIngredient[allList[i].itemId]
          : allList[i].itemId,
        itemQty: currentItemQty[allList[i].itemId]
          ? currentItemQty[allList[i].itemId]
          : allList[i].itemQty,
        itemCost: currentItemCost[allList[i].itemId]
          ? currentItemCost[allList[i].itemId]
          : allList[i].itemCost,
        itemUom: itemUom[allList[i].itemId]
          ? itemUom[allList[i].itemId]
          : allList[i].itemUom,
      };

      const oldItem = {
        restaurantId: allList[i].restaurantId,
        productId: allList[i].productId,
        itemId: allList[i].itemId,
        itemQty: allList[i].itemQty,
        itemCost: allList[i].itemCost,
        itemUom: allList[i].itemUom,
      };

      if (JSON.stringify(newItem) !== JSON.stringify(oldItem)) {
        const newObj = {
          ...newItem,
          id: allList[i].id,
          itemStatus: "ACTIVE",
          createdBy: allList[i].createdBy,
          createdDate: allList[i].createdDate,
          updatedBy: user.loginId,
          updatedDate: new Date(),
        };
        setChanged(true);
        dispatch(saveUpdateRecipeItem(newObj));
      }
    }

    if (!changed) {
      /* toast.success("Nothing Changed!"); */
      handleCloseAdd();
    }
  };

  const saveNewIngredientToProduct = () => {
    if (!newItemIngredient || !newItemIngredientObj) {
      toast.error("Please select ingredient to add new ingredient item!");
      return;
    }

    if (!newItemQty) {
      toast.error("Please select quantity to add new ingredient item!");
      return;
    }

    const newItem = {
      restaurantId: "R001",
      productId: currentProduct.productId,
      itemId: newItemIngredientObj.itemId,
      itemQty: newItemQty,
      itemCost: newItemCost ? newItemCost : "0.0",
      /* itemUom: newItemUOM, */
      itemUom: newItemUOM,
      itemStatus: "ACTIVE",
      createdBy: user.loginId,
      createdDate: new Date(),
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };
    //setChanged(true);

    // console.log("------------");
    // console.log(newItem)
    dispatch(saveUpdateRecipeItem(newItem)).then((res)=>{
      if(res){
        clearData()
        setIsAddNew(false);
      }
    })
  }

  const clearData = () => {
    setCurrentItemQty({});
    setItemUOM({});
    setItemIngredient({});
    setCurrentItemCost({});
  };

  const deleteIngredient = (id) => {
    dispatch(deleteRecipeItem(id, user.loginId));
  };

  // console.log("******* activeInventory ********");
  // console.log(activeInventory);

  // const finalData = []; 

  const cleanBeforeAddNew = () => {
    setNewItemIngredientObj({});
    setNewItemIngredientObj({});
    setNewItemCost();
    setNewItemQty();
    setNewItemUOM();
  }

  const getCustomerDetails = (event) => {
    // console.log("******* Item ********");
    // console.log(event);

    const finalData = JSON.parse(event);
    setNewItemIngredientObj(finalData);
    setNewItemUOM(finalData.itemUom)

    setNewItemIngredient(finalData.itemId);
    setitemCostPerUnit(finalData.itemUnitCost);
   
  }

  const calculateFinalCost = (qty) => {
    var finalCost = itemCostPerUnit * qty;
    setNewItemCost(finalCost);
  }

  const getTotalCost = (id, qty) => {
    let match = activeInventory.find((x) => x.itemId === id);
    if(match){
      return Number(match.itemUnitCost) * Number(qty)
    }else{
      return 0;
    }
  }

  const renderAddModal = () => {
    return (
      <Modal
        size="lg"
        show={showAdd}
        onHide={handleCloseAdd}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct ? currentProduct.dishType : "ADD"}
          </Modal.Title>
        </Modal.Header>
        {currentProduct ? (
          <Modal.Body>
            <Row style={{marginBottom:'10px'}}>
              <Col xs={5} align="center">
                <CusTypo style={{fontFamily: 'Roboto, sans-serif', fontSize:14}}>INGREDIENTS</CusTypo>
              </Col>
              <Col xs={2} align="center">
                <CusTypo style={{fontFamily: 'Roboto, sans-serif', fontSize:14}}>QUANTITY</CusTypo>
              </Col>
              <Col xs={2} align="center">
                <CusTypo style={{fontFamily: 'Roboto, sans-serif', fontSize:14}}>UOM</CusTypo>
              </Col>
              <Col xs={2} align="center">
                <CusTypo style={{fontFamily: 'Roboto, sans-serif', fontSize:14}}>COST</CusTypo>
              </Col>
              <Col xs={1} align="center"></Col>
            </Row>
            <div style={{backgroundColor:'#7f7f7f',height:'0.5px',marginBottom:'5px'}}></div>

            {getIngredientsByProductId(
              currentProduct.productId,
              activeRecipes
            ).map((item) => (
              <Row>
                <Col xs={5} align="center">
                  {/* <FormControl fullWidth>
                    <NativeSelect
                      key={item.itemId}
                      defaultValue={item.itemId}
                      inputProps={{
                        name: "status",
                        id: "uncontrolled-native",
                      }}
                      onChange={(event) => {
                        let ing = {
                          ...itemIngredient,
                          [item.itemId]: event.target.value,
                        };
                        setItemIngredient(ing);
                      }}
                      sx={{ fontSize: "0.75rem" }}
                    >
                      {activeInventory &&
                        activeInventory.map((item) => (
                          <option
                            value={item.itemId}
                            style={{ fontSize: "0.75rem" }}
                          >
                            {item.itemName}
                          </option>
                        ))}
                      <option value={""} style={{ fontSize: "0.75rem" }}>
                        Select Ingredient
                      </option>
                    </NativeSelect>
                  </FormControl> */}

                  <CusAutocomplete
                    onChange={(event, newValue) => {
                      let ing = {
                        ...itemIngredient,
                        [item.itemId]: newValue ? newValue.itemId : null,
                      };
                      setItemIngredient(ing);
                    }}
                    defaultValue={item}
                    sx={{
                      fontSize: "0.75rem",
                      marginTop: "9px",
                      ".MuiFormControl-root": { marginTop: "4px" },
                    }}
                    options={activeInventory}
                    autoHighlight
                    getOptionLabel={(option) => option.itemName}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{
                          "& > img": { mr: 2, flexShrink: 0 },
                          fontSize: "0.75rem",
                        }}
                        {...props}
                      >
                        {option.itemName}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ fontSize: "0.75rem" }}
                        variant="standard"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Col>
                <Col xs={2} align="center">
                  <CusTextField
                    key={item.itemId}
                    defaultValue={item.itemQty}
                    value={currentItemQty[item.itemId]}
                    onChange={(event) => {
                      const qty = {
                        ...currentItemQty,
                        [item.itemId]: event.target.value,
                      };
                      setCurrentItemQty(qty);
                      const ost = {
                        ...currentItemCost,
                        [item.itemId]: getTotalCost(item.itemId, event.target.value),
                      };
                      setCurrentItemCost(ost);
                    }}
                    fullWidth
                    variant="standard"
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Col>
                <Col xs={2} align="center">
                  {/* <FormControl fullWidth>
                    <NativeSelect
                      key={item.itemId}
                      defaultValue={item.itemUom}
                      inputProps={{
                        name: "status",
                        id: "uncontrolled-native",
                      }}
                      onChange={(event) => {
                        let uom = { ...itemUom, [item.itemId]: event.target.value };
                        setItemUOM(uom);
                      }}
                      sx={{ fontSize: "0.75rem" }}
                    >
                      {uomList &&
                        uomList.map((itemUom) => (
                          <option
                            value={itemUom.configCriteriaValue}
                            style={{ fontSize: "0.75rem" }}
                          >
                            {itemUom.configCriteriaDesc}
                          </option>
                        ))}
                      <option value={""} style={{ fontSize: "0.75rem" }}>
                        Select UOM
                      </option>
                    </NativeSelect>
                  </FormControl> */}
                  <Typography sx={{ fontSize: "0.75rem" }}>
                    {item.itemUom}
                  </Typography>
                </Col>
                <Col xs={2} align="center">
                  <CusTextField
                    key={item.itemId}
                    defaultValue={item.itemCost}
                    value={currentItemCost[item.itemId]}
                    onChange={(event) => {
                      const ost = {
                        ...currentItemCost,
                        [item.itemId]: event.target.value,
                      };
                      setCurrentItemCost(ost);
                    }}
                    fullWidth
                    variant="standard"
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Col>
                <Col xs={1} align="center">
                  <IconButton
                    key={item.itemId}
                    sx={{
                      fontSize: "0.75rem",
                      color: "red",
                    }}
                    onClick={() => {
                      deleteIngredient(item.id);
                    }}
                  >
                    <DeleteIcon
                      sx={{ height: "0.95rem", width: "0.95rem" }}
                    ></DeleteIcon>
                  </IconButton>
                </Col>
              </Row>
            ))}
            {isAddNew ? (
              <Row>
                <Col xs={5} align="center">
                  <FormControl fullWidth>

                  <NativeSelect
                      inputProps={{
                        name: "status",
                        id: "uncontrolled-native",
                      }}
                      onChange={(event) => {
                        // setNewItemIngredient(event.target.value);
                        getCustomerDetails(event.target.value);
                      }}
                      sx={{ fontSize: "0.75rem" }}
                    >
                      <option
                        value={""}
                        style={{ fontSize: "0.75rem" }}
                        onClick={() => {
                          setNewItemIngredientObj({});
                        }}
                      >
                        Select Ingredient
                      </option>
                      {activeInventory &&
                        activeInventory.map((item) => (
                          <option
                            value={JSON.stringify(item)}
                            style={{ fontSize: "0.75rem" }}
                            onClick={() => {
                              // setNewItemIngredientObj(item);                             
                            }}
                          >
                            {item.itemName}
                          </option>
                        ))}
                    </NativeSelect>



                    {/* <NativeSelect
                      inputProps={{
                        name: "status",
                        id: "uncontrolled-native",
                      }}
                      onChange={(event) => {
                        setNewItemIngredient(event.target.value);
                      }}
                      sx={{ fontSize: "0.75rem" }}
                    >
                      <option
                        value={""}
                        style={{ fontSize: "0.75rem" }}
                        onClick={() => {
                          setNewItemIngredientObj({});
                        }}
                      >
                        Select Ingredient
                      </option>
                      {activeInventory &&
                        activeInventory.map((item) => (
                          <option
                            value={item.itemId}
                            style={{ fontSize: "0.75rem" }}
                            onClick={() => {
                              setNewItemIngredientObj(item);
                            }}
                          >
                            {item.itemName}
                          </option>
                        ))}
                    </NativeSelect> */}
                  </FormControl>
                </Col>
                <Col xs={2} align="center">
                  <CusTextField
                    value={newItemQty}
                    onChange={(event) => {
                      setNewItemQty(event.target.value);
                      calculateFinalCost(event.target.value);
                    }}
                    fullWidth
                    variant="standard"
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Col>
                <Col xs={2} align="center">
                  {/* <FormControl fullWidth>
                    <NativeSelect
                      inputProps={{
                        name: "status",
                        id: "uncontrolled-native",
                      }}
                      onChange={(event) => {
                        setNewItemUOM(event.target.value);
                      }}
                      sx={{ fontSize: "0.75rem" }}
                    >
                      <option value={""} style={{ fontSize: "0.75rem" }}>
                        Select UOM
                      </option>
                      {uomList &&
                        uomList.map((itemUom) => (
                          <option
                            value={itemUom.configCriteriaValue}
                            style={{ fontSize: "0.75rem" }}
                          >
                            {itemUom.configCriteriaDesc}
                          </option>
                        ))}
                    </NativeSelect>
                  </FormControl> */}
                  <Typography sx={{ fontSize: "0.75rem" }}>
                    {newItemIngredientObj
                      ? newItemIngredientObj.itemUom
                      : "N/A"}     
                  </Typography>
                </Col>
                <Col xs={2} align="center">
                  <CusTextField
                    value={newItemCost}
                    onChange={(event) => {
                      setNewItemCost(event.target.value);
                    }}
                    fullWidth
                    variant="standard"
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Col>
                <Col xs={1} align="center">
                  {/* <Row>
                    <Col>
                    <IconButton
                    sx={{
                      fontSize: "0.75rem",
                      color: "green",
                    }}
                    onClick={() => {
                      saveNewIngredientToProduct();
                    }}
                  >
                    <DoneIcon
                      sx={{ height: "0.95rem", width: "0.95rem" }}
                    ></DoneIcon>
                  </IconButton>
                  </Col>
                    <Col>
                    <IconButton
                    sx={{
                      fontSize: "0.75rem",
                      color: "red",
                    }}
                    onClick={() => {
                      setIsAddNew(false);
                    }}
                  >
                    <CloseIcon
                      sx={{ height: "0.95rem", width: "0.95rem" }}
                    ></CloseIcon>
                  </IconButton>
                  </Col>
                  </Row> */}
                  <IconButton
                    sx={{
                      fontSize: "0.75rem",
                      color: "green",
                    }}
                    onClick={() => {
                      saveNewIngredientToProduct();
                    }}
                  >
                    <DoneIcon
                      sx={{ height: "0.95rem", width: "0.95rem" }}
                    ></DoneIcon>
                  </IconButton>
                </Col>
              </Row>
            ) : null}
            <SaveButton
              className="mt-4"
              onClick={() => {
                setIsAddNew(true);
                cleanBeforeAddNew();
              }}
            >
              ADD ANOTHER
            </SaveButton>
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleCloseAdd}>
            Close
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              saveNewIngredient();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };


  const columns = [
    { id: 'restro', label: 'RESTAURANT', minWidth:80, align: 'center'},
    { id: 'prod_id', label: 'PRODUCT ID', minWidth: 120, align: 'center'},
    { id: 'dish', label: 'DISH NAME', minWidth: 150, align: 'center'},
    { id: 'cost', label: 'COST', minWidth: 150, align: 'center' },
    { id: 'recipe', label: 'RECIPE', minWidth: 500, align: 'center' },
    { id: 'action', label: 'ACTION', minWidth: 50, align: 'center'},
  ];

  return (
    <Layout sidebar headerTitle="RECIPE MASTER">
      <TableContainer component={Paper} sx={{ maxHeight: 430 }}>
        {/* <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">RESTAURANT</CusTableCell1>
              <CusTableCell1 align="center" sx={{ width: "150px" }}>PRODUCT ID</CusTableCell1>
              <CusTableCell1 align="center">DISH NAME</CusTableCell1>
              <CusTableCell1 align="center"  sx={{ width: "150px" }}>COST</CusTableCell1>
              <CusTableCell1 align="center">RECIPE</CusTableCell1>
              <CusTableCell1 align="center">ACTION</CusTableCell1>
            </TableRow>
          </TableHead> */}

    <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <CusTableCell1
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth,
                    lineHeight:"1.4rem" }}
                  >
                    {column.label}
                  </CusTableCell1>
                ))}
              </TableRow>
          </TableHead>
          <TableBody>
            {productListLoading ||
            activeRecipesLoading ||
            activeInventoryLoading ? (
              <TableRow>
                <TableCell colSpan={14}>
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
                {productListMaster && productListMaster.length > 0 ? (
                  <>
                    {productListMaster
                      .slice(
                        pagination.offset,
                        pagination.offset + pagination.numberPerPage
                      )
                      .map((item, index) => (
                        <TableRow key={item.itemId}>
                          <CusTableCell align="center">Hangries</CusTableCell>
                          <CusTableCell align="center">
                            {item.productId}
                          </CusTableCell>
                          <CusTableCell align="center">
                            {item.dishType}
                          </CusTableCell>
                          <CusTableCell align="center">
                            Rs. {calcMenuCost(item.productId, activeRecipes)}
                          </CusTableCell>
                          <CusTableCell align="center">
                            {getIngredientsByProductId(
                              item.productId,
                              activeRecipes
                            ).length > 0
                              ? getIngredientsByProductId(
                                  item.productId,
                                  activeRecipes
                                ).map((item) => <span>{item.itemName}, </span>)
                              : "No Data"}
                          </CusTableCell>
                          <CusTableCell align="center">
                            <Button
                              onClick={() => {
                                setCurrentProduct(item);
                                handleShowAdd();
                              }}
                            >
                              Edit
                            </Button>
                          </CusTableCell>
                        </TableRow>
                      ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={15}>
                      <Alert severity="warning">No items found!</Alert>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <MyPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      {renderAddModal()}
    </Layout>
  );
};
