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
} from "@mui/material";
import { getActiveSuppliers } from "../../actions";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

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

export const NewPurchaseOrder = () => {
  const stores = useSelector((state) => state.store.stores);
  const allSuppliers = useSelector((state) => state.inventory.allSuppliers);
  const allSuppliersLoading = useSelector(
    (state) => state.inventory.allSuppliersLoading
  );

  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [selectedSupplierObj, setSelectedSupplierObj] = useState(null);
  const [billNo, setBillNo] = useState("");
  const [billDate, setBillDate] = useState(new Date());

  const handleChangeBillDate = (newValue) => {
    setBillDate(newValue);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveSuppliers());
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
                <CusTableCell1 align="center">ITEM NAME</CusTableCell1>
                <CusTableCell1 align="center">CATEGORY</CusTableCell1>
                <CusTableCell1 align="center">UOM</CusTableCell1>
                <CusTableCell1 align="center">GST</CusTableCell1>
                <CusTableCell1 align="center">TRACK (YES /NO)</CusTableCell1>
                <CusTableCell1 align="center">ACTION</CusTableCell1>
              </TableRow>
            </TableHead>
            {/* <TableBody>
            {activeInventoryLoading ? (
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
                {activeInventory && activeInventory.length > 0 ? (
                  <>
                    {activeInventory
                      .slice(
                        pagination.offset,
                        pagination.offset + pagination.numberPerPage
                      )
                      .map((item, index) => (
                        <TableRow key={item.id}>
                          <CusTableCell align="center">
                            {index + 1 + pagination.offset}
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.itemId}
                              value={currentItemNo[item.id]}
                              onChange={(event) => {
                                const nos = {
                                  ...currentItemNo,
                                  [item.id]: event.target.value,
                                };
                                setCurrentItemNo(nos);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.itemName}
                              value={currentItemName[item.id]}
                              onChange={(event) => {
                                const names = {
                                  ...currentItemName,
                                  [item.id]: event.target.value,
                                };
                                setCurrentItemName(names);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                key={item.id}
                                defaultValue={item.itemCategory}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setItemCategory(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={!isSave[item.id]}
                              >
                                {categoryList &&
                                  categoryList.map((item) => (
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
                            <FormControl fullWidth>
                              <NativeSelect
                                key={item.id}
                                defaultValue={item.itemUOM}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setItemUOM(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={!isSave[item.id]}
                              >
                                {uomList &&
                                  uomList.map((item) => (
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
                                  Select UOM
                                </option>
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.id}
                              defaultValue={item.itemGstPercentage}
                              value={currentItemGst[item.id]}
                              onChange={(event) => {
                                const gst = {
                                  ...currentItemGst,
                                  [item.id]: event.target.value,
                                };
                                setCurrentItemGst(gst);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.id]}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <FormControl fullWidth>
                              <NativeSelect
                                key={item.id}
                                defaultValue={item.itemTrackingFlag}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setItemTrackingFlag(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem" }}
                                disabled={!isSave[item.id]}
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
                            </FormControl>
                          </CusTableCell>

                          <CusTableCell align="center">
                            {isSave[item.id] ? (
                              <IconButton
                                key={item.id}
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
                                key={item.id}
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "#FFC000",
                                }}
                                onClick={() => {
                                  onEditClickHandle(item.id);
                                }}
                              >
                                <EditIcon
                                  sx={{ height: "0.95rem", width: "0.95rem" }}
                                ></EditIcon>
                              </IconButton>
                            )}

                            <IconButton
                              key={item.id}
                              sx={{
                                fontSize: "0.75rem",
                                color: "red",
                              }}
                              onClick={() => {
                                softDeleteItem(item.id);
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
                          {activeInventory ? activeInventory.length + 1 : "#"}
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newItemNo}
                            onChange={(event) => {
                              setNewItemNo(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newItemName}
                            onChange={(event) => {
                              setNewItemName(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>
                        <CusTableCell align="center">
                          <FormControl fullWidth>
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
                              <option
                                value={""}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Select Category
                              </option>
                              {categoryList &&
                                categoryList.map((item) => (
                                  <option
                                    value={item.configCriteriaValue}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {item.configCriteriaDesc}
                                  </option>
                                ))}
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <FormControl fullWidth>
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
                              <option
                                value={""}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Select UOM
                              </option>
                              {uomList &&
                                uomList.map((item) => (
                                  <option
                                    value={item.configCriteriaValue}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {item.configCriteriaDesc}
                                  </option>
                                ))}
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newItemGst}
                            onChange={(event) => {
                              setNewItemGst(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <FormControl fullWidth>
                            <NativeSelect
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewTrackingFlag(event.target.value);
                              }}
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
                          </FormControl>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <IconButton
                            sx={{
                              fontSize: "0.75rem",
                              color: "#92D050",
                            }}
                            onClick={() => {
                              saveNewItem();
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
                ) : (
                  <TableRow>
                    <TableCell colSpan={15}>
                      <Alert severity="warning">No items found!</Alert>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody> */}
          </Table>
        </TableContainer>
        <SaveButton
          className="mt-4"
          onClick={
            /* handleShowAdd */ () => {
              /* setIsAddNew(true); */
            }
          }
        >
          ADD ANOTHER
        </SaveButton>
      </div>
    </div>
  );
};
