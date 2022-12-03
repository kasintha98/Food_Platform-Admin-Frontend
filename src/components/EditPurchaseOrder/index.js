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

export const EditPurchaseOrder = (props) => {
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);

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
  const [isSave, setIsSave] = useState({});
  const [currentSelectedItem, setCurrentSelectedItem] = useState({});
  const [currentItemQty, setCurrentItemQty] = useState({});
  const [currentItemWastage, setCurrentItemWastage] = useState({});
  const [currentItemPrice, setCurrentItemPrice] = useState({});
  const [currentItemDiscount, setCurrentItemDiscount] = useState({});
  const [currentItemTotalStock, setCurrentItemTotalStock] = useState({});
  const [currentItemCategory, setCurrentItemCategory] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveInventory()).then((res) => {
      if (res) {
        let its = {};
        for (let i = 0; i < props.product.items.length; i++) {
          let found = res.find(
            (o) => o.itemId === props.product.items[i].itemId
          );
          its = { ...its, [found.itemId]: found };
        }
        setCurrentSelectedItem(its);
      }
    });
    dispatch(getInventoryPurchaseCategory());
  }, []);

  const clearDataAll = () => {
    setIsSave({});
    setCurrentSelectedItem({});
    setCurrentItemQty({});
    setCurrentItemWastage({});
    setCurrentItemPrice({});
    setCurrentItemDiscount({});
    setCurrentItemTotalStock({});
    setCurrentItemCategory({});
  };

  const onEditClickHandle = (id) => {
    let edits = { ...isSave, [id]: true };
    setIsSave(edits);
  };

  const onSaveClickHandle = (id) => {
    let edits = { ...isSave, [id]: false };
    setIsSave(edits);
  };

  const getFinalPrice = (item) => {
    if (!currentItemPrice[item.itemId] && !currentItemDiscount[item.itemId]) {
      return Number(item.netPurchasePrice);
    }

    if (currentItemPrice[item.itemId] && currentItemDiscount[item.itemId]) {
      return (
        Number(currentItemPrice[item.itemId]) -
        Number(currentItemDiscount[item.itemId])
      );
    }

    if (currentItemPrice[item.itemId] && !currentItemDiscount[item.itemId]) {
      return (
        Number(currentItemPrice[item.itemId]) - Number(item.discountAmount)
      );
    }

    if (!currentItemPrice[item.itemId] && currentItemDiscount[item.itemId]) {
      return (
        Number(item.quotedPurchasePrice) -
        Number(currentItemDiscount[item.itemId])
      );
    }
  };

  const getTotalStock = (item) => {
    if (!currentItemQty[item.itemId] && !currentItemWastage[item.itemId]) {
      return Number(item.netQty);
    }

    if (currentItemQty[item.itemId] && currentItemWastage[item.itemId]) {
      return (
        Number(currentItemQty[item.itemId]) -
        Number(currentItemWastage[item.itemId])
      );
    }

    if (currentItemQty[item.itemId] && !currentItemWastage[item.itemId]) {
      return Number(currentItemQty[item.itemId]) - Number(item.wastageQty);
    }

    if (!currentItemQty[item.itemId] && currentItemWastage[item.itemId]) {
      return Number(item.purchaseQty) - Number(currentItemWastage[item.itemId]);
    }
  };

  const updateItemHandle = (item) => {
    const newObj = {
      itemId: currentSelectedItem[item.itemId]
        ? currentSelectedItem[item.itemId].itemId
        : item.itemId,
      itemName: currentSelectedItem[item.itemId]
        ? currentSelectedItem[item.itemId].itemName
        : item.itemName,
      itemUOM: currentSelectedItem[item.itemId]
        ? currentSelectedItem[item.itemId].itemUOM
        : item.itemUOM,
      purchaseQty: currentItemQty[item.itemId]
        ? Number(currentItemQty[item.itemId])
        : item.purchaseQty,
      wastageQty: currentItemWastage[item.itemId]
        ? Number(currentItemWastage[item.itemId])
        : item.wastageQty,
      quotedPurchasePrice: currentItemPrice[item.itemId]
        ? Number(currentItemPrice[item.itemId])
        : item.quotedPurchasePrice,
      discountAmount: currentItemDiscount[item.itemId]
        ? Number(currentItemDiscount[item.itemId])
        : item.discountAmount,
      netPurchasePrice: getFinalPrice(item),
      netQty: getTotalStock(item),
      itemGST: currentSelectedItem[item.itemId]
        ? currentSelectedItem[item.itemId].itemGstPercentage
        : item.itemGST,
      gstAmount: (
        getFinalPrice(item) *
        (Number(
          currentSelectedItem[item.itemId]
            ? currentSelectedItem[item.itemId].itemGstPercentage
            : item.itemGST
        ) /
          100)
      ).toFixed(2),
      purchaseCategory: currentItemCategory[item.itemId]
        ? currentItemCategory[item.itemId]
        : item.purchaseCategory,

      restaurantId: props.product.restaurantId,
      storeId: props.product.storeId,
      supplierId: props.product.supplierId,
      purchaseDate: props.product.purchaseDate,
      billNumber: props.product.billNumber,
      purchaseOrderStatus: "CLOSED",
      createdBy: props.product.createdBy,
      createdDate: props.product.createdDate,
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    console.log(newObj);

    dispatch(saveUpdatePurchaseOrder(newObj, true)).then((res) => {
      if (res) {
        onSaveClickHandle(item.itemId);
      }
    });
  };

  return (
    <div>
      <TableContainer className="mt-3" component={Paper}>
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
              <CusTableCell1 align="center">FINAL PURCHASE PRICE</CusTableCell1>
              <CusTableCell1 align="center">TOTAL STOCK</CusTableCell1>
              <CusTableCell1 align="center">GST%</CusTableCell1>
              <CusTableCell1 align="center">GST AMT.</CusTableCell1>
              <CusTableCell1 align="center">CATEGORY</CusTableCell1>
              <CusTableCell1 align="center">REMARKS</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeInventoryLoading || purchaseOrderCategoryLoading ? (
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
                {props.product &&
                  props.product.items.length > 0 &&
                  props.product.items.map((item, index) => (
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
                          defaultValue={currentSelectedItem[item.itemId]}
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
                            ? currentSelectedItem[item.itemId].itemUOM
                            : item.itemUOM}
                        </Typography>
                      </CusTableCell>
                      <CusTableCell align="center">
                        <CusTextField
                          defaultValue={item.purchaseQty}
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

                      <CusTableCell align="center">
                        <CusTextField
                          defaultValue={item.wastageQty}
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

                      <CusTableCell align="center">
                        <CusTextField
                          defaultValue={item.quotedPurchasePrice}
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

                      <CusTableCell align="center">
                        <CusTextField
                          defaultValue={item.discountAmount}
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

                      <CusTableCell align="center">
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {getFinalPrice(item)}
                        </Typography>
                      </CusTableCell>

                      <CusTableCell align="center">
                        {/* <CusTextField
                          defaultValue={item.netQty}
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
                        /> */}
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {getTotalStock(item)}
                        </Typography>
                      </CusTableCell>

                      <CusTableCell align="center">
                        <Typography sx={{ fontSize: "0.75rem" }}>
                          {currentSelectedItem[item.itemId]
                            ? currentSelectedItem[item.itemId].itemGstPercentage
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

                      <FormControl fullWidth sx={{ marginTop: "7px" }}>
                        <NativeSelect
                          defaultValue={item.purchaseCategory}
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
                          <option value={""} style={{ fontSize: "0.75rem" }}>
                            Select Category
                          </option>
                        </NativeSelect>
                      </FormControl>

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
                            /* deleteItemFromList(item.itemId); */
                          }}
                        >
                          <DeleteIcon
                            sx={{ height: "0.95rem", width: "0.95rem" }}
                          ></DeleteIcon>
                        </IconButton>
                      </CusTableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
