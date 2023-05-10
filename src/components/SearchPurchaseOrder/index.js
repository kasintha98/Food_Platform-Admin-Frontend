import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDays } from "date-fns";
import styled from "@emotion/styled";
import { Row, Col, Dropdown, Modal } from "react-bootstrap";
import { DateRangePicker, DefinedRange } from "react-date-range";
import DropdownMenu from "@atlaskit/dropdown-menu";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
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
  Autocomplete,
  Box
} from "@mui/material";
import {
  getActiveSuppliers,
  getClosedPurchaseOrders,
  getSubmittedRecievedPurchaseOrders,
  savePurchaseOrderStatus,
  getActiveInventory,
  getInventoryPurchaseCategory,
  saveUpdatePurchaseOrder
} from "../../actions";
import { EditPurchaseOrder } from "../EditPurchaseOrder";
import { lightGreen, yellow } from "@mui/material/colors";

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
  text-align: center !important;
}
 }

 & .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color:  #404040;
  }
`;

const CusTableCell1 = styled(TableCell)`
  font-size: 10px;
  font-weight: bold;
  background-color: #35455e;
  color: #fff;
  padding: 0;
  padding-left: 3px;
  padding-right: 3px;
`;

// const CusTableCell = styled(TableCell)`
//   padding: 0;
//   font-size: 14px;
//   border: 1px solid #000;
//   border-left: none;
//   border-right: none;
// `;

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
  border-left: none;
  border-right: none;
`;

const CusModal = styled(Modal)`
& .modal-dialog{
    max-width: 93%;
  },
`;

const CusAutocomplete = styled(Autocomplete)`
  & input {
    font-size: 0.75rem;
    padding: 0 !important;
    height: 0.75rem !important;
    text-align: center !important;
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

export const SearchPurchaseOrder = () => {
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const user = useSelector((state) => state.auth.user);
  const allSuppliers = useSelector((state) => state.inventory.allSuppliers);
  const closedPurchaseOrders = useSelector(
    (state) => state.inventory.closedPurchaseOrders
  );
  const activeInventory = useSelector(
    (state) => state.inventory.activeInventory
  );
  const activeInventoryLoading = useSelector(
    (state) => state.inventory.activeInventoryLoading
  );
  const closedPurchaseOrderLoading = useSelector(
    (state) => state.inventory.closedPurchaseOrderLoading
  );
  const allSuppliersLoading = useSelector(
    (state) => state.inventory.allSuppliersLoading
  );
  const purchaseOrderCategoryLoading = useSelector(
    (state) => state.inventory.purchaseOrderCategoryLoading
  );
  const purchaseOrderCategory = useSelector(
    (state) => state.inventory.purchaseOrderCategory
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
  const [selectedSearchPOstatus, setSelectedSearchPOstatus] = useState("SUBMITTED");
  
  const [poStatus, setPOStatus] = useState({});
  const [isSave, setIsSave] = useState({});

  const [selectedSupplierObj, setSelectedSupplierObj] = useState(null);
  const [groupedData, setGroupedData] = useState({});
  const [renderGroupedData, setRenderGroupedData] = useState([]);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const [currentSelectedItem, setCurrentSelectedItem] = useState({});
  const [currentItemQty, setCurrentItemQty] = useState({});
  const [currentItemWastage, setCurrentItemWastage] = useState({});
  const [currentItemPrice, setCurrentItemPrice] = useState({});
  const [currentItemDiscount, setCurrentItemDiscount] = useState({});
  const [currentItemTotalStock, setCurrentItemTotalStock] = useState({});
  const [currentItemCategory, setCurrentItemCategory] = useState({});
  const [searchedList, setSearchedList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [change, setChange] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getActiveSuppliers());
    dispatch(getActiveSuppliers( user.restaurantId,
      "ALL"));
    dispatch(getActiveInventory(user.restaurantId));
    dispatch(getInventoryPurchaseCategory(user.restaurantId));
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
    selectedSearchPOstatus
  ]);

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleChangeSearchPOStatus = (event) => {
    setSelectedSearchPOstatus(event.target.value);
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

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const savePurchaseOrderStatusToDB = (id, item) => {
    if (poStatus && poStatus !== item.purchaseOrderStatus) {
      const obj = {
        purchaseOrderId: id,
        itemStatus: poStatus,
        updatedBy: user.loginId,
      };
      dispatch(savePurchaseOrderStatus(obj)).then((res) => {
        if (res) {
          setPOStatus("");
          dispatch(getSubmittedRecievedPurchaseOrders()).then((res) => {
            if (res) {
              setIsSave({});
              searchPurchaseOrders(res);
            }
          });
        }
      });
    } else {
      setIsSave({});
    }
  };

  const updateItemHandle = (item) => {
    const newObj = {
      ...item,
      itemId: currentSelectedItem[item.purchaseOrderId+item.itemId]
        ? currentSelectedItem[item.purchaseOrderId+item.itemId].itemId
        : item.itemId,
      itemName: currentSelectedItem[item.purchaseOrderId+item.itemId]
        ? currentSelectedItem[item.purchaseOrderId+item.itemId].itemName
        : getInventoryItemObjById(item.itemId).itemName,
      itemUom: currentSelectedItem[item.purchaseOrderId+item.itemId]
        ? currentSelectedItem[item.purchaseOrderId+item.itemId].itemUom
        : getInventoryItemObjById(item.itemId).itemUom,
      purchaseQty: currentItemQty[item.purchaseOrderId+item.itemId]
        ? Number(currentItemQty[item.purchaseOrderId+item.itemId])
        : item.purchaseQty,
      wastageQty: currentItemWastage[item.purchaseOrderId+item.itemId]
        ? Number(currentItemWastage[item.purchaseOrderId+item.itemId])
        : item.wastageQty,
      quotedPurchasePrice: currentItemPrice[item.purchaseOrderId+item.itemId]
        ? Number(currentItemPrice[item.purchaseOrderId+item.itemId])
        : item.quotedPurchasePrice,
      discountAmount: currentItemDiscount[item.purchaseOrderId+item.itemId]
        ? Number(currentItemDiscount[item.purchaseOrderId+item.itemId])
        : item.discountAmount,
      netPurchasePrice: getFinalPrice(item),
      netQty: getTotalStock(item),
      itemGST: currentSelectedItem[item.purchaseOrderId+item.itemId]
        ? currentSelectedItem[item.purchaseOrderId+item.itemId].itemGstPercentage
        : getInventoryItemObjById(item.itemId).itemGstPercentage,
      gstAmount: (
        getFinalPrice(item) *
        (Number(
          currentSelectedItem[item.purchaseOrderId+item.itemId]
            ? currentSelectedItem[item.purchaseOrderId+item.itemId].itemGstPercentage
            : getInventoryItemObjById(item.itemId).itemGstPercentage
        ) /
          100)
      ).toFixed(2),
      purchaseCategory: currentItemCategory[item.purchaseOrderId+item.itemId]
        ? currentItemCategory[item.purchaseOrderId+item.itemId]
        : item.purchaseCategory,
      purchaseOrderStatus: poStatus[item.purchaseOrderId+item.itemId]
      ? poStatus[item.purchaseOrderId+item.itemId]
      : item.purchaseOrderStatus,

      /* restaurantId: props.product.restaurantId,
      storeId: props.product.storeId,
      supplierId: props.product.supplierId,
      purchaseDate: props.product.purchaseDate,
      billNumber: props.product.billNumber,
      purchaseOrderStatus: props.product.purchaseOrderStatus,
      purchaseOrderId: props.product.purchaseOrderId,
      createdBy: props.product.createdBy,
      createdDate: props.product.createdDate, */
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    console.log(newObj);

    dispatch(saveUpdatePurchaseOrder(newObj, true)).then((res) => {
      if (res) {
        onSaveClickHandle(item.purchaseOrderId+item.itemId);
      }
    });
  };

  const searchPurchaseOrders = (mList) => {
    let list = mList ? mList : closedPurchaseOrders;
    if (list) {
      let searched = list;

      if (selectedStoreObj) {
        searched = searched.filter(function (el) {
          return (
            selectedStoreObj.restaurantId === el.restaurantId &&
            selectedStoreObj.storeId === el.storeId
          );
        });
      }

      if(user.roleCategory !== "SUPER_ADMIN"){
        searched = searched.filter(function (el) {
          return (
            user.restaurantId === el.restaurantId &&
            user.storeId === el.storeId
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

      if(selectedSearchPOstatus){
        searched = searched.filter(function (el) {
          return el.purchaseOrderStatus.toLowerCase().includes(selectedSearchPOstatus.toLowerCase());
        });
      }

      setSearchedList(searched)
      console.log(searched);
      setFiltered(searched)
      //groupBypurchaseOrderId(searched);
    }
  };

  useEffect(()=>{console.log("Changed"); setChange(change => change+1)}, [filtered])

  const groupBypurchaseOrderId = (list) => {
    let grouped = list.reduce(function (r, a) {
      r[a.purchaseOrderId] = r[a.purchaseOrderId] || { items: [], total: 0 };
      r[a.purchaseOrderId].items.push(a);
      r[a.purchaseOrderId].restaurantId = a.restaurantId;
      r[a.purchaseOrderId].storeId = a.storeId;
      r[a.purchaseOrderId].restaurantName = a.restaurantName;
      r[a.purchaseOrderId].storeName = a.storeName;
      r[a.purchaseOrderId].supplierName = a.supplierName;
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
    setRenderGroupedData(Object.values(grouped));
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

  const getFinalPrice = (item) => {
    if (!currentItemPrice[item.purchaseOrderId+item.itemId] && !currentItemDiscount[item.purchaseOrderId+item.itemId]) {
      return Number(item.netPurchasePrice);
    }

    if (currentItemPrice[item.purchaseOrderId+item.itemId] && currentItemDiscount[item.purchaseOrderId+item.itemId]) {
      return (
        Number(currentItemPrice[item.purchaseOrderId+item.itemId]) -
        Number(currentItemDiscount[item.purchaseOrderId+item.itemId])
      );
    }

    if (currentItemPrice[item.purchaseOrderId+item.itemId] && !currentItemDiscount[item.purchaseOrderId+item.itemId]) {
      return (
        Number(currentItemPrice[item.purchaseOrderId+item.itemId]) - Number(item.discountAmount)
      );
    }

    if (!currentItemPrice[item.purchaseOrderId+item.itemId] && currentItemDiscount[item.purchaseOrderId+item.itemId]) {
      return (
        Number(item.quotedPurchasePrice) -
        Number(currentItemDiscount[item.purchaseOrderId+item.itemId])
      );
    }
  };

  const getTotalStock = (item) => {
    if (!currentItemQty[item.purchaseOrderId+item.itemId] && !currentItemWastage[item.purchaseOrderId+item.itemId]) {
      return Number(item.netQty);
    }

    if (currentItemQty[item.purchaseOrderId+item.itemId] && currentItemWastage[item.purchaseOrderId+item.itemId]) {
      return (
        Number(currentItemQty[item.purchaseOrderId+item.itemId]) -
        Number(currentItemWastage[item.purchaseOrderId+item.itemId])
      );
    }

    if (currentItemQty[item.purchaseOrderId+item.itemId] && !currentItemWastage[item.purchaseOrderId+item.itemId]) {
      return Number(currentItemQty[item.purchaseOrderId+item.itemId]) - Number(item.wastageQty);
    }

    if (!currentItemQty[item.purchaseOrderId+item.itemId] && currentItemWastage[item.purchaseOrderId+item.itemId]) {
      return Number(item.purchaseQty) - Number(currentItemWastage[item.purchaseOrderId+item.itemId]);
    }
  };

  const getInventoryItemObjById = (id)=>{
    let found =  activeInventory.find(
      (o) => o.itemId === id
    );
    if(found){
      return found;
    }else{
      return {}
    }
  }

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

  const renderTable = () =>{
    return <>
    {filtered.map((item) => (
      <TableRow key={[item.purchaseOrderId+item.itemId]}>
        <CusTableCell align="center" key={change}>
          <Typography sx={{ fontSize: "0.75rem" }}>
            {/* <Button
              sx={{ fontSize: "0.75rem" }}
              onClick={() => {
                setCurrentProduct(item);
                handleShowAdd();
              }}
            >
              {item.purchaseOrderId}
            </Button> */}
            {item.purchaseOrderId}
          </Typography>
        </CusTableCell>
        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {item.billNumber ? item.billNumber : "N/A"}
          </Typography>
        </CusTableCell>
        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {item.supplierName}
          </Typography>
        </CusTableCell>
        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {item.storeName}
          </Typography>
        </CusTableCell>
        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {renderDate(item.purchaseDate)}
          </Typography>
        </CusTableCell>
        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem", marginLeft: "10px !important" }}>
            {renderDate(item.updatedDate)}
          </Typography>
        </CusTableCell>


        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {currentSelectedItem[item.purchaseOrderId+item.itemId]
          ? currentSelectedItem[item.purchaseOrderId+item.itemId].itemId
          : item.itemId}
          </Typography>
        </CusTableCell>


        <CusTableCell align="center">
          <CusAutocomplete
            disabled={!isSave[item.purchaseOrderId+item.itemId]}
            onChange={(event, newValue) => {
              const items = {
                ...currentSelectedItem,
                [item.purchaseOrderId+item.itemId]: newValue,
              };
              setCurrentSelectedItem(items);
            }}
            defaultValue={getInventoryItemObjById(item.itemId)}
            sx={{
              fontSize: "0.75rem",
              marginTop: "15px",
              ".MuiFormControl-root": { marginTop: "4px" },
              ".Mui-disabled" : {color: "black"}
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
                  disableUnderline: true
                }}
              />
            )}
          />
        </CusTableCell>
        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {currentSelectedItem[item.purchaseOrderId+item.itemId]
              ? currentSelectedItem[item.purchaseOrderId+item.itemId].itemUom
              : getInventoryItemObjById(item.itemId).itemUom}
          </Typography>
        </CusTableCell>
        <CusTableCell align="center">
          <CusTextField
            defaultValue={item.purchaseQty}
            value={currentItemQty[item.purchaseOrderId+item.itemId]}
            onChange={(event) => {
              const qty = {
                ...currentItemQty,
                [item.purchaseOrderId+item.itemId]: event.target.value,
              };
              setCurrentItemQty(qty);
            }}
            fullWidth
            variant="standard"
            disabled={!isSave[item.purchaseOrderId+item.itemId]}
            InputProps={{
              disableUnderline: true, // <== added this
            }}
          />
        </CusTableCell>

        <CusTableCell align="center">
          <CusTextField
            defaultValue={item.wastageQty}
            value={currentItemWastage[item.purchaseOrderId+item.itemId]}
            onChange={(event) => {
              const wastage = {
                ...currentItemWastage,
                [item.purchaseOrderId+item.itemId]: event.target.value,
              };
              setCurrentItemWastage(wastage);
            }}
            fullWidth
            variant="standard"
            disabled={!isSave[item.purchaseOrderId+item.itemId]}
            InputProps={{
              disableUnderline: true, // <== added this
            }}
          />
        </CusTableCell>

        <CusTableCell align="center">
          <CusTextField
            defaultValue={item.quotedPurchasePrice}
            value={currentItemPrice[item.purchaseOrderId+item.itemId]}
            onChange={(event) => {
              const price = {
                ...currentItemPrice,
                [item.purchaseOrderId+item.itemId]: event.target.value,
              };
              setCurrentItemPrice(price);
            }}
            fullWidth
            variant="standard"
            disabled={!isSave[item.purchaseOrderId+item.itemId]}
            InputProps={{
              disableUnderline: true, // <== added this
            }}
          />
        </CusTableCell>

        <CusTableCell align="center">
          <CusTextField
            defaultValue={item.discountAmount}
            value={currentItemDiscount[item.purchaseOrderId+item.itemId]}
            onChange={(event) => {
              const discount = {
                ...currentItemDiscount,
                [item.purchaseOrderId+item.itemId]: event.target.value,
              };
              setCurrentItemDiscount(discount);
            }}
            fullWidth
            variant="standard"
            disabled={!isSave[item.purchaseOrderId+item.itemId]}
            InputProps={{
              disableUnderline: true, // <== added this
            }}
          />
        </CusTableCell>

        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {getFinalPrice(item)}
          </Typography>
        </CusTableCell>

        <CusTableCell align="center">
          {/* <CusTextField
            defaultValue={item.netQty}
            value={currentItemTotalStock[item.purchaseOrderId+item.itemId]}
            onChange={(event) => {
              const stock = {
                ...currentItemTotalStock,
                [item.purchaseOrderId+item.itemId]: event.target.value,
              };
              setCurrentItemTotalStock(stock);
            }}
            fullWidth
            variant="standard"
            disabled={!isSave[item.purchaseOrderId+item.itemId]}
            InputProps={{
              disableUnderline: true, // <== added this
            }}
          /> */}
          <Typography sx={{ fontSize: "0.75rem" }}>
            {getTotalStock(item)}
          </Typography>
        </CusTableCell>

        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {currentSelectedItem[item.purchaseOrderId+item.itemId]
              ? currentSelectedItem[item.purchaseOrderId+item.itemId].itemGstPercentage
              : getInventoryItemObjById(item.itemId).itemGstPercentage}
          </Typography>
        </CusTableCell>

        <CusTableCell align="center">
          <Typography sx={{ fontSize: "0.75rem" }}>
            {(
              getFinalPrice(item) *
              (Number(
                currentSelectedItem[item.purchaseOrderId+item.itemId]
                  ? currentSelectedItem[item.purchaseOrderId+item.itemId]
                      .itemGstPercentage
                  : getInventoryItemObjById(item.itemId).itemGstPercentage
              ) /
                100)
            ).toFixed(2)}
          </Typography>
        </CusTableCell>

        <CusTableCell align="center">
                <FormControl fullWidth sx={{ marginTop: "7px" }}>
                  <NativeSelect
                  disableUnderline
                    defaultValue={item.purchaseCategory}
                    disabled={!isSave[item.purchaseOrderId+item.itemId]}
                    inputProps={{
                      name: "status",
                      id: "uncontrolled-native",
                    }}
                    value={currentItemCategory[item.purchaseOrderId+item.itemId]}
                    onChange={(event) => {
                      const cat = {
                        ...currentItemCategory,
                        [item.purchaseOrderId+item.itemId]: event.target.value,
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
                    <option value={""} style={{ fontSize: "0.75rem" }}>
                      Select Category
                    </option>
                  </NativeSelect>
                </FormControl>
            </CusTableCell>
    



            <CusTableCell align="center" sx={{backgroundColor: item.purchaseOrderStatus === "SUBMITTED" ? "yellow": "lightGreen"}}>
              <FormControl fullWidth sx={{ marginTop: "5px"}}>
                <NativeSelect
                disableUnderline
                  disabled={!isSave[item.purchaseOrderId+item.itemId]}
                  defaultValue={item.purchaseOrderStatus}
                  inputProps={{
                    name: "status",
                    id: "uncontrolled-native",
                    disableUnderline: true,
                  }}
                  onChange={(event) => {
                    setPOStatus({...poStatus, [item.purchaseOrderId+item.itemId]: event.target.value});
                  }}
                  sx={{
                    fontSize: "0.75rem",
                  }}
                >
                  {item.purchaseOrderStatus === "SUBMITTED" ? (
                    <option
                      value={"SUBMITTED"}
                      style={{ fontSize: "0.75rem" }}
                    >
                      SUBMITTED
                    </option>
                  ) : null}
                  {item.purchaseOrderStatus === "SUBMITTED" ? (
                    <option
                      value={"RECEIVED"}
                      style={{ fontSize: "0.75rem" }}
                    >
                      RECEIVED
                    </option>
                  ) : null}
                  {item.purchaseOrderStatus === "RECEIVED" ? (
                    <option
                      value={"RECEIVED"}
                      style={{ fontSize: "0.75rem" }}
                    >
                      RECEIVED
                    </option>
                  ) : null}
                  {item.purchaseOrderStatus === "RECEIVED" ? (
                    <option
                      value={"SUBMITTED"}
                      style={{ fontSize: "0.75rem" }}
                    >
                      SUBMITTED
                    </option>
                  ) : null}

                  {/* <option
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
                  </option> */}
                </NativeSelect>
              </FormControl>
            </CusTableCell>
            <CusTableCell align="center">
              {isSave[item.purchaseOrderId+item.itemId] ? (
                <IconButton
                  sx={{
                    fontSize: "0.75rem",
                    color: "#92D050",
                  }}
                  onClick={() => {
                    /* savePurchaseOrderStatusToDB(
                      item.purchaseOrderId,
                      item
                    ); */
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
                  disabled={
                    item.purchaseOrderStatus === "RECEIVED"
                  }
                  sx={{
                    fontSize: "0.75rem",
                    color: "#FFC000",
                  }}
                  onClick={() => {
                    onEditClickHandle(item.purchaseOrderId+item.itemId);
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
            </CusTableCell>
      </TableRow>
    ))}
  </>
  }

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
          <Col sm={3}>
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
            </FormControl> :
            <CuTypography>{getSelectableStores(stores)[0].resturantName}</CuTypography>
            }
              
            </div>
          </Col>
          <Col sm={3}>
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
          <Col sm={3}>
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
          <Col sm={3}>
            <div style={{ display: "flex" }} className="align-items-center">
              <div style={{ width: "125px" }}>
                <CuTypography>By PO Status:</CuTypography>
              </div>
              <FormControl fullWidth>
                <InputLabel
                  shrink={true}
                  sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                  id="demo-simple-select-label"
                >
                  Please select PO Status
                </InputLabel>
                <CusSelect
                  sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSearchPOstatus}
                  label="Please select PO Status"
                  onChange={handleChangeSearchPOStatus}
                  notched={true}
                >
                  {/* <MenuItem
                      value={""}
                    >
                      <span>
                      N/A
                      </span>
                  </MenuItem> */}
                  <MenuItem
                      value={"SUBMITTED"}
                    >
                      <span>
                      SUBMITTED
                      </span>
                  </MenuItem>
                  <MenuItem
                      value={"RECEIVED"}
                    >
                      <span>
                      RECEIVED
                      </span>
                  </MenuItem>
                </CusSelect>
              </FormControl>
            </div>
          </Col>
        </Row>
      </div>
      
      <div className="mt-3">
        <TableContainer className="mt-3" component={Paper} sx={{ maxHeight: "60vh", width: "92.7vw" }}>
          <Table sx={{ marginBottom: 40 }} stickyHeader>
            <TableHead>
              <TableRow>
                <CusTableCell1 align="center">PO#</CusTableCell1>
                <CusTableCell1 align="center">BILL#</CusTableCell1>
                <CusTableCell1 align="center">SUPPLIER</CusTableCell1>
                <CusTableCell1 align="center">RECIEVING STORE</CusTableCell1>
                <CusTableCell1 align="center">PO DATE</CusTableCell1>
                <CusTableCell1 align="center" sx={{marginLeft: "10px !important"}}>UPDATED DATE</CusTableCell1>
                <CusTableCell1 align="center">ITEM#</CusTableCell1>
                <CusTableCell1 align="center" sx={{minWidth: 170}}>INGREDIENT NAME</CusTableCell1>
                <CusTableCell1 align="center">UOM</CusTableCell1>
                <CusTableCell1 align="center" sx={{width: 90}}>QTY</CusTableCell1>
                <CusTableCell1 align="center" sx={{width: 60}}>WAST</CusTableCell1>
                <CusTableCell1 align="center" sx={{width: 90}}>COST</CusTableCell1>
                <CusTableCell1 align="center" sx={{width: 90}}>DISCOUNT</CusTableCell1>
                <CusTableCell1 align="center">PO VALUE</CusTableCell1>
                <CusTableCell1 align="center">STOCK</CusTableCell1>
                <CusTableCell1 align="center">GST%</CusTableCell1>
                <CusTableCell1 align="center">GST AMT.</CusTableCell1>
                <CusTableCell1 align="center">CATEGORY</CusTableCell1>
                <CusTableCell1 align="center">PO STATUS</CusTableCell1>
                <CusTableCell1 align="center" sx={{paddingRight: "5px !important"}}>ACTION</CusTableCell1>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSuppliersLoading || closedPurchaseOrderLoading || purchaseOrderCategoryLoading || activeInventoryLoading ? (
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
                  {filtered.length > 0 ? (
                    <>
                    {/* <p>{filtered.length}</p> */}
                    {renderTable()}
                    </>
                    
                  ) : (
                    <TableRow>
                      <TableCell colSpan={15}>
                        <Alert severity="warning">
                          No {selectedSearchPOstatus ? selectedSearchPOstatus : "SUBMITTED/ RECEIVED"} PO found for search criteria;
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
