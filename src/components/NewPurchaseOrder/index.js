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
  const [addedList, setAddedList] = useState([]);
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
  const [newItemCategory, setNewItemCategory] = useState("");

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

  const addItemToList = () => {
    const newObj = {
      itemId: selectedItem.itemId,
      itemName: selectedItem.itemName,
      itemUOM: selectedItem.itemUOM,
      itemQuantity: newItemQty,
      itemWastage: newItemWastage,
      itemPrice: newItemPrice,
      itemDiscount: newItemDiscount,
      itemFinalPrice: Number(newItemPrice) - Number(newItemDiscount),
      itemTotalStock: newItemStock,
      itemGST: selectedItem.itemGstPercentage,
      itemGSTAmount: (
        (Number(newItemPrice) - Number(newItemDiscount)) *
        (Number(selectedItem ? selectedItem.itemGstPercentage : 0) / 100)
      ).toFixed(2),
      itemCategory: newItemCategory,
    };

    addedList.push(newObj);
    setAddedList(addedList);
    setIsAddNew(false);
    clearData();
  };

  const clearData = () => {
    setSelectedItem(null);
    setNewItemQty("");
    setNewItemWastage("");
    setNewItemPrice("");
    setNewItemDiscount("");
    setNewItemStock("");
    setNewItemCategory("");
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
              >
                {allSuppliers.map((supplier) => (
                  <MenuItem
                    onClick={() => {
                      handleSelectedSupplier(supplier);
                    }}
                    value={supplier.id}
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
                <CusTableCell1 align="center">QUANTITY</CusTableCell1>
                <CusTableCell1 align="center">WASTAGE</CusTableCell1>
                <CusTableCell1 align="center">PRICE</CusTableCell1>
                <CusTableCell1 align="center">DISCOUNT</CusTableCell1>
                <CusTableCell1 align="center">
                  FINAL PURCHASE PRICE
                </CusTableCell1>
                <CusTableCell1 align="center">TOTAL STOCK</CusTableCell1>
                <CusTableCell1 align="center">GST%</CusTableCell1>
                <CusTableCell1 align="center">GST AMT.</CusTableCell1>
                <CusTableCell1 align="center">CATEGORY</CusTableCell1>
                <CusTableCell1 align="center">REMARKS</CusTableCell1>
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
                  {addedList &&
                    addedList.map((item) => (
                      <TableRow>
                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {addedList.length}
                          </Typography>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {item.itemId}
                          </Typography>
                        </CusTableCell>
                        <CusTableCell align="center">
                          {/* <CusAutocomplete
      onChange={(event, newValue) => {
        setSelectedItem(newValue);
      }}
      sx={{ fontSize: "0.75rem", marginTop: "15px" }}
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
    /> */}
                          {item.itemName}
                        </CusTableCell>
                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {item.itemUOM}
                          </Typography>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            defaultValue={item.itemQuantity}
                            disabled={true}
                            /* value={newItemQty}
                            onChange={(event) => {
                              setNewItemQty(event.target.value);
                            }} */
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            defaultValue={item.itemWastage}
                            disabled={true}
                            /* value={newItemWastage}
                            onChange={(event) => {
                              setNewItemWastage(event.target.value);
                            }} */
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            defaultValue={item.itemPrice}
                            disabled={true}
                            /* value={newItemPrice}
                            onChange={(event) => {
                              setNewItemPrice(event.target.value);
                            }} */
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            defaultValue={item.itemDiscount}
                            disabled={true}
                            /* value={newItemDiscount}
                            onChange={(event) => {
                              setNewItemDiscount(event.target.value);
                            }} */
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {item.itemFinalPrice}
                          </Typography>
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            defaultValue={item.itemTotalStock}
                            disabled={true}
                            /* value={newItemStock}
                            onChange={(event) => {
                              setNewItemStock(event.target.value);
                            }} */
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {item.itemGST}
                          </Typography>
                        </CusTableCell>

                        <CusTableCell align="center">
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            {item.itemGSTAmount}
                          </Typography>
                        </CusTableCell>

                        <FormControl fullWidth sx={{ marginTop: "5px" }}>
                          <NativeSelect
                            defaultValue={item.itemCategory}
                            disabled={true}
                            inputProps={{
                              name: "status",
                              id: "uncontrolled-native",
                            }}
                            onChange={(event) => {
                              setNewItemCategory(event.target.value);
                            }}
                            sx={{ fontSize: "0.75rem" }}
                          >
                            <option value={""} style={{ fontSize: "0.75rem" }}>
                              Select Category
                            </option>
                            {purchaseOrderCategory &&
                              purchaseOrderCategory.map((item) => (
                                <option
                                  value={item.configCriteriaValue}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {item.configCriteriaDesc}
                                </option>
                              ))}
                          </NativeSelect>
                        </FormControl>

                        <CusTableCell align="center">
                          <IconButton
                            sx={{
                              fontSize: "0.75rem",
                              color: "#92D050",
                            }}
                            onClick={() => {
                              /* addItemToList(); */
                            }}
                          >
                            <EditIcon
                              sx={{ height: "0.95rem", width: "0.95rem" }}
                            ></EditIcon>
                          </IconButton>
                          <IconButton
                            sx={{
                              fontSize: "0.75rem",
                              color: "red",
                            }}
                            onClick={() => {
                              /* setIsAddNew(false); */
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
                          {addedList.length + 1}
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
                          sx={{ fontSize: "0.75rem", marginTop: "15px" }}
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
                          {selectedItem ? selectedItem.itemUOM : "N/A"}
                        </Typography>
                      </CusTableCell>
                      <CusTableCell align="center">
                        <CusTextField
                          value={newItemQty}
                          onChange={(event) => {
                            setNewItemQty(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                        />
                      </CusTableCell>

                      <CusTableCell align="center">
                        <CusTextField
                          value={newItemWastage}
                          onChange={(event) => {
                            setNewItemWastage(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                        />
                      </CusTableCell>

                      <CusTableCell align="center">
                        <CusTextField
                          value={newItemPrice}
                          onChange={(event) => {
                            setNewItemPrice(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                        />
                      </CusTableCell>

                      <CusTableCell align="center">
                        <CusTextField
                          value={newItemDiscount}
                          onChange={(event) => {
                            setNewItemDiscount(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                        />
                      </CusTableCell>

                      <CusTableCell align="center">
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {Number(newItemPrice) - Number(newItemDiscount)}
                        </Typography>
                      </CusTableCell>

                      <CusTableCell align="center">
                        <CusTextField
                          value={newItemStock}
                          onChange={(event) => {
                            setNewItemStock(event.target.value);
                          }}
                          fullWidth
                          variant="standard"
                        />
                      </CusTableCell>

                      <CusTableCell align="center">
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

                      <FormControl fullWidth sx={{ marginTop: "5px" }}>
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
                          <option value={""} style={{ fontSize: "0.75rem" }}>
                            Select Category
                          </option>
                          {purchaseOrderCategory &&
                            purchaseOrderCategory.map((item) => (
                              <option
                                value={item.configCriteriaValue}
                                style={{ fontSize: "0.75rem" }}
                              >
                                {item.configCriteriaDesc}
                              </option>
                            ))}
                        </NativeSelect>
                      </FormControl>

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
      </div>
    </div>
  );
};
