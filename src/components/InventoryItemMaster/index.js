import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import {
  getActiveInventory,
  saveUpdateInventoryItem,
  deleteInventoryItem,
} from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

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

 & .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color:  #404040;
  }
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
  const user = useSelector((state) => state.auth.user);

  const [isSave, setIsSave] = useState({});
  const [isAddNew, setIsAddNew] = useState(false);
  const [itemCategory, setItemCategory] = useState("");
  const [itemUOM, setItemUOM] = useState("");
  const [currentItemName, setCurrentItemName] = useState({});
  const [currentItemNo, setCurrentItemNo] = useState({});
  const [currentItemGst, setCurrentItemGst] = useState({});
  const [itemTrackingFlag, setItemTrackingFlag] = useState("");

  const [newItemCategory, setNewItemCategory] = useState(
    categoryList ? categoryList[0].configCriteriaValue : ""
  );
  const [newItemUOM, setNewItemUOM] = useState(
    uomList ? uomList[0].configCriteriaValue : ""
  );
  const [newItemName, setNewItemName] = useState("");
  const [newItemNo, setNewItemNo] = useState("");
  const [newItemGst, setNewItemGst] = useState("");
  const [newTrackingFlag, setNewTrackingFlag] = useState("Y");
  const [pagination, setPagination] = useState({
    data: activeInventory,
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: activeInventory.slice(0, 10),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveInventory());
  }, []);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: activeInventory.length / prevState.numberPerPage,
      currentData: activeInventory.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, activeInventory]);

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
      itemId: currentItemNo[oldItem.id]
        ? currentItemNo[oldItem.id]
        : oldItem.itemId,
      itemName: currentItemName[oldItem.id]
        ? currentItemName[oldItem.id]
        : oldItem.itemName,
      itemCategory: itemCategory ? itemCategory : oldItem.itemCategory,
      itemUOM: itemUOM ? itemUOM : oldItem.itemUOM,
      itemGstPercentage: currentItemGst[oldItem.id]
        ? currentItemGst[oldItem.id]
        : oldItem.itemGstPercentage,
      itemTrackingFlag: itemTrackingFlag
        ? itemTrackingFlag
        : oldItem.itemTrackingFlag,
      itemStatus: "ACTIVE",
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    dispatch(saveUpdateInventoryItem(newItem)).then((res) => {
      if (res) {
        onSaveClickHandle(oldItem.id);
        clearStates();
      }
    });
  };

  const saveNewItem = () => {
    if (!newItemName) {
      toast.error("Item name is mandatory!");
      return;
    }

    if (!newItemNo) {
      toast.error("Item No is mandatory!");
      return;
    }

    const newItem = {
      itemId: newItemNo,
      itemName: newItemName,
      itemCategory: newItemCategory,
      itemUOM: newItemUOM,
      itemGstPercentage: newItemGst,
      itemTrackingFlag: newTrackingFlag ? newTrackingFlag : "Y",
      itemStatus: "ACTIVE",
      createdBy: user.loginId,
      createdDate: new Date(),
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    dispatch(saveUpdateInventoryItem(newItem)).then((res) => {
      if (res) {
        clearStates();
        setIsAddNew(false);
      }
    });
  };

  const softDeleteItem = (id) => {
    dispatch(deleteInventoryItem(id, user.loginId));
  };

  const clearStates = () => {
    setItemCategory("");
    setItemUOM("");
    setCurrentItemName({});
    setCurrentItemNo({});
    setCurrentItemGst({});
    setItemTrackingFlag("");

    setNewItemCategory("");
    setNewItemUOM("");
    setNewItemName("");
    setNewItemNo("");
    setNewItemGst("");
    setNewTrackingFlag("");
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ maxHeight: 430 }}>
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
                                  color: "green",
                                }}
                                onClick={() => {
                                  updateItemHandle(item);
                                }}
                              >
                                <DoneIcon
                                  sx={{ height: "0.95rem", width: "0.95rem" }}
                                ></DoneIcon>
                              </IconButton>
                            ) : (
                              <IconButton
                                key={item.id}
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "green",
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
                              color: "green",
                            }}
                            onClick={() => {
                              saveNewItem();
                            }}
                          >
                            <DoneIcon
                              sx={{ height: "0.95rem", width: "0.95rem" }}
                            ></DoneIcon>
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
      <SaveButton
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
  );
};
