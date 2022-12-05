import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDays } from "date-fns";
import styled from "@emotion/styled";
import { Row, Col, Dropdown, Modal } from "react-bootstrap";
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
} from "@mui/material";
import { getItemConsumptionSummery } from "../../actions";

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

export const StoreInventoryTracking = () => {
  const stores = useSelector((state) => state.store.stores);
  const itemConsumptionSummaryLoading = useSelector(
    (state) => state.inventory.itemConsumptionSummaryLoading
  );
  const itemConsumptionSummary = useSelector(
    (state) => state.inventory.itemConsumptionSummary
  );
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  const [itemsByStore, setItemsByStore] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemConsumptionSummery()).then((res) => {
      if (res && selectedStoreObj) {
        setItemsByStore(
          res.filter(function (el) {
            return (
              el.restaurantId === selectedStoreObj.restaurantId &&
              el.storeId === selectedStoreObj.storeId
            );
          })
        );
      }
    });
  }, [selectedStoreObj]);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const calculateTotalAmount = () => {
    if (itemsByStore) {
      let total = 0;
      for (let i = 0; i < itemsByStore.length; i++) {
        total = total + Number(itemsByStore[i].itemConsumptionAmount);
        return total;
      }
    } else {
      return 0;
    }
  };

  return (
    <div>
      <div>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
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
          <Col sm={3}></Col>
        </Row>
      </div>
      <div className="mt-3">
        <TableContainer className="mt-3" component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <CusTableCell1 align="center">NO</CusTableCell1>
                <CusTableCell1 align="center">ITEM NO</CusTableCell1>
                <CusTableCell1 align="center">ITEM NAME</CusTableCell1>
                <CusTableCell1 align="center">UOM</CusTableCell1>
                <CusTableCell1 align="center">SOD INV.</CusTableCell1>
                <CusTableCell1 align="center">DAILY INV.</CusTableCell1>
                <CusTableCell1 align="center">WASTAGE</CusTableCell1>
                <CusTableCell1 align="center">TOTAL</CusTableCell1>
                <CusTableCell1 align="center">CONSUMPTION</CusTableCell1>
                <CusTableCell1 align="center">EOD INV.</CusTableCell1>
                <CusTableCell1 align="center">VARIANCE</CusTableCell1>
                <CusTableCell1 align="center">AMOUNT</CusTableCell1>
                <CusTableCell1 align="center">
                  COMMENTS FOR VARIANCE
                </CusTableCell1>
                <CusTableCell1 align="center">STATUS</CusTableCell1>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <CusTableCell align="center" colSpan={4}>
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "red" }}
                  ></Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    INVENTORY @SOD
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    INVENTORY @TODAY
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "red" }}
                  ></Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    A + B - C
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    AS PER RECIPE MGMT.
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    INVENTORY @EOD
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    IDEAL - ACTUAL
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    AMOUNT DUE TO VARIANCE
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center" colSpan={2}>
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "red" }}
                  ></Typography>
                </CusTableCell>
              </TableRow>
              <TableRow>
                <CusTableCell align="center" colSpan={4}>
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "red" }}
                  ></Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    A
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    C
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    C
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    T
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    D
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    E
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center">
                  <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                    (E + D - T)
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center" colSpan={3}>
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "red" }}
                  ></Typography>
                </CusTableCell>
              </TableRow>
              {itemConsumptionSummaryLoading ? (
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
                  {selectedStoreObj ? (
                    <>
                      {itemsByStore.length > 0 ? (
                        <>
                          {itemsByStore.map((item, index) => (
                            <TableRow key={item.id}>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {index + 1}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.itemId}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.itemName}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.itemUom}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.poOpngQty}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.poTodayQty}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.poWastageQty}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.poNetQty}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.itemCurrConsumptionQty}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.itemEodConsumptionQty}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.itemConsumptionVarianceQty}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  Rs. {item.itemConsumptionAmount}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.remarks}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {item.reconStatus}
                                </Typography>
                              </CusTableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={11}></TableCell>
                            <TableCell align="center">
                              <Typography sx={{ fontSize: "0.75rem" }}>
                                Rs. {calculateTotalAmount()}
                              </Typography>
                            </TableCell>
                            <TableCell colSpan={2}></TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={14}>
                            <Alert severity="warning">No data found!</Alert>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell colSpan={14}>
                          <Alert severity="warning">
                            Please select a store!
                          </Alert>
                        </TableCell>
                      </TableRow>
                    </>
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
