import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { Row, Col, Modal } from "react-bootstrap";
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
import {
  getItemConsumptionSummery,
  saveAllItemConsumptionSummery,
  performInventoryUpdateEOD,
} from "../../actions";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import ReactPaginate from "react-paginate";
import ReactExport from "react-export-excel";
import { toast } from "react-toastify";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
  text-align: center;
  font-family: 'Roboto';
  color: #000;
}
 }

 & .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color:  #404040;
  }
`;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #35455e;
  color: #fff;
  padding-top: 0;
  padding-bottom: 0;
`;

// const CusTableCell = styled(TableCell)`
//   padding: 0;
//   font-size: 14px;
//   border: 1px solid #000;
// `;

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
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

export const NonRecipeInventory = () => {
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const itemConsumptionSummaryLoading = useSelector(
    (state) => state.inventory.itemConsumptionSummaryLoading
  );
  const itemConsumptionSummary = useSelector(
    (state) => state.inventory.itemConsumptionSummary
  );
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedStoreObj, setSelectedStoreObj] = useState(null);
  /* const [itemsByStore, setItemsByStore] = useState([]); */
  const [isSave, setIsSave] = useState({});
  const [isRefresh, setIsRefresh] = useState(false);
  const [currentItemEodConsumptionQty, setCurrentItemEodConsumptionQty] =
    useState({});
  const [currentRemarks, setCurrentRemarks] = useState({});
  const [pagination, setPagination] = useState({
    data: itemConsumptionSummary,
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: itemConsumptionSummary.slice(0, 10),
  });
  const [updatedItemList, setUpdatedItemList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.roleCategory !== "SUPER_ADMIN") {
      setSelectedStoreObj(getSelectableStores(stores)[0])
    }
  }, []);

  useEffect(() => {
    if (selectedStoreObj) {
      dispatch(getItemConsumptionSummery(selectedStoreObj, "NON-RECIPE"));
    }
  }, [selectedStoreObj, isRefresh]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: itemConsumptionSummary.length / prevState.numberPerPage,
      currentData: itemConsumptionSummary.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, itemConsumptionSummary]);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleRefresh = () => {
    if (isRefresh) {
      setIsRefresh(false);
    } else {
      setIsRefresh(true);
    }
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const updateItemHandle = (item, consumption, remarks) => {
    let l = updatedItemList;

    l =  l.filter(function(el) { return el.itemId !== item.itemId; }); 

    const newObj = {
      ...item,
      itemEodConsumptionQty: consumption && consumption[item.id]
        ? consumption[item.id]
        : item.itemEodConsumptionQty,
      remarks: remarks && remarks[item.id] ? remarks[item.id] : item.remarks,
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

   
    l.push(newObj);
    setUpdatedItemList(l);

    onSaveClickHandle(item.id);
  };

  const getVariance = (item) => {
    let e = currentItemEodConsumptionQty[item.id]
      ? currentItemEodConsumptionQty[item.id]
      : Number(item.itemEodConsumptionQty);

    return (
      Number(Number(e) + Number(item.itemCurrConsumptionQty) - Number(item.poNetQty)).toFixed(2)
    );
  };

  const saveAllChangedList = () => {
    if (updatedItemList && updatedItemList.length > 0) {
      dispatch(saveAllItemConsumptionSummery(updatedItemList)).then((res) => {
        if (res) {
          setUpdatedItemList([]);
          handleRefresh();
        }
      });
    } else {
      toast.error("No items to be updated!");
    }
  };

  const calculateTotalAmount = () => {
    if (itemConsumptionSummary) {
      let total = 0;
      for (let i = 0; i < itemConsumptionSummary.length; i++) {
        total = total + Number(itemConsumptionSummary[i].itemConsumptionAmount);
        return Number(total).toFixed(2);
      }
    } else {
      return 0;
    }
  };

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const handleEODBtn = () => {
    if (!selectedStoreObj) {
      toast.error("Please select a store first!");
      return;
    }

    dispatch(
      performInventoryUpdateEOD(
        selectedStoreObj.storeId,
        selectedStoreObj.restaurantId
      )
    ).then((res) => {
      if (res) {
        //window.location.reload();
        handleRefresh();
      }
    });
  };

  const getSelectableStores = (list) =>{
    if(user.roleCategory === "SUPER_ADMIN"){
      return list;
    }else{
      return list.filter(function (el) {
        return (
          el.restaurantId === user.restaurantId && el.storeId === user.storeId
        );
      });
    }
  }

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
              {user.roleCategory === "SUPER_ADMIN" ? 
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
            </FormControl>:
             <CuTypography>{getSelectableStores(stores)[0].resturantName}</CuTypography>
              }
            </div>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </div>
      <div className="mt-3">
        <TableContainer
          className="mt-3"
          component={Paper}
          sx={{ maxHeight: "65vh" }}
        >
          <Table sx={{ minWidth: 800 }} aria-label="simple table" stickyHeader>
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
                {/* <CusTableCell1 align="center">ACTION</CusTableCell1> */}
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
                <CusTableCell align="center" colSpan={3}>
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
                    B
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
                    VARIANCE = (E + D) - T
                  </Typography>
                </CusTableCell>
                <CusTableCell align="center" colSpan={4}>
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "red" }}
                  ></Typography>
                </CusTableCell>
              </TableRow>
              {itemConsumptionSummaryLoading ? (
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
                  {selectedStoreObj ? (
                    <>
                      {itemConsumptionSummary.length > 0 ? (
                        <>
                          {itemConsumptionSummary.map((item, index) => (
                            <TableRow key={item.id}>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {index + 1 + pagination.offset}
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
                                  <CusTextField
                                    defaultValue={item.itemEodConsumptionQty}
                                    value={
                                      currentItemEodConsumptionQty[item.id]
                                    }
                                    onChange={(event) => {
                                      const itemsEod = {
                                        ...currentItemEodConsumptionQty,
                                        [item.id]: event.target.value,
                                      };
                                      setCurrentItemEodConsumptionQty(itemsEod);
                                      updateItemHandle(item,itemsEod,null)
                                    }}
                                    fullWidth
                                    variant="standard"
                                    /* disabled={!isSave[item.id]} */
                                    InputProps={{
                                      disableUnderline: true, // <== added this
                                    }}
                                  />
                                  {/* {item.itemEodConsumptionQty} */}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {/* {item.itemConsumptionVarianceQty} */}

                                  {getVariance(item)}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  Rs. {item.itemConsumptionAmount}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell align="center">
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  <CusTextField
                                    defaultValue={item.remarks}
                                    value={currentRemarks[item.id]}
                                    onChange={(event) => {
                                      const rem = {
                                        ...currentRemarks,
                                        [item.id]: event.target.value,
                                      };
                                      setCurrentRemarks(rem);
                                      updateItemHandle(item,null,rem)
                                    }}
                                    fullWidth
                                    variant="standard"
                                    /* disabled={!isSave[item.id]} */
                                    InputProps={{
                                      disableUnderline: true, // <== added this
                                    }}
                                  />
                                  {/* {item.remarks} */}
                                </Typography>
                              </CusTableCell>
                              <CusTableCell
                                align="center"
                                sx={{
                                  backgroundColor:
                                    getVariance(
                                      item
                                    )  < 0
                                      ? "#FFBF00"
                                      : "lightgreen",
                                }}
                              >
                                <Typography sx={{ fontSize: "0.75rem" }}>
                                  {getVariance(
                                    item
                                  ) < 0
                                    ? "In-Complete"
                                    : "Complete"}
                                
                                </Typography>
                              </CusTableCell>
                              {/* <CusTableCell align="center">
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
                                      sx={{
                                        height: "0.95rem",
                                        width: "0.95rem",
                                      }}
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
                                      sx={{
                                        height: "0.95rem",
                                        width: "0.95rem",
                                      }}
                                    ></EditIcon>
                                  </IconButton>
                                )}
                              </CusTableCell> */}
                            </TableRow>
                          ))}
                          <TableRow>
                            <CusTableCell colSpan={11}></CusTableCell>
                            <CusTableCell align="center">
                              <Typography
                                sx={{ fontSize: "0.75rem", fontWeight: "bold" }}
                              >
                                Rs. {calculateTotalAmount()}
                              </Typography>
                            </CusTableCell>
                            <CusTableCell colSpan={3}></CusTableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={15}>
                            <Alert severity="warning">No data found!</Alert>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell colSpan={15}>
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
      <div className="text-center mt-4">
        <Row>
          <Col sm={2} style={{ textAlign: "end" }}>
            {/* <SaveButton
              onClick={() => {
                handleEODBtn();
              }}
            >
              INVENTORY EOD
            </SaveButton> */}
          </Col>
          <Col sm={4} style={{ textAlign: "end" }}>
            <ExcelFile
              element={<SaveButton>DOWNLOAD</SaveButton>}
              filename="Item Consumption Summary"
            >
              <ExcelSheet
                data={itemConsumptionSummary}
                name="Item Consumption Summary"
              >
                <ExcelColumn label="ID" value="id" />
                <ExcelColumn label="ITEM NO" value="itemId" />
                <ExcelColumn label="ITEM NAME" value="itemName" />
                <ExcelColumn label="RESTAURANT ID" value="restaurantId" />
                <ExcelColumn label="STORE ID" value="storeId" />
                <ExcelColumn label="BUSINESS DATE" value="businessDate" />
                <ExcelColumn label="SOD INV." value="poOpngQty" />
                <ExcelColumn label="DAILY INV." value="poTodayQty" />
                <ExcelColumn label="WASTAGE" value="poWastageQty" />
                <ExcelColumn label="TOTAL" value="poNetQty" />
                <ExcelColumn
                  label="CONSUMPTION"
                  value="itemCurrConsumptionQty"
                />
                <ExcelColumn label="EOD INV." value="itemEodConsumptionQty" />
                <ExcelColumn
                  label="VARIANCE"
                  value="itemConsumptionVarianceQty"
                />
                <ExcelColumn label="AMOUNT" value="itemConsumptionAmount" />
                <ExcelColumn label="COMMENTS FOR VARIANCE" value="remarks" />
                <ExcelColumn
                  label="STATUS"
                  value={(col) =>
                    Number(col.itemConsumptionVarianceQty) < 0
                      ? "In-Complete"
                      : "Complete"
                  }
                />
                <ExcelColumn label="createdBy" value="createdBy" />
                <ExcelColumn label="createdDate" value="createdDate" />
                <ExcelColumn label="updatedBy" value="updatedBy" />
                <ExcelColumn label="updatedDate" value="updatedDate" />
              </ExcelSheet>
            </ExcelFile>
          </Col>
          <Col sm={4} style={{ textAlign: "start" }}>
            <SaveButton onClick={saveAllChangedList}>SAVE</SaveButton>
          </Col>
          <Col sm={2} style={{ textAlign: "end" }}>
          </Col>
        </Row>
      </div>
      {/* <MyPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      /> */}
    </div>
  );
};
