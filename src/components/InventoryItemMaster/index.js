import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Row, Col } from "react-bootstrap";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import {
  getActiveInventory,
  saveUpdateInventoryItem,
  deleteInventoryItem,
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
  width: 70%;
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
  font-size: 14px;
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

const CusTextFieldSearch = styled(TextField)`
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
  font-family: 'Roboto';
  color: #000;
}
 }
`;

const CuTypography = styled(Typography)`
  color: #7f7f7f;
  font-weight: bold;
  font-size: 0.75rem;
  line-height: 1rem;
`;


export const InventoryItemMaster = () => {
  const activeInventory = useSelector(
    (state) => state.inventory.activeInventory
  );
  const activeInventoryLoading = useSelector(
    (state) => state.inventory.activeInventoryLoading
  );
  const uomList = useSelector((state) => state.inventory.uomList);
  const categoryList = useSelector((state) => state.inventory.categoryList);
  const categorySubList = useSelector((state) => state.inventory.categorySubList);
  const user = useSelector((state) => state.auth.user);

  const [isSave, setIsSave] = useState({});
  const [isAddNew, setIsAddNew] = useState(false);
  const [itemCategory, setItemCategory] = useState("");
  const [itemSubCategory, setItemSubCategory] = useState("");
  const [itemUom, setItemUOM] = useState("");
  const [currentItemName, setCurrentItemName] = useState({});
  const [currentItemNo, setCurrentItemNo] = useState({});
  const [currentItemGst, setCurrentItemGst] = useState({});
  const [currentItemUnitCost, setCurrentItemUnitCost] = useState({});
  const [itemTrackingFlag, setItemTrackingFlag] = useState("");

  const [newItemCategory, setNewItemCategory] = useState(
    categoryList && categoryList.length > 0
      ? categoryList[0].configCriteriaValue
      : ""
  );
  const [newItemSubCategory, setNewItemSubCategory] = useState(
    categorySubList ? categorySubList[0].configCriteriaValue : ""
  );
  const [newItemUOM, setNewItemUOM] = useState(
    uomList ? uomList[0].configCriteriaValue : ""
  );
  const [newItemName, setNewItemName] = useState("");
  const [newItemNo, setNewItemNo] = useState("");
  const [newItemGst, setNewItemGst] = useState("");
  const [newItemUnitCost, setNewItemUnitCost] = useState("");
  const [keywords, setKeywords] = useState("");
  const [newTrackingFlag, setNewTrackingFlag] = useState("Y");
  const [pagination, setPagination] = useState({
    data: activeInventory,
    offset: 0,
    numberPerPage: 20,
    pageCount: 0,
    currentData: activeInventory.slice(0, 20),
  });
  const [searchedAllActiveInventory, setSearchedAllActiveInventory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getActiveInventory());
    dispatch(getActiveInventory(user.restaurantId));
  }, []);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: searchedAllActiveInventory.length / prevState.numberPerPage,
      currentData: searchedAllActiveInventory.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, searchedAllActiveInventory]);

  useEffect(() => {
    if(keywords && activeInventory && activeInventory.length > 0){
        setSearchedAllActiveInventory(activeInventory.filter(function (el) {
          return el.itemName.toLowerCase().includes(keywords.toLowerCase());
        }))
    }else{
      setSearchedAllActiveInventory(activeInventory)
    }
  }, [keywords, activeInventory]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const updateItemHandle = (oldItem) => {
    const newItem = {
      ...oldItem,
      itemId: currentItemNo[oldItem.itemId]
        ? currentItemNo[oldItem.itemId]
        : oldItem.itemId,
      itemName: currentItemName[oldItem.itemId]
        ? currentItemName[oldItem.itemId]
        : oldItem.itemName,
      itemCategory: itemCategory ? itemCategory : oldItem.itemCategory,
      itemSubCategory: itemSubCategory ? itemSubCategory : oldItem.itemSubCategory,
      itemUom: itemUom ? itemUom : oldItem.itemUom,
      itemGstPercentage: currentItemGst[oldItem.itemId]
        ? currentItemGst[oldItem.itemId]
        : oldItem.itemGstPercentage,
        itemUnitCost: currentItemUnitCost[oldItem.itemId]
        ? currentItemUnitCost[oldItem.itemId]
        : oldItem.itemUnitCost,
      itemTrackingFlag: itemTrackingFlag
        ? itemTrackingFlag
        : oldItem.itemTrackingFlag,
      itemStatus: "ACTIVE",
      updatedBy: user.loginId,
      updatedDate: new Date(),
      restaurantId: user.restaurantId,
      storeId: "ALL",
    };

    dispatch(saveUpdateInventoryItem(newItem,user.restaurantId)).then((res) => {
      if (res) {
        onSaveClickHandle(oldItem.itemId);
        //clearStates();
      }
    });
  };

  const saveNewItem = () => {
    if (!newItemName) {
      toast.error("Item name is mandatory!");
      return;
    }

    /* if (!newItemNo) {
      toast.error("Item No is mandatory!");
      return;
    } */

    const newItem = {
      // itemId: newItemNo,
      restaurantId: user.restaurantId,
      storeId: "ALL",
      itemName: newItemName,
      itemCategory: newItemCategory,
      itemSubCategory: newItemSubCategory,
      itemUom: newItemUOM,
      itemUnitCost:newItemUnitCost,
      itemGstPercentage: newItemGst,
      itemTrackingFlag: newTrackingFlag ? newTrackingFlag : "Y",
      itemStatus: "ACTIVE",
      createdBy: user.loginId,
      createdDate: new Date(),
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    dispatch(saveUpdateInventoryItem(newItem,user.restaurantId)).then((res) => {
      if (res) {
        clearStates();
        setIsAddNew(false);
      }
    });
  };

  const softDeleteItem = (id) => {
    dispatch(deleteInventoryItem(id, user.loginId,user.restaurantId));
  };

  const clearStates = () => {
    setItemCategory("");
    setItemSubCategory("");
    setItemUOM("");
    setCurrentItemName({});
    setCurrentItemNo({});
    setCurrentItemGst({});
    setCurrentItemUnitCost({});
    setItemTrackingFlag("");

    setNewItemCategory("");
    setNewItemSubCategory("");
    setNewItemUOM("");
    setNewItemName("");
    setNewItemNo("");
    setNewItemGst("");
    setNewItemUnitCost("");
    setNewTrackingFlag("");
  };

  const columns = [
    { id: 'no', label: '#', minWidth: 30, align: 'center' },
    { id: 'item_no', label: 'ITEM NO', minWidth:30, align: 'center'},
    { id: 'item_name', label: 'ITEM NAME', minWidth: 200, align: 'center'},
    { id: 'category', label: 'CATEGORY', minWidth: 100, align: 'center'},
    { id: 'sub_category', label: 'SUB CATEGORY', minWidth: 100, align: 'center'},
    { id: 'uom', label: 'UOM', minWidth: 80, align: 'center' },
    { id: 'gst', label: 'GST', minWidth: 80, align: 'center' },
    { id: 'cost', label: 'COST', minWidth: 80, align: 'center' },
    { id: 'track', label: 'TRACK', minWidth: 100, align: 'center' },
    { id: 'action', label: 'ACTION', minWidth: 50, align: 'center'},
  ];

  return (
    <Layout sidebar headerTitle="INVENTORY ITEM MASTER">
       <Row>
        <Col sm={6}>
        <div style={{ display: "flex" }} className="align-items-center mb-3">
              <div style={{ width: "150px" }}>
                <CuTypography>Search By Name :</CuTypography>
              </div>
              <div style={{ width: "100%" }}>
                <CusTextFieldSearch
                  value={keywords}
                  onChange={(event) => {
                    setKeywords(event.target.value);
                  }}
                  fullWidth
                  label="Search By Name"
                />
              </div>
            </div>
        </Col>
      </Row>
      <TableContainer component={Paper} sx={{ maxHeight: 480 }}>
        {/* <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">NO</CusTableCell1>
              <CusTableCell1 align="center">ITEM NO</CusTableCell1>
              <CusTableCell1 align="center">ITEM NAME</CusTableCell1>
              <CusTableCell1 align="center">CATEGORY</CusTableCell1>
              <CusTableCell1 align="center">SUB CATEGORY</CusTableCell1>
              <CusTableCell1 align="center">UOM</CusTableCell1>
              <CusTableCell1 align="center">GST</CusTableCell1>
              <CusTableCell1 align="center">COST</CusTableCell1>
              <CusTableCell1 align="center" sx={{ width: "20px" }}>
                TRACK
              </CusTableCell1>
              <CusTableCell1 align="center">ACTION</CusTableCell1>
            </TableRow>
          </TableHead> */}

        <Table stickyHeader aria-label="sticky table">
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
                {searchedAllActiveInventory && searchedAllActiveInventory.length > 0 ? (
                  <>
                    {searchedAllActiveInventory
                      .slice(
                        pagination.offset,
                        pagination.offset + pagination.numberPerPage
                      )
                      .map((item, index) => (
                        <TableRow key={item.itemId}>
                          <CusTableCell align="center">
                            {index + 1 + pagination.offset}
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              defaultValue={item.itemId}
                              value={currentItemNo[item.itemId]}
                              onChange={(event) => {
                                const nos = {
                                  ...currentItemNo,
                                  [item.itemId]: event.target.value,
                                };
                                setCurrentItemNo(nos);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={/* !isSave[item.itemId] */ true}
                              InputProps={{
                                disableUnderline: true, // <== added this
                              }}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              defaultValue={item.itemName}
                              value={currentItemName[item.itemId]}
                              onChange={(event) => {
                                const names = {
                                  ...currentItemName,
                                  [item.itemId]: event.target.value,
                                };
                                setCurrentItemName(names);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.itemId]}
                              InputProps={{
                                disableUnderline: true, // <== added this
                              }}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                               disableUnderline
                                key={item.itemId}
                                defaultValue={item.itemCategory}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setItemCategory(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.itemId]}
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
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.itemId}
                                defaultValue={item.itemSubCategory}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setItemSubCategory(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.itemId]}
                              >
                                {categorySubList &&
                                  categorySubList.map((item) => (
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
                                  Select Sub Category
                                </option>
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                              disableUnderline
                                key={item.itemId}
                                defaultValue={item.itemUom}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setItemUOM(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.itemId]}
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

                          <CusTableCell align="center" sx={{ width: "20px" }}>
                            <CusTextField
                              key={item.itemId}
                              defaultValue={item.itemGstPercentage}
                              value={currentItemGst[item.itemId]}
                              onChange={(event) => {
                                const gst = {
                                  ...currentItemGst,
                                  [item.itemId]: event.target.value,
                                };
                                setCurrentItemGst(gst);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.itemId]}
                              InputProps={{
                                disableUnderline: true, // <== added this
                              }}
                            />
                          </CusTableCell>

                          <CusTableCell align="center" sx={{ width: "20px" }}>
                            <CusTextField
                              key={item.itemId}
                              defaultValue={item.itemUnitCost}
                              value={currentItemUnitCost[item.itemId]}
                              onChange={(event) => {
                                const unitCost = {
                                  ...currentItemUnitCost,
                                  [item.itemId]: event.target.value,
                                };
                                setCurrentItemUnitCost(unitCost);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.itemId]}
                              InputProps={{
                                disableUnderline: true, // <== added this
                              }}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                              disableUnderline
                                key={item.itemId}
                                defaultValue={item.itemTrackingFlag}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setItemTrackingFlag(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.itemId]}
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
                            {isSave[item.itemId] ? (
                              <IconButton
                                key={item.itemId}
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "#92D050", // Update
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
                                key={item.itemId}
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
                              key={item.itemId}
                              sx={{
                                fontSize: "0.75rem",
                                color: "red",
                              }}
                              onClick={() => {
                                softDeleteItem(item.itemId);
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
                          {/* <CusTextField
                            value={newItemNo}
                            onChange={(event) => {
                              setNewItemNo(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          /> */}
                          <Typography sx={{ fontSize: "0.75rem" }}>
                            N/A
                          </Typography>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newItemName}
                            onChange={(event) => {
                              setNewItemName(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          />
                        </CusTableCell>
                        <CusTableCell align="center">
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
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewItemSubCategory(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem" }}
                            >
                              <option
                                value={""}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Select Sub Category
                              </option>
                              {categorySubList &&
                                categorySubList.map((item) => (
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
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
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
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newItemUnitCost}
                            onChange={(event) => {
                              setNewItemUnitCost(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                            InputProps={{
                              disableUnderline: true, // <== added this
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
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
                              color: "#92D050", //Save
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
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'}}>
      <SaveButton style={{height: '62%'}}
        className="mt-4"
        onClick={
          /* handleShowAdd */ () => {
            setIsAddNew(true);
          }
        }
      >
        ADD ANOTHER
      </SaveButton>

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
      </div>
    </Layout>
  );
};
