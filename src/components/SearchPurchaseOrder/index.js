import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDays } from "date-fns";
import styled from "@emotion/styled";
import { Row, Col, Dropdown, Modal } from "react-bootstrap";
import { DateRangePicker, DefinedRange } from "react-date-range";
import DropdownMenu from "@atlaskit/dropdown-menu";
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
  TextField,
  IconButton,
  MenuItem,
  InputLabel,
  Select,
  NativeSelect,
} from "@mui/material";
import {
  getActiveSuppliers,
  getClosedPurchaseOrders,
  getSubmittedRecievedPurchaseOrders,
} from "../../actions";
import { EditPurchaseOrder } from "../EditPurchaseOrder";

const CusDDT = styled(Dropdown.Toggle)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
`;

const CusDateRangePicker = styled(DateRangePicker)`
  & .rdrDefinedRangesWrapper {
    display: none;
  }
`;

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const CuTypography = styled(Typography)`
  color: #7f7f7f;
  font-weight: bold;
  font-size: 0.75rem;
  line-height: 1rem;
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

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #00b0f0;
  color: #fff;
`;

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border: 1px solid #000;
`;

const CusModal = styled(Modal)`
& .modal-dialog{
    max-width: 93%;
  },
`;

export const SearchPurchaseOrder = () => {
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const allSuppliers = useSelector((state) => state.inventory.allSuppliers);
  const closedPurchaseOrders = useSelector(
    (state) => state.inventory.closedPurchaseOrders
  );
  const closedPurchaseOrderLoading = useSelector(
    (state) => state.inventory.closedPurchaseOrderLoading
  );
  const allSuppliersLoading = useSelector(
    (state) => state.inventory.allSuppliersLoading
  );
  const stores = useSelector((state) => state.store.stores);
  const [dateState, setDateState] = useState([
    {
      startDate: businessDateAll
        ? new Date(businessDateAll.businessDate)
        : new Date(),
      endDate: addDays(
        businessDateAll ? new Date(businessDateAll.businessDate) : new Date(),
        0
      ),
      key: "selection",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [billNo, setBillNo] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [poStatus, setPOStatus] = useState("");

  const [selectedSupplierObj, setSelectedSupplierObj] = useState(null);
  const [groupedData, setGroupedData] = useState({});
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveSuppliers());

    /* dispatch(getClosedPurchaseOrders()).then((res) => {
      if (res) {
        searchPurchaseOrders();
      }
    }); */
    dispatch(getSubmittedRecievedPurchaseOrders()).then((res) => {
      if (res) {
        searchPurchaseOrders();
      }
    });
  }, []);

  useEffect(() => {
    searchPurchaseOrders();
  }, [
    selectedStoreObj,
    billNo,
    selectedSupplierObj,
    dateState,
    closedPurchaseOrders,
  ]);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleChangeSupplier = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleSelectedSupplier = (supplier) => {
    setSelectedSupplierObj(supplier);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = () => setShowAdd(true);

  const searchPurchaseOrders = () => {
    if (closedPurchaseOrders) {
      let searched = closedPurchaseOrders;

      if (selectedStoreObj) {
        searched = searched.filter(function (el) {
          return (
            selectedStoreObj.restaurantId === el.restaurantId &&
            selectedStoreObj.storeId === el.storeId
          );
        });
      }

      if (billNo) {
        searched = searched.filter(function (el) {
          return el.billNumber.toLowerCase().includes(billNo.toLowerCase());
        });
      }

      if (selectedSupplierObj) {
        searched = searched.filter(function (el) {
          return selectedSupplierObj.supplierId === el.supplierId;
        });
      }

      if (dateState[0]) {
        searched = searched.filter(function (el) {
          return (
            dateState[0].startDate.getTime() <=
              new Date(el.purchaseDate).getTime() &&
            dateState[0].endDate.getTime() >=
              new Date(el.purchaseDate).getTime()
          );
        });
      }

      groupBypurchaseOrderId(searched);
    }
  };

  const groupBypurchaseOrderId = (list) => {
    let grouped = list.reduce(function (r, a) {
      r[a.purchaseOrderId] = r[a.purchaseOrderId] || { items: [], total: 0 };
      r[a.purchaseOrderId].items.push(a);
      r[a.purchaseOrderId].restaurantId = a.restaurantId;
      r[a.purchaseOrderId].storeId = a.storeId;
      r[a.purchaseOrderId].billNumber = a.billNumber;
      r[a.purchaseOrderId].purchaseOrderId = a.purchaseOrderId;
      r[a.purchaseOrderId].purchaseDate = a.purchaseDate;
      r[a.purchaseOrderId].supplierId = a.supplierId;
      r[a.purchaseOrderId].total =
        r[a.purchaseOrderId].total + a.netPurchasePrice;
      r[a.purchaseOrderId].createdBy = a.createdBy;
      r[a.purchaseOrderId].createdDate = a.createdDate;
      r[a.purchaseOrderId].purchaseOrderStatus = a.purchaseOrderStatus;
      return r;
    }, Object.create(null));

    setGroupedData(grouped);
  };

  const renderDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span>
        {day}/{month.toUpperCase()}/{year}
      </span>
    );
  };

  const renderEditModal = () => {
    return (
      <CusModal
        show={showAdd}
        onHide={handleCloseAdd}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>EDIT PO</Modal.Title>
        </Modal.Header>
        {console.log(currentProduct.purchaseOrderStatus)}
        {currentProduct ? (
          <Modal.Body>
            <EditPurchaseOrder
              product={currentProduct}
              isEnabled={
                currentProduct.purchaseOrderStatus === "SUBMITTED"
                  ? true
                  : false
              }
            ></EditPurchaseOrder>
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleCloseAdd}>
            Close
          </Button>
          &nbsp;
          {/* <Button variant="contained" color="success">
            Save
          </Button> */}
        </Modal.Footer>
      </CusModal>
    );
  };

  return (
    <div>
      <div style={{ margin: "auto", width: "320px" }}>
        <div style={{ display: "flex" }} className="align-items-center">
          <div style={{ width: "125px" }}>
            <CuTypography>Select Date Range:</CuTypography>
          </div>
          <div>
            <Dropdown
              className="d-inline mx-2"
              autoClose="outside"
              variant="secondary"
            >
              <CusDDT variant="secondary">Presets</CusDDT>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <DefinedRange
                    onChange={(item) => setDateState([item.selection])}
                    ranges={dateState}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <DropdownMenu
              isOpen={isOpen}
              onOpenChange={(attrs) => {
                setIsOpen(attrs.isOpen);
              }}
              trigger="Custom"
            >
              <CusDateRangePicker
                editableDateInputs={true}
                onChange={(item) => setDateState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateState}
              />
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Row>
          <Col sm={4}>
            <div style={{ display: "flex" }} className="align-items-center">
              <div style={{ width: "125px" }}>
                <CuTypography>Select Store:</CuTypography>
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
            </div>
          </Col>
          <Col sm={4}>
            <div style={{ display: "flex" }} className="align-items-center">
              <div style={{ width: "80px" }}>
                <CuTypography>Bill No :</CuTypography>
              </div>
              <div style={{ width: "100%" }}>
                <CusTextField
                  value={billNo}
                  onChange={(event) => {
                    setBillNo(event.target.value);
                  }}
                  fullWidth
                  label="Enter Bill No"
                />
              </div>
            </div>
          </Col>
          <Col sm={4}>
            <div style={{ display: "flex" }} className="align-items-center">
              <div style={{ width: "125px" }}>
                <CuTypography>By Vendor:</CuTypography>
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
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-3">
        <TableContainer className="mt-3" component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <CusTableCell1 align="center">RESTAURANT</CusTableCell1>
                <CusTableCell1 align="center">STORE NAME</CusTableCell1>
                <CusTableCell1 align="center">BILL NO</CusTableCell1>
                <CusTableCell1 align="center">BILL DATE</CusTableCell1>
                <CusTableCell1 align="center">SUPPLIER</CusTableCell1>
                <CusTableCell1 align="center">PURCHASE AMOUNT</CusTableCell1>
                <CusTableCell1 align="center">PO STATUS</CusTableCell1>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSuppliersLoading || closedPurchaseOrderLoading ? (
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
                  {Object.values(groupedData).length > 0 ? (
                    <>
                      {Object.values(groupedData).map((item) => (
                        <TableRow key={item.purchaseOrderId}>
                          <CusTableCell align="center">
                            <Typography sx={{ fontSize: "0.75rem" }}>
                              {item.restaurantId}
                            </Typography>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <Typography sx={{ fontSize: "0.75rem" }}>
                              {item.storeId}
                            </Typography>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <Typography sx={{ fontSize: "0.75rem" }}>
                              <Button
                                sx={{ fontSize: "0.75rem" }}
                                onClick={() => {
                                  setCurrentProduct(item);
                                  handleShowAdd();
                                }}
                              >
                                {item.billNumber ? item.billNumber : "N/A"}
                              </Button>
                            </Typography>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <Typography sx={{ fontSize: "0.75rem" }}>
                              {renderDate(item.purchaseDate)}
                            </Typography>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <Typography sx={{ fontSize: "0.75rem" }}>
                              {item.supplierId}
                            </Typography>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <Typography sx={{ fontSize: "0.75rem" }}>
                              {item.total}
                            </Typography>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                defaultValue={item.purchaseOrderStatus}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                  disableUnderline: true,
                                }}
                                onChange={(event) => {
                                  setPOStatus(event.target.value);
                                }}
                                sx={{
                                  fontSize: "0.75rem",
                                }}
                              >
                                <option
                                  value={"SUBMITTED"}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  SUBMITTED
                                </option>
                                <option
                                  value={"RECEIVED"}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  RECEIVED
                                </option>
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={15}>
                        <Alert severity="warning">
                          No SUBMITTED/ RECEIVED PO found for search criteria;
                          {selectedStoreObj ? (
                            <>
                              <br></br>Store: {selectedStoreObj.resturantName}
                            </>
                          ) : null}
                          {billNo ? (
                            <>
                              <br></br>Bill No: {billNo}
                            </>
                          ) : null}
                          {selectedSupplierObj ? (
                            <>
                              <br></br>Store: {selectedSupplierObj.supplierName}
                            </>
                          ) : null}
                          {dateState[0] ? (
                            <>
                              <br></br>Start Date:{" "}
                              {renderDate(dateState[0].startDate)}
                            </>
                          ) : null}
                          {dateState[0] ? (
                            <>
                              <br></br>End Date:{" "}
                              {renderDate(dateState[0].endDate)}
                            </>
                          ) : null}
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
      {renderEditModal()}
    </div>
  );
};
