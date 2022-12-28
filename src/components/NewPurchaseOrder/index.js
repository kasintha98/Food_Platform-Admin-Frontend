import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
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
  MenuItem,
  InputLabel,
  Select,
  Autocomplete,
  Box,
} from "@mui/material";
import {
  getActiveSuppliers,
  getActiveInventory,
  getInventoryPurchaseCategory,
  saveUpdatePurchaseOrder,
} from "../../actions";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

const CuTypography = styled(Typography)`
  color: #7f7f7f;
  font-weight: bold;
  font-size: 0.75rem;
  line-height: 1rem;
`;
const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #00b0f0;
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

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
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

const CusDesktopDatePicker = styled(DesktopDatePicker)`
  & input {
    font-size: 0.75rem;
    padding: 0 !important;
  }

  &.MuiOutlinedInput-input {
    padding: 0 !important;
  }

  &.MuiInputBase-input {
    padding: 0 !important;
  }

  &.MuiInputBase-inputAdornedEnd {
    padding: 0 !important;
  }

  &.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 0 !important;
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

 & .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color:  #404040;
  }
`;

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
`;

export const NewPurchaseOrder = () => {
  const stores = useSelector((state) => state.store.stores);
  const allSuppliers = useSelector((state) => state.inventory.allSuppliers);
  const user = useSelector((state) => state.auth.user);
  const allSuppliersLoading = useSelector(
    (state) => state.inventory.allSuppliersLoading
  );
  const activeInventory = useSelector(
    (state) => state.inventory.activeInventory
  );
  const activeInventoryLoading = useSelector(
    (state) => state.inventory.activeInventoryLoading
  );
  const purchaseOrderCategoryLoading = useSelector(
    (state) => state.inventory.purchaseOrderCategoryLoading
  );
  const purchaseOrderCategory = useSelector(
    (state) => state.inventory.purchaseOrderCategory
  );
  const [addedList, setAddedList] = useState({});
  const [addedListArray, setAddedListArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [selectedSupplierObj, setSelectedSupplierObj] = useState(null);
  const [billNo, setBillNo] = useState("");
  const [billDate, setBillDate] = useState(new Date());
  const [isAddNew, setIsAddNew] = useState(false);
  const [newItemQty, setNewItemQty] = useState("");
  const [newItemWastage, setNewItemWastage] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemDiscount, setNewItemDiscount] = useState("");
  const [newItemStock, setNewItemStock] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("STANDARD");
  const [isSave, setIsSave] = useState({});
  const [currentSelectedItem, setCurrentSelectedItem] = useState({});
  const [currentItemQty, setCurrentItemQty] = useState({});
  const [currentItemWastage, setCurrentItemWastage] = useState({});
  const [currentItemPrice, setCurrentItemPrice] = useState({});
  const [currentItemDiscount, setCurrentItemDiscount] = useState({});
  const [currentItemTotalStock, setCurrentItemTotalStock] = useState({});
  const [currentItemCategory, setCurrentItemCategory] = useState({});
  const handleChangeBillDate = (newValue) => {
    setBillDate(newValue);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveSuppliers());
    dispatch(getActiveInventory());
    dispatch(getInventoryPurchaseCategory());
  }, []);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleChangeSupplier = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleSelectedSupplier = (supplier) => {
    setSelectedSupplierObj(supplier);
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const addItemToList = () => {
    if (!selectedItem) {
      toast.error("Please select an ingredient!");
      return;
    }

    if (!newItemCategory) {
      toast.error("Please select a category!");
      return;
    }
    const newObj = {
      itemId: selectedItem.itemId,
      itemName: selectedItem.itemName,
      itemUom: selectedItem.itemUom,
      itemQuantity: newItemQty,
      itemWastage: newItemWastage,
      itemPrice: newItemPrice,
      itemDiscount: newItemDiscount,
      itemFinalPrice: Number(newItemPrice) - Number(newItemDiscount),
      itemTotalStock: Number(newItemQty) - Number(newItemWastage),
      itemGST: selectedItem.itemGstPercentage,
      itemGSTAmount: (
        (Number(newItemPrice) - Number(newItemDiscount)) *
        (Number(selectedItem ? selectedItem.itemGstPercentage : 0) / 100)
      ).toFixed(2),
      itemCategory: newItemCategory,
    };
    let a = { ...addedList, [selectedItem.itemId]: newObj };
    setAddedList(a);
    setAddedListArray(Object.values(a));
    setIsAddNew(false);
    clearData();
  };

  const updateItemHandle = (item) => {
    const newObj = {
      itemId: currentSelectedItem[item.itemId]
        ? currentSelectedItem[item.itemId].itemId
        : item.itemId,
      itemName: currentSelectedItem[item.itemId]
        ? currentSelectedItem[item.itemId].itemName
        : item.itemName,
      itemUom: currentSelectedItem[item.itemId]
        ? currentSelectedItem[item.itemId].itemUom
        : item.itemUom,
      itemQuantity: currentItemQty[item.itemId]
        ? currentItemQty[item.itemId]
        : item.itemQuantity,
      itemWastage: currentItemWastage[item.itemId]
        ? currentItemWastage[item.itemId]
        : item.itemWastage,
      itemPrice: currentItemPrice[item.itemId]
        ? currentItemPrice[item.itemId]
        : item.itemPrice,
      itemDiscount: currentItemDiscount[item.itemId]
        ? currentItemDiscount[item.itemId]
        : item.itemDiscount,
      itemFinalPrice: getFinalPrice(item),
      itemTotalStock: currentItemTotalStock[item.itemId]
        ? currentItemTotalStock[item.itemId]
        : item.itemTotalStock,
      itemGST: currentSelectedItem[item.itemId]
        ? currentSelectedItem[item.itemId].itemGstPercentage
        : item.itemGST,
      itemGSTAmount: (
        getFinalPrice(item) *
        (Number(
          currentSelectedItem[item.itemId]
            ? currentSelectedItem[item.itemId].itemGstPercentage
            : item.itemGST
        ) /
          100)
      ).toFixed(2),
      itemCategory: currentItemCategory[item.itemId]
        ? currentItemCategory[item.itemId]
        : item.itemCategory,
    };

    let a = { ...addedList, [newObj.itemId]: newObj };
    setAddedList(a);
    setAddedListArray(Object.values(a));
    onSaveClickHandle(item.itemId);
  };

  const deleteItemFromList = (id) => {
    let a = addedList;
    delete a[id];
    setAddedList(a);
    setAddedListArray(Object.values(a));
  };

  const saveUpdatePurchaseOrderToDB = () => {
    if (!addedList || Object.keys(addedList).length < 1) {
      toast.error("Add at least one item to save!");
      return;
    }

    /* if (!billNo) {
      toast.error("Bill number is mandatory!");
      return;
    } */

    if (!billDate) {
      toast.error("Bill date is mandatory!");
      return;
    }

    if (!selectedStoreObj) {
      toast.error("Receiving store  is mandatory!");
      return;
    }

    if (!selectedSupplierObj) {
      toast.error("Supplier is mandatory!");
      return;
    }

    for (let i = 0; i < Object.keys(addedList).length; i++) {
      let newObj = {
        restaurantId: selectedStoreObj.restaurantId,
        storeId: selectedStoreObj.storeId,
        supplierId: selectedSupplierObj.supplierId,
        purchaseDate: billDate,
        billNumber: billNo,
        itemId: Object.values(addedList)[i].itemId,
        purchaseQty: Object.values(addedList)[i].itemQuantity,
        wastageQty: Object.values(addedList)[i].itemWastage,
        netQty:
          Number(Object.values(addedList)[i].itemQuantity) -
          Number(Object.values(addedList)[i].itemWastage),
        quotedPurchasePrice: Object.values(addedList)[i].itemPrice,
        discountAmount: Object.values(addedList)[i].itemDiscount,
        netPurchasePrice: Object.values(addedList)[i].itemFinalPrice,
        gstAmount: Object.values(addedList)[i].itemGSTAmount,
        purchaseCategory: Object.values(addedList)[i].itemCategory,
        purchaseOrderStatus: "SUBMITTED",
        createdBy: user.loginId,
        createdDate: new Date(),
        updatedBy: user.loginId,
        updatedDate: new Date(),
      };

      dispatch(saveUpdatePurchaseOrder(newObj)).then((res) => {
        if (res) {
          if (i === Object.keys(addedList).length - 1) {
            clearDataAll();
            toast.success("All items saved to database!");
          }
        }
      });
    }
  };

  const clearData = () => {
    setSelectedItem(null);
    setNewItemQty("");
    setNewItemWastage("");
    setNewItemPrice("");
    setNewItemDiscount("");
    setNewItemStock("");
    setNewItemCategory("STANDARD");
  };

  const clearDataAll = () => {
    setAddedList({});
    setAddedListArray([]);
    setSelectedItem(null);
    setSelectedStore("");
    setSelectedSupplier("");
    setSelectedStoreObj(null);
    setSelectedSupplierObj(null);
    setBillNo("");
    setBillDate(new Date());
    setIsAddNew(false);
    setNewItemQty("");
    setNewItemWastage("");
    setNewItemPrice("");
    setNewItemDiscount("");
    setNewItemStock("");
    setNewItemCategory("STANDARD");
    setIsSave({});
    setCurrentSelectedItem({});
    setCurrentItemQty({});
    setCurrentItemWastage({});
    setCurrentItemPrice({});
    setCurrentItemDiscount({});
    setCurrentItemTotalStock({});
    setCurrentItemCategory({});
  };

  const cancelPurchaseOrder = () => {
    clearDataAll();
    toast.success("All data cleared!");
  };

  const getFinalPrice = (item) => {
    if (!currentItemPrice[item.itemId] && !currentItemDiscount[item.itemId]) {
      return Number(item.itemFinalPrice);
    }

    if (currentItemPrice[item.itemId] && currentItemDiscount[item.itemId]) {
      return (
        Number(currentItemPrice[item.itemId]) -
        Number(currentItemDiscount[item.itemId])
      );
    }

    if (currentItemPrice[item.itemId] && !currentItemDiscount[item.itemId]) {
      return Number(currentItemPrice[item.itemId]) - Number(item.itemDiscount);
    }

    if (!currentItemPrice[item.itemId] && currentItemDiscount[item.itemId]) {
      return Number(item.itemPrice) - Number(currentItemDiscount[item.itemId]);
    }
  };

  return (
    <div>
      <div style={{ margin: "auto", width: "50%" }}>
        <Row className="row align-items-center">
          <Col sm={6} style={{ display: "flex" }}>
            <div style={{ width: "108px" }}>
              <CuTypography>Bill No :</CuTypography>
            </div>
            <div>
              <CusTextField
                value={billNo}
                onChange={(event) => {
                  setBillNo(event.target.value);
                }}
                fullWidth
                label="Enter Bill No"
              />
            </div>
          </Col>
          <Col sm={6} style={{ display: "flex" }}>
            <div style={{ width: "125px" }}>
              <CuTypography>Purchase Date</CuTypography>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CusDesktopDatePicker
                  fullWidth
                  label="Select date"
                  inputFormat="MM/dd/yyyy"
                  value={billDate}
                  onChange={handleChangeBillDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        fontSize: "0.75rem",

                        "& .MuiInputBase-input": {
                          fontSize: "0.75rem",
                          padding: "0.25rem",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
          </Col>
        </Row>
        <Row className="row align-items-center mt-3">
          <Col sm={12} style={{ display: "flex" }}>
            <div style={{ width: "125px" }}>
              <CuTypography>Supplier Name:</CuTypography>
            </div>
            <FormControl fullWidth>
              <InputLabel
                shrink={true}
                sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                id="demo-simple-select-label"
              >
                Please select the supplier
              </InputLabel>
              <CusSelect
                sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSupplier}
                label="Please select the supplier"
                onChange={handleChangeSupplier}
                notched={true}
              >
                {allSuppliers.map((supplier) => (
                  <MenuItem
                    onClick={() => {
                      handleSelectedSupplier(supplier);
                    }}
                    value={supplier.supplierId}
                  >
                    <span>
                      {supplier.supplierName}, {supplier.supplierAddress}
                    </span>
                  </MenuItem>
                ))}
              </CusSelect>
            </FormControl>
          </Col>
        </Row>
        <Row className="row align-items-center mt-3">
          <Col sm={12} style={{ display: "flex" }}>
            <div style={{ width: "125px" }}>
              <CuTypography>Receiving Store Name:</CuTypography>
            </div>
            <FormControl fullWidth>
              <InputLabel
                shrink={true}
                sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                id="demo-simple-select-label"
              >
                Please select the store
              </InputLabel>
              <CusSelect
                sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedStore}
                label="Please select the store"
                onChange={handleChangeStore}
                notched={true}
              >
                {stores.map((store) => (
                  <MenuItem
                    onClick={() => {
                      handleSelectedStore(store);
                    }}
                    value={store.resturantName}
                  >
                    <span>{store.resturantName}</span>
                  </MenuItem>
                ))}
              </CusSelect>
            </FormControl>
          </Col>
        </Row>
      </div>
      <div>
        <TableContainer
          className="mt-3"
          component={Paper}
          sx={{ maxHeight: 430 }}
        >
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <CusTableCell1 align="center">NO</CusTableCell1>
                <CusTableCell1 align="center">ITEM NO</CusTableCell1>
                <CusTableCell1 align="center">INGREDIENT NAME</CusTableCell1>
                <CusTableCell1 align="center">UOM</CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "60px" }}>
                  {/* QUANTITY */}QTY.
                </CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "60px" }}>
                  {/* WASTAGE */}WAST.
                </CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "80px" }}>
                  PRICE
                </CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "80px" }}>
                  DISCOUNT
                </CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "115px" }}>
                  FINAL PURCHASE PRICE
                </CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "60px" }}>
                  TOTAL STOCK
                </CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "80px" }}>
                  GST%
                </CusTableCell1>
                <CusTableCell1 align="center">GST AMT.</CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "80px" }}>
                  CATEGORY
                </CusTableCell1>
                <CusTableCell1 align="center" sx={{ maxWidth: "60px" }}>
                  REMARKS
                </CusTableCell1>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSuppliersLoading ||
              activeInventoryLoading ||
              purchaseOrderCategoryLoading ? (
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
                  {addedListArray &&
                    addedListArray.map((item, index) => (
                      <TableRow key={item.itemId}>
                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {index + 1}
                          </Typography>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {currentSelectedItem[item.itemId]
                              ? currentSelectedItem[item.itemId].itemId
                              : item.itemId}
                          </Typography>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusAutocomplete
                            disabled={!isSave[item.itemId]}
                            onChange={(event, newValue) => {
                              const items = {
                                ...currentSelectedItem,
                                [item.itemId]: newValue,
                              };
                              setCurrentSelectedItem(items);
                            }}
                            defaultValue={item}
                            sx={{
                              fontSize: "0.75rem",
                              marginTop: "15px",
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
                        </CusTableCell>
                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {currentSelectedItem[item.itemId]
                              ? currentSelectedItem[item.itemId].itemUom
                              : item.itemUom}
                          </Typography>
                        </CusTableCell>
                        <CusTableCell align="center" sx={{ maxWidth: "60px" }}>
                          <CusTextField
                            defaultValue={item.itemQuantity}
                            value={currentItemQty[item.itemId]}
                            onChange={(event) => {
                              const qty = {
                                ...currentItemQty,
                                [item.itemId]: event.target.value,
                              };
                              setCurrentItemQty(qty);
                            }}
                            fullWidth
                            variant="standard"
                            disabled={!isSave[item.itemId]}
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ maxWidth: "60px" }}>
                          <CusTextField
                            defaultValue={item.itemWastage}
                            value={currentItemWastage[item.itemId]}
                            onChange={(event) => {
                              const wastage = {
                                ...currentItemWastage,
                                [item.itemId]: event.target.value,
                              };
                              setCurrentItemWastage(wastage);
                            }}
                            fullWidth
                            variant="standard"
                            disabled={!isSave[item.itemId]}
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ maxWidth: "80px" }}>
                          <CusTextField
                            defaultValue={item.itemPrice}
                            value={currentItemPrice[item.itemId]}
                            onChange={(event) => {
                              const price = {
                                ...currentItemPrice,
                                [item.itemId]: event.target.value,
                              };
                              setCurrentItemPrice(price);
                            }}
                            fullWidth
                            variant="standard"
                            disabled={!isSave[item.itemId]}
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ maxWidth: "80px" }}>
                          <CusTextField
                            defaultValue={item.itemDiscount}
                            value={currentItemDiscount[item.itemId]}
                            onChange={(event) => {
                              const discount = {
                                ...currentItemDiscount,
                                [item.itemId]: event.target.value,
                              };
                              setCurrentItemDiscount(discount);
                            }}
                            fullWidth
                            variant="standard"
                            disabled={!isSave[item.itemId]}
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ maxWidth: "115px" }}>
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {getFinalPrice(item)}
                          </Typography>
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ maxWidth: "60px" }}>
                          <CusTextField
                            defaultValue={item.itemTotalStock}
                            value={currentItemTotalStock[item.itemId]}
                            onChange={(event) => {
                              const stock = {
                                ...currentItemTotalStock,
                                [item.itemId]: event.target.value,
                              };
                              setCurrentItemTotalStock(stock);
                            }}
                            fullWidth
                            variant="standard"
                            disabled={!isSave[item.itemId]}
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ maxWidth: "80px" }}>
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {currentSelectedItem[item.itemId]
                              ? currentSelectedItem[item.itemId]
                                  .itemGstPercentage
                              : item.itemGST}
                          </Typography>
                        </CusTableCell>

                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {(
                              getFinalPrice(item) *
                              (Number(
                                currentSelectedItem[item.itemId]
                                  ? currentSelectedItem[item.itemId]
                                      .itemGstPercentage
                                  : item.itemGST
                              ) /
                                100)
                            ).toFixed(2)}
                          </Typography>
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ maxWidth: "80px" }}>
                          <FormControl fullWidth sx={{ marginTop: "7px" }}>
                            <NativeSelect
                              defaultValue={item.itemCategory}
                              disabled={!isSave[item.itemId]}
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              value={currentItemCategory[item.itemId]}
                              onChange={(event) => {
                                const cat = {
                                  ...currentItemCategory,
                                  [item.itemId]: event.target.value,
                                };
                                setCurrentItemCategory(cat);
                              }}
                              sx={{ fontSize: "0.75rem" }}
                            >
                              {purchaseOrderCategory &&
                                purchaseOrderCategory.map((item) => (
                                  <option
                                    value={item.configCriteriaValue}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {item.configCriteriaDesc}
                                  </option>
                                ))}
                              <option
                                value={""}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Select Category
                              </option>
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>

                        <CusTableCell align="center">
                          {isSave[item.itemId] ? (
                            <IconButton
                              sx={{
                                fontSize: "0.75rem",
                                color: "#92D050",
                              }}
                              onClick={() => {
                                updateItemHandle(item);
                              }}
                            >
                              <SaveIcon
                                sx={{ height: "0.95rem", width: "0.95rem" }}
                              ></SaveIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              sx={{
                                fontSize: "0.75rem",
                                color: "#FFC000",
                              }}
                              onClick={() => {
                                onEditClickHandle(item.itemId);
                              }}
                            >
                              <EditIcon
                                sx={{ height: "0.95rem", width: "0.95rem" }}
                              ></EditIcon>
                            </IconButton>
                          )}

                          <IconButton
                            sx={{
                              fontSize: "0.75rem",
                              color: "red",
                            }}
                            onClick={() => {
                              deleteItemFromList(item.itemId);
                            }}
                          >
                            <DeleteIcon
                              sx={{ height: "0.95rem", width: "0.95rem" }}
                            ></DeleteIcon>
                          </IconButton>
                        </CusTableCell>
                      </TableRow>
                    ))}

                  {isAddNew ? (
                    <TableRow>
                      <CusTableCell align="center">
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {Object.keys(addedList).length + 1}
                        </Typography>
                      </CusTableCell>
                      <CusTableCell align="center">
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {selectedItem ? selectedItem.itemId : "N/A"}
                        </Typography>
                      </CusTableCell>
                      <CusTableCell align="center">
                        <CusAutocomplete
                          onChange={(event, newValue) => {
                            setSelectedItem(newValue);
                          }}
                          sx={{
                            fontSize: "0.75rem",
                            marginTop: "15px",
                            ".MuiFormControl-root": { marginTop: "5px" },
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
                              /*  label="Choose an ingredient" */
                              variant="standard"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password", // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      </CusTableCell>
                      <CusTableCell align="center">
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {selectedItem ? selectedItem.itemUom : "N/A"}
                        </Typography>
                      </CusTableCell>
                      <CusTableCell align="center" sx={{ maxWidth: "60px" }}>
                        <CusTextField
                          value={newItemQty}
                          onChange={(event) => {
                            setNewItemQty(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                          InputProps={{
                            disableUnderline: true, // <== added this
                          }}
                        />
                      </CusTableCell>

                      <CusTableCell align="center" sx={{ maxWidth: "60px" }}>
                        <CusTextField
                          value={newItemWastage}
                          onChange={(event) => {
                            setNewItemWastage(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                          InputProps={{
                            disableUnderline: true, // <== added this
                          }}
                        />
                      </CusTableCell>

                      <CusTableCell align="center" sx={{ maxWidth: "80px" }}>
                        <CusTextField
                          value={newItemPrice}
                          onChange={(event) => {
                            setNewItemPrice(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                          InputProps={{
                            disableUnderline: true, // <== added this
                          }}
                        />
                      </CusTableCell>

                      <CusTableCell align="center" sx={{ maxWidth: "80px" }}>
                        <CusTextField
                          value={newItemDiscount}
                          onChange={(event) => {
                            setNewItemDiscount(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                          InputProps={{
                            disableUnderline: true, // <== added this
                          }}
                        />
                      </CusTableCell>

                      <CusTableCell align="center" sx={{ maxWidth: "115px" }}>
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {Number(newItemPrice) - Number(newItemDiscount)}
                        </Typography>
                      </CusTableCell>

                      <CusTableCell align="center" sx={{ maxWidth: "60px" }}>
                        {/* <CusTextField
                          value={newItemStock}
                          onChange={(event) => {
                            setNewItemStock(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                          InputProps={{
                            disableUnderline: true, // <== added this
                          }}
                        /> */}
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {Number(newItemQty) - Number(newItemWastage)}
                        </Typography>
                      </CusTableCell>

                      <CusTableCell align="center" sx={{ maxWidth: "80px" }}>
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {selectedItem
                            ? selectedItem.itemGstPercentage
                            : "N/A"}
                        </Typography>
                      </CusTableCell>

                      <CusTableCell align="center">
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {(
                            (Number(newItemPrice) - Number(newItemDiscount)) *
                            (Number(
                              selectedItem ? selectedItem.itemGstPercentage : 0
                            ) /
                              100)
                          ).toFixed(2)}
                        </Typography>
                      </CusTableCell>

                      <CusTableCell align="center" sx={{ maxWidth: "80px" }}>
                        <FormControl fullWidth sx={{ marginTop: "8px" }}>
                          <NativeSelect
                            inputProps={{
                              name: "status",
                              id: "uncontrolled-native",
                            }}
                            onChange={(event) => {
                              setNewItemCategory(event.target.value);
                            }}
                            sx={{ fontSize: "0.75rem" }}
                          >
                            {purchaseOrderCategory &&
                              purchaseOrderCategory.map((item) => (
                                <option
                                  value={item.configCriteriaValue}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {item.configCriteriaDesc}
                                </option>
                              ))}
                            {/* <option value={""} style={{ fontSize: "0.75rem" }}>
                            Select Category
                          </option> */}
                          </NativeSelect>
                        </FormControl>
                      </CusTableCell>

                      <CusTableCell align="center">
                        <IconButton
                          sx={{
                            fontSize: "0.75rem",
                            color: "#92D050",
                          }}
                          onClick={() => {
                            addItemToList();
                          }}
                        >
                          <SaveIcon
                            sx={{ height: "0.95rem", width: "0.95rem" }}
                          ></SaveIcon>
                        </IconButton>
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
                      </CusTableCell>
                    </TableRow>
                  ) : null}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <SaveButton
          className="mt-4"
          onClick={() => {
            setIsAddNew(true);
          }}
        >
          ADD ANOTHER
        </SaveButton>
        <div className="text-center">
          <Row>
            <Col sm={4}>
              <SaveButton
                className="mt-4"
                onClick={saveUpdatePurchaseOrderToDB}
              >
                SAVE
              </SaveButton>
            </Col>
            <Col sm={4}>
              <SaveButton className="mt-4">PRINT</SaveButton>
            </Col>
            <Col sm={4}>
              <SaveButton className="mt-4" onClick={cancelPurchaseOrder}>
                CANCEL
              </SaveButton>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
