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
  saveOffer,
  deleteInventoryItem,
  getOffersByStatus,
  getConfigOffersFunction,
  getConfigOffersCriteria,
  getConfigOffersAppFlag,
  getAllSections,
  getProductsNew,
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
  padding: 0 5px 0 5px;
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

export const Offers = () => {
  const allOffers = useSelector((state) => state.product.offersByStatus);
  const sections = useSelector((state) => state.product.sections);
  const products = useSelector((state) => state.product.products);
  const offersAppFlagConfig = useSelector(
    (state) => state.product.offersAppFlagConfig
  );
  const offersCriteriaConfig = useSelector(
    (state) => state.product.offersCriteriaConfig
  );
  const offersFunctionConfig = useSelector(
    (state) => state.product.offersFunctionConfig
  );
  const allOffersLoading = useSelector(
    (state) => state.product.allOffersLoading
  );
  const user = useSelector((state) => state.auth.user);

  const [isSave, setIsSave] = useState({});
  const [isAddNew, setIsAddNew] = useState(false);
  const [currentOfferFunctionType, setCurrentOfferFunctionType] = useState("");
  const [offerSection, setOfferSection] = useState("");
  const [offerDish, setOfferDish] = useState("");
  const [currentOfferCode, setCurrentOfferCode] = useState({});
  const [currentOfferDescription, setCurrentOfferDescription] = useState({});
  const [currentOfferProductList, setCurrentOfferProductList] = useState({});
  const [currentOfferPrice, setCurrentOfferPrice] = useState({});
  const [currentOfferDiscount, setCurrentOfferDiscount] = useState({});
  const [offerApplicability, setOfferApplicability] = useState("");
  const [offerCriteria, setOfferCriteria] = useState("");
  const [daySunday, setDaySunday] = useState("");
  const [dayMonday, setDayMonday] = useState("");
  const [dayTuesday, setDayTuesday] = useState("");
  const [dayWednesday, setDayWednesday] = useState("");
  const [dayThursday, setDayThursday] = useState("");
  const [dayFriday, setDayFriday] = useState("");
  const [daySaturday, setDaySaturday] = useState("");

  const [newOfferFunctionType, setNewOfferFunctionType] = useState("");
  const [newOfferCode, setNewOfferCode] = useState("");
  const [newOfferDescription, setNewOfferDescription] = useState("");
  const [newOfferCriteria, setNewOfferCriteria] = useState("");
  const [newOfferSection, setNewOfferSection] = useState("");
  const [newOfferProductList, setNewOfferProductList] = useState("");
  const [newOfferPrice, setNewOfferPrice] = useState("");
  const [newOfferDiscount, setNewOfferDiscount] = useState("");
  const [newOfferApplicability, setNewOfferApplicability] = useState("O");
  const [newDaySunday, setNewDaySunday] = useState("Y");
  const [newDaySaturday, setNewDaySaturday] = useState("Y");
  const [newDayMonday, setNewDayMonday] = useState("Y");
  const [newDayTuesday, setNewDayTuesday] = useState("Y");
  const [newDayWednesday, setNewDayWednesday] = useState("Y");
  const [newDayFriday, setNewDayFriday] = useState("Y");
  const [newDayThursday, setNewDayThursday] = useState("Y");
  const [newOfferDish, setNewOfferDish] = useState("");
  const [pagination, setPagination] = useState({
    data: allOffers,
    offset: 0,
    numberPerPage: 20,
    pageCount: 0,
    currentData: allOffers.slice(0, 20),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffersByStatus("ACTIVE"));
    dispatch(getConfigOffersFunction());
    dispatch(getConfigOffersCriteria());
    dispatch(getConfigOffersAppFlag());
    dispatch(getAllSections(user.restaurantId, user.storeId));
    dispatch(getProductsNew(user.restaurantId, user.storeId));
  }, []);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: allOffers.length / prevState.numberPerPage,
      currentData: allOffers.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, allOffers]);

  /* useEffect(() => {
        if(keywords && activeInventory && activeInventory.length > 0){
            setSearchedAllActiveInventory(activeInventory.filter(function (el) {
              return el.itemName.toLowerCase().includes(keywords.toLowerCase());
            }))
        }else{
          setSearchedAllActiveInventory(activeInventory)
        }
      }, [keywords, activeInventory]); */

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
    const newOffer = {
      ...oldItem,
      offerFunctionType: currentOfferFunctionType
        ? currentOfferFunctionType
        : oldItem.offerFunctionType,
      offerCode: currentOfferCode[oldItem.offerId]
        ? currentOfferCode[oldItem.offerId]
        : oldItem.offerCode,
      offerDescription: currentOfferDescription[oldItem.offerId]
        ? currentOfferDescription[oldItem.offerId]
        : oldItem.offerDescription,
      daySunday: daySunday ? daySunday : oldItem.daySunday,
      dayMonday: dayMonday ? dayMonday : oldItem.dayMonday,
      dayTuesday: dayTuesday ? dayTuesday : oldItem.dayTuesday,
      dayWednesday: dayWednesday ? dayWednesday : oldItem.dayWednesday,
      dayThursday: dayThursday ? dayThursday : oldItem.dayThursday,
      dayFriday: dayFriday ? dayFriday : oldItem.dayFriday,
      daySaturday: daySaturday ? daySaturday : oldItem.daySaturday,
      offerApplicability: offerApplicability
        ? offerApplicability
        : oldItem.offerApplicability,
      offerPrice: currentOfferPrice[oldItem.offerId]
        ? currentOfferPrice[oldItem.offerId]
        : oldItem.offerPrice,
      offerCriteria: offerCriteria ? offerCriteria : oldItem.offerCriteria,
      offerSection: offerSection ? offerSection : oldItem.offerSection,
      offerDish: offerDish ? offerDish : oldItem.offerDish,
      offerProductList: currentOfferProductList[oldItem.offerId]
        ? currentOfferProductList[oldItem.offerId]
        : oldItem.offerProductList,
      offerDiscount: currentOfferDiscount[oldItem.offerId]
        ? currentOfferDiscount[oldItem.offerId]
        : oldItem.offerDiscount,
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    dispatch(saveOffer(newOffer)).then((res) => {
      if (res) {
        onSaveClickHandle(oldItem.offerId);
        clearStates();
      }
    });
  };

  const saveNewItem = () => {
    if (!newOfferCode) {
      toast.error("Offer code is mandatory!");
      return;
    }

    const newItem = {
      restaurantId: user.restaurantId,
      storeId: user.storeId,
      offerFunctionType: newOfferFunctionType,
      offerCode: newOfferCode,
      offerDescription: newOfferDescription,
      daySunday: newDaySunday,
      dayMonday: newDayMonday,
      dayTuesday: newDayTuesday,
      dayWednesday: newDayWednesday,
      dayThursday: newDayThursday,
      dayFriday: newDayFriday,
      daySaturday: newDaySaturday,
      offerApplicability: newOfferApplicability,
      offerPrice: newOfferPrice,
      offerStatus: "ACTIVE",
      offerCriteria: newOfferCriteria,
      offerSection: newOfferSection,
      offerDish: newOfferDish,
      offerProductList: newOfferProductList,
      offerDiscount: newOfferDiscount,
      createdBy: user.loginId,
      createdDate: new Date(),
      updatedBy: user.loginId,
      updatedDate: new Date(),
    };

    console.log(newItem);

    dispatch(saveOffer(newItem)).then((res) => {
      if (res) {
        clearStates();
        setIsAddNew(false);
      }
    });
  };

  const softDeleteItem = (oldItem) => {
    const deleteItem = {
      ...oldItem,
      offerStatus: "IN-ACTIVE",
    };
    dispatch(saveOffer(deleteItem, true));
  };

  const clearStates = () => {
    setCurrentOfferFunctionType("");
    setOfferCriteria("");
    setOfferSection("");
    setOfferDish("");
    setCurrentOfferCode({});
    setCurrentOfferDescription({});
    setCurrentOfferProductList({});
    setCurrentOfferPrice({});
    setCurrentOfferDiscount({});
    setOfferApplicability("");
    setDaySunday("");
    setDayMonday("");
    setDayTuesday("");
    setDayWednesday("");
    setDayThursday("");
    setDayFriday("");
    setDaySaturday("");

    setNewOfferFunctionType("");
    setNewOfferCode("");
    setNewOfferDescription("");
    setNewOfferCriteria("");
    setNewOfferSection("");
    setNewOfferProductList("");
    setNewOfferPrice("");
    setNewOfferDiscount("");
    setNewOfferApplicability("");
    setNewDaySunday("");
    setNewDaySaturday("");
    setNewDayMonday("");
    setNewDayTuesday("");
    setNewDayWednesday("");
    setNewOfferDish("");
    setNewDayThursday("");
  };

  const columns = [
    { id: "1", label: "#", minWidth: 30, align: "center" },
    { id: "2", label: "FUNCTION", minWidth: 30, align: "center" },
    { id: "22", label: "OFFER CODE", minWidth: 30, align: "center" },
    {
      id: "3",
      label: "ORDER DETAILS (REMARKS)",
      minWidth: 300,
      align: "center",
    },
    { id: "4", label: "CRITERIA", minWidth: 100, align: "center" },
    { id: "5", label: "SECTION", minWidth: 80, align: "center" },
    { id: "6", label: "DISH", minWidth: 120, align: "center" },
    { id: "7", label: "PRODUCT ID", minWidth: 350, align: "center" },
    { id: "8", label: "ACTION", minWidth: 80, align: "center" },
    { id: "9", label: "PRICE", minWidth: 50, align: "center" },
    { id: "10", label: "DISCOUNT", minWidth: 50, align: "center" },
    { id: "11", label: "ONLINE", minWidth: 60, align: "center" },
    { id: "12", label: "S", minWidth: 60, align: "center" },
    { id: "13", label: "M", minWidth: 60, align: "center" },
    { id: "14", label: "T", minWidth: 60, align: "center" },
    { id: "15", label: "W", minWidth: 60, align: "center" },
    { id: "16", label: "T", minWidth: 60, align: "center" },
    { id: "17", label: "F", minWidth: 60, align: "center" },
    { id: "18", label: "S", minWidth: 60, align: "center" },
    { id: "19", label: "ACTION", minWidth: 50, align: "center" },
  ];

  return (
    <div>
      {/* <Row>
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
      </Row> */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 480, maxWidth: "91vw" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <CusTableCell1
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    lineHeight: "1.4rem",
                    backgroundColor:
                      column.label === "CRITERIA" ||
                      column.label === "SECTION" ||
                      column.label === "DISH" ||
                      column.label === "PRODUCT ID" ||
                      column.label === "ACTION"
                        ? "green"
                        : "#35455e",
                    border:
                      column.label === "CRITERIA" ||
                      column.label === "SECTION" ||
                      column.label === "DISH" ||
                      column.label === "PRODUCT ID" ||
                      column.label === "ACTION"
                        ? "1px solid #35455e"
                        : "none",
                  }}
                >
                  {column.label}
                </CusTableCell1>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {allOffersLoading ? (
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
                {allOffers && allOffers.length > 0 ? (
                  <>
                    {allOffers
                      .slice(
                        pagination.offset,
                        pagination.offset + pagination.numberPerPage
                      )
                      .map((item, index) => (
                        <TableRow key={item.offerId}>
                          <CusTableCell align="center">
                            {index + 1 + pagination.offset}
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.offerFunctionType}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setCurrentOfferFunctionType(
                                    event.target.value
                                  );
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
                              >
                                {offersFunctionConfig.map((item) => (
                                  <option
                                    value={item.configCriteriaValue}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {item.configCriteriaValue}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              defaultValue={item.offerCode}
                              value={currentOfferCode[item.offerId]}
                              onChange={(event) => {
                                const names = {
                                  ...currentOfferCode,
                                  [item.offerId]: event.target.value,
                                };
                                setCurrentOfferCode(names);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.offerId]}
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <CusTextField
                              defaultValue={item.offerDescription}
                              value={currentOfferDescription[item.offerId]}
                              onChange={(event) => {
                                const names = {
                                  ...currentOfferDescription,
                                  [item.offerId]: event.target.value,
                                };
                                setCurrentOfferDescription(names);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.offerId]}
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.offerCriteria}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setOfferCriteria(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
                              >
                                {offersCriteriaConfig.map((item) => (
                                  <option
                                    value={item.configCriteriaValue}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {item.configCriteriaValue}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>
                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.offerSection}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setOfferSection(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
                              >
                                <option
                                  value={""}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Select Section
                                </option>
                                {sections.map((item) => (
                                  <option
                                    value={item}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {item}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>

                          <CusTableCell align="center" sx={{ width: "20px" }}>
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.offerDish}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setOfferDish(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
                              >
                                <option
                                  value={""}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Select Dish
                                </option>
                                {products.map((item) => (
                                  <option
                                    value={item.productId}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {item.dishType}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>

                          <CusTableCell align="center" sx={{ width: "20px" }}>
                            <CusTextField
                              key={item.offerId}
                              defaultValue={item.offerProductList}
                              value={currentOfferProductList[item.offerId]}
                              onChange={(event) => {
                                const unitCost = {
                                  ...currentOfferProductList,
                                  [item.offerId]: event.target.value,
                                };
                                setCurrentOfferProductList(unitCost);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.offerId]}
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <Button>Action</Button>
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.offerId}
                              defaultValue={item.offerPrice}
                              value={currentOfferPrice[item.offerId]}
                              onChange={(event) => {
                                const unitCost = {
                                  ...currentOfferPrice,
                                  [item.offerId]: event.target.value,
                                };
                                setCurrentOfferPrice(unitCost);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.offerId]}
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <CusTextField
                              key={item.offerId}
                              defaultValue={item.offerDiscount}
                              value={currentOfferDiscount[item.offerId]}
                              onChange={(event) => {
                                const unitCost = {
                                  ...currentOfferDiscount,
                                  [item.offerId]: event.target.value,
                                };
                                setCurrentOfferDiscount(unitCost);
                              }}
                              fullWidth
                              variant="standard"
                              disabled={!isSave[item.offerId]}
                              InputProps={{
                                disableUnderline: true,
                              }}
                            />
                          </CusTableCell>

                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.offerApplicability}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setOfferApplicability(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
                              >
                                {offersAppFlagConfig.map((item) => (
                                  <option
                                    value={item.configCriteriaValue}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {item.configCriteriaValue}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </CusTableCell>

                          <CusTableCell align="center">
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.daySunday}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setDaySunday(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
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
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.dayMonday}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setDayMonday(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
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
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.dayTuesday}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setDayTuesday(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
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
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.dayWednesday}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setDayWednesday(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
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
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.dayThursday}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setDayThursday(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
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
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.dayFriday}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setDayFriday(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
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
                            <FormControl fullWidth sx={{ marginTop: "5px" }}>
                              <NativeSelect
                                disableUnderline
                                key={item.offerId}
                                defaultValue={item.daySaturday}
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={(event) => {
                                  setDaySaturday(event.target.value);
                                }}
                                sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                                disabled={!isSave[item.offerId]}
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
                            {isSave[item.offerId] ? (
                              <IconButton
                                key={item.offerId}
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "#92D050",
                                }}
                                onClick={() => {
                                  updateItemHandle(item);
                                  onSaveClickHandle(item.offerId);
                                }}
                              >
                                <SaveIcon
                                  sx={{ height: "0.95rem", width: "0.95rem" }}
                                ></SaveIcon>
                              </IconButton>
                            ) : (
                              <IconButton
                                key={item.offerId}
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "#FFC000",
                                }}
                                onClick={() => {
                                  onEditClickHandle(item.offerId);
                                }}
                              >
                                <EditIcon
                                  sx={{ height: "0.95rem", width: "0.95rem" }}
                                ></EditIcon>
                              </IconButton>
                            )}

                            <IconButton
                              key={item.offerId}
                              sx={{
                                fontSize: "0.75rem",
                                color: "red",
                              }}
                              onClick={() => {
                                softDeleteItem(item);
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
                      <TableRow key={"newoffer"}>
                        <CusTableCell align="center">
                          {allOffers.length + 1}
                        </CusTableCell>
                        <CusTableCell align="center">
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewOfferFunctionType(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                            >
                              {offersFunctionConfig.map((item) => (
                                <option
                                  value={item.configCriteriaValue}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {item.configCriteriaValue}
                                </option>
                              ))}
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newOfferCode}
                            onChange={(event) => {
                              setNewOfferCode(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </CusTableCell>
                        <CusTableCell align="center">
                          <CusTextField
                            value={newOfferDescription}
                            onChange={(event) => {
                              setNewOfferDescription(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </CusTableCell>
                        <CusTableCell align="center">
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewOfferCriteria(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                            >
                              {offersCriteriaConfig.map((item) => (
                                <option
                                  value={item.configCriteriaValue}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {item.configCriteriaValue}
                                </option>
                              ))}
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>
                        <CusTableCell align="center">
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewOfferSection(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                            >
                              <option
                                value={""}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Select Section
                              </option>
                              {sections.map((item) => (
                                <option
                                  value={item}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {item}
                                </option>
                              ))}
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ width: "20px" }}>
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewOfferDish(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                            >
                              <option
                                value={""}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Select Dish
                              </option>
                              {products.map((item) => (
                                <option
                                  value={item.productId}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {item.dishType}
                                </option>
                              ))}
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>

                        <CusTableCell align="center" sx={{ width: "20px" }}>
                          <CusTextField
                            value={newOfferProductList}
                            onChange={(event) => {
                              setNewOfferProductList(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <Button>Action</Button>
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newOfferPrice}
                            onChange={(event) => {
                              setNewOfferPrice(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <CusTextField
                            value={newOfferDiscount}
                            onChange={(event) => {
                              setNewOfferDiscount(event.target.value);
                            }}
                            fullWidth
                            variant="standard"
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </CusTableCell>

                        <CusTableCell align="center">
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewOfferApplicability(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
                            >
                              {offersAppFlagConfig.map((item) => (
                                <option
                                  value={item.configCriteriaValue}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {item.configCriteriaValue}
                                </option>
                              ))}
                            </NativeSelect>
                          </FormControl>
                        </CusTableCell>

                        <CusTableCell align="center">
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewDaySunday(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
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
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewDayMonday(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
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
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewDayTuesday(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
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
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewDayWednesday(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
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
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewDayThursday(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
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
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewDayFriday(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
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
                          <FormControl fullWidth sx={{ marginTop: "5px" }}>
                            <NativeSelect
                              disableUnderline
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={(event) => {
                                setNewDaySaturday(event.target.value);
                              }}
                              sx={{ fontSize: "0.75rem", paddingLeft: "5px" }}
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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
    </div>
  );
};
