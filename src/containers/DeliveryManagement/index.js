import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerOrders,
  getUsersByRole,
  updateOrderDeliBoy,
} from "../../actions";
import Layout from "../NewLayout";
import { Row, Col, Modal } from "react-bootstrap";
import styled from "@emotion/styled";
import Pdf from "react-to-pdf";
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
  TextField,
  Typography,
  NativeSelect,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { OrderDetailsTable } from "../../components/OrderDetailsTable";
import "./style.css";

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
`;

const CusTableCell3 = styled(TableCell)`
  font-size: 0.75rem;
  max-width: 120px;
  word-wrap: break-word;
`;

const CusMenuItem = styled(MenuItem)``;

export const DeliveryManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const businessDateAll = useSelector((state) => state.user.businessDate);
  //const orders = useSelector((state) => state.order.orders);
  const stores = useSelector((state) => state.store.stores);
  const usersByRole = useSelector((state) => state.user.usersByRole);
  const loading = useSelector((state) => state.order.loading);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [storeOrders, setStoreOrders] = useState([]);
  const [phoneOrders, setPhoneOrders] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [selectedDeliBoy, setSelectedDeliBoy] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [height, setHeight] = useState(0);
  const [selectedStore, setSelectedStore] = useState(
    user.roleCategory === "SUPER_ADMIN" ? "ALL" : user.restaurantId
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId:
      user.roleCategory === "SUPER_ADMIN" ? null : user.restaurantId,
    storeId: user.roleCategory === "SUPER_ADMIN" ? null : user.storeId,
  });

  const options = {
    unit: "px",
    format: [265, height],
  };

  const ref = React.createRef();
  const refH = React.useRef(null);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const today = businessDateAll
      ? new Date(businessDateAll.businessDate)
      : new Date();
    dispatch(
      getCustomerOrders(
        selectedStoreObj.restaurantId,
        selectedStoreObj.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        null,
        null,
        "WEB DELIVERY"
      )
    ).then((res) => {
      if (res) {
        setDeliveryOrders(res);
      }
    });

    dispatch(
      getCustomerOrders(
        selectedStoreObj.restaurantId,
        selectedStoreObj.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        null,
        null,
        "STORE DELIVERY"
      )
    ).then((res) => {
      if (res) {
        setStoreOrders(res);
      }
    });

    dispatch(
      getCustomerOrders(
        selectedStoreObj.restaurantId,
        selectedStoreObj.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        null,
        null,
        "PHONE DELIVERY"
      )
    ).then((res) => {
      if (res) {
        setPhoneOrders(res);
      }
    });

    dispatch(getUsersByRole("DELIVERY_BOY"));
  }, [isReset, selectedStoreObj]);

  const handleCloseDetailsModal = () => setShowDetailsModal(false);
  const handleShowDetailsModal = () => setShowDetailsModal(true);

  const handleChangeKeywords = (event) => {
    setKeywords(event.target.value);
  };

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const searchOrder = () => {
    const today = businessDateAll
      ? new Date(businessDateAll.businessDate)
      : new Date();
    dispatch(
      getCustomerOrders(
        user.restaurantId,
        user.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        keywords,
        null,
        "WEB DELIVERY"
      )
    ).then((res) => {
      if (res) {
        setDeliveryOrders(res);
      }
    });

    dispatch(
      getCustomerOrders(
        user.restaurantId,
        user.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        keywords,
        null,
        "STORE DELIVERY"
      )
    ).then((res) => {
      if (res) {
        setStoreOrders(res);
      }
    });

    dispatch(
      getCustomerOrders(
        user.restaurantId,
        user.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        keywords,
        null,
        "PHONE DELIVERY"
      )
    ).then((res) => {
      if (res) {
        setPhoneOrders(res);
      }
    });
  };

  const resetSearch = () => {
    setKeywords("");
    if (isReset) {
      setIsReset(false);
    } else {
      setIsReset(true);
    }
    toast.success("Reset Orders!");
  };

  const handleDeliveryBoyUpdate = (event) => {
    setSelectedDeliBoy(event.target.value);
    console.log(event.target.value);
  };

  const onClickSelectDeliBoy = (id) => {
    if (selectedDeliBoy) {
      dispatch(updateOrderDeliBoy(id, selectedDeliBoy, user.loginId));
    } else {
      toast.error("Please select a new delivery boy!");
    }
  };

  const renderNowDate = (date) => {
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

  const renderNowTime = (date) => {
    const dateObj = new Date(date);
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  const renderStoreAddress = (restaurantId, storeId) => {
    const foundMatch = stores.find(
      (x) => x.restaurantId === restaurantId && x.storeId === storeId
    );

    if (foundMatch) {
      return (
        <section>
          <Typography>
            <span>{foundMatch.address1},</span> <br></br>
            {foundMatch.address2 ? <span>{foundMatch.address2},</span> : null}
            {foundMatch.address3 ? <span>{foundMatch.address3},</span> : null}
            <span>{foundMatch.city},</span>
            {foundMatch.zipCode ? <span>{foundMatch.zipCode},</span> : null}
          </Typography>

          {/* <Typography>{foundMatch.country}</Typography> */}
        </section>
      );
    }
  };

  const renderStoreGST = (restaurantId, storeId) => {
    const foundMatch = stores.find(
      (x) => x.restaurantId === restaurantId && x.storeId === storeId
    );

    if (foundMatch) {
      return <>GST NO: {foundMatch.storeGstNumber}</>;
    }
  };

  const handleManualPrint = () => {
    const div = document.getElementById("billNew").innerHTML;
    var windows = window.open("", "", "height=600, width=600");
    windows.document.write("<html><body >");
    windows.document.write(
      "<style> body{text-align: center; margin: 0; line-height: 0; font-size: 10px;} th{font-size: 11px;} td{font-size: 11px;} table{width: 100%} tbody{text-align: left;} th{text-align: left !important;} section{ line-height: 0.9 !important;}  @media print { body {  }} @page { size: Statement;margin: 0;}</style>"
    );
    windows.document.write(div);
    windows.document.write("</body></html>");
    windows.document.close();
    windows.print();

    //window.print();
  };

  const renderDetailsModal = () => {
    return (
      <Modal
        show={showDetailsModal}
        onHide={handleCloseDetailsModal}
        close
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {currentOrder ? (
            <div ref={ref}>
              <div style={{ display: "none" }}>
                <div id="billNew">
                  <div className="text-center">
                    <Typography sx={{ fontWeight: "600" }}>
                      {currentOrder ? currentOrder.restaurantName : "Hangries"}
                    </Typography>
                    <Typography sx={{ color: "black" }}>
                      {renderStoreAddress(
                        currentOrder.restaurantId,
                        currentOrder.storeId
                      )}
                    </Typography>
                    <hr></hr>
                    <Typography sx={{ fontWeight: "600" }}>
                      {renderStoreGST(
                        currentOrder.restaurantId,
                        currentOrder.storeId
                      )}
                    </Typography>

                    <Typography sx={{ fontWeight: "600" }}>
                      Order ID: {currentOrder ? currentOrder.orderId : null}
                    </Typography>
                    <hr></hr>

                    <div style={{ display: "inline-flex", columnGap: "10px" }}>
                      <Typography sx={{ fontWeight: "600" }}>
                        Cashier: {currentOrder.createdBy.toUpperCase()}
                      </Typography>
                      <Typography sx={{ fontWeight: "600" }}>
                        Table No:{" "}
                        {currentOrder && currentOrder.storeTableId
                          ? currentOrder.storeTableId
                          : "N/A"}
                      </Typography>
                      <Typography sx={{ fontWeight: "600" }}>
                        <span>{currentOrder.orderDeliveryType}</span>
                        <span> [{currentOrder.paymentStatus}]</span>
                      </Typography>
                    </div>
                  </div>
                  <div style={{ display: "inline-flex", columnGap: "10px" }}>
                    <Typography>
                      Date: {renderNowDate(currentOrder.createdDate)}
                    </Typography>
                    <Typography>
                      Time: {renderNowTime(currentOrder.createdDate)}
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <Typography>
                      Name: {currentOrder.customerName.toUpperCase()}
                    </Typography>
                    {/* <Typography>Address: {currentOrder.address}</Typography> */}
                    <Typography>Mob No: {currentOrder.mobileNumber}</Typography>
                    <Typography sx={{ color: "black" }}>
                      Address: {currentOrder.address}
                    </Typography>
                  </div>
                  <hr></hr>

                  <OrderDetailsTable
                    fullResp={currentOrder}
                    isBill={true}
                  ></OrderDetailsTable>
                </div>
              </div>
              <div ref={refH}>
                <div className="text-center">
                  <Typography sx={{ fontWeight: "600" }}>
                    {currentOrder ? currentOrder.restaurantName : "Hangries"}
                  </Typography>
                  <Typography sx={{ color: "black" }}>
                    {renderStoreAddress(
                      currentOrder.restaurantId,
                      currentOrder.storeId
                    )}
                  </Typography>

                  <Typography sx={{ fontWeight: "600" }}>
                    {renderStoreGST(
                      currentOrder.restaurantId,
                      currentOrder.storeId
                    )}
                  </Typography>

                  <Typography sx={{ fontWeight: "600" }}>
                    Order ID: {currentOrder ? currentOrder.orderId : null}
                  </Typography>

                  <Typography sx={{ fontWeight: "600" }}>
                    Table No:{" "}
                    {currentOrder && currentOrder.storeTableId
                      ? currentOrder.storeTableId
                      : "N/A"}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    Cashier: {currentOrder.createdBy.toUpperCase()}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    <span>{currentOrder.orderDeliveryType}</span>
                    <span> [{currentOrder.paymentStatus}]</span>
                  </Typography>
                </div>
                <hr></hr>
                <div>
                  <Typography>
                    Name: {currentOrder.customerName.toUpperCase()}
                  </Typography>
                  {/* <Typography>Address: {currentOrder.address}</Typography> */}
                  <Typography>Mob No: {currentOrder.mobileNumber}</Typography>
                  <Typography sx={{ color: "black" }}>
                    Address: {currentOrder.address}
                  </Typography>
                </div>
                <hr></hr>
                <div>
                  <Typography>
                    <Row>
                      <Col>Time: {renderNowTime(currentOrder.createdDate)}</Col>
                      <Col>Date: {renderNowDate(currentOrder.createdDate)}</Col>
                    </Row>
                  </Typography>
                </div>
                <hr></hr>
                <OrderDetailsTable fullResp={currentOrder}></OrderDetailsTable>
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Col className="col-6">
              <Button
                color="secondary"
                onClick={handleManualPrint}
                className="w-100"
                variant="contained"
              >
                Print
              </Button>
            </Col>
            <Col className="col-6">
              <Pdf
                targetRef={ref}
                filename="invoice.pdf"
                options={options}
                x={0.8}
              >
                {({ toPdf }) => (
                  <Button
                    color="primary"
                    onClick={toPdf}
                    className="w-100"
                    variant="contained"
                  >
                    Download Invoice
                  </Button>
                )}
              </Pdf>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Layout sidebar headerTitle="Delivery Mgmt">
      <Row>
        <Col sm={6}>
          <div className="mb-3">
            <TextField
              label="Search Order By ID"
              variant="standard"
              value={keywords}
              onChange={handleChangeKeywords}
              className="mr-3"
            />
            <Button
              variant="contained"
              color="success"
              disabled={!keywords}
              onClick={searchOrder}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={resetSearch}
              className="ml-3"
            >
              Reset
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          {user.roleCategory === "SUPER_ADMIN" ? (
            <>
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
                  <CusMenuItem
                    onClick={() => {
                      handleSelectedStore({
                        restaurantId: null,
                        storeId: null,
                      });
                    }}
                    value={"ALL"}
                  >
                    All Stores
                  </CusMenuItem>
                  {stores.map((store) => (
                    <CusMenuItem
                      onClick={() => {
                        handleSelectedStore(store);
                      }}
                      value={store.resturantName}
                    >
                      <span>{store.resturantName}</span>
                    </CusMenuItem>
                  ))}
                </CusSelect>
              </FormControl>
            </>
          ) : (
            <>
              <Typography sx={{ color: "#595959", fontWeight: "bold" }}>
                Role: {user.roleCategory}
              </Typography>
              <Typography sx={{ color: "#595959", fontWeight: "bold" }}>
                Store Name: {user.resturantName}
              </Typography>
            </>
          )}
        </Col>
      </Row>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">ORDER NO</CusTableCell1>
              <CusTableCell1 align="center">ORDER DATE</CusTableCell1>
              <CusTableCell1 align="center">SOURCE</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER PHONE NO</CusTableCell1>
              <CusTableCell1 align="center">PYMT.</CusTableCell1>
              <CusTableCell1 align="center">PYMT. MODE</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER NAME</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER ADDRESS</CusTableCell1>
              <CusTableCell1 align="center">AMOUNT</CusTableCell1>
              {/* <CusTableCell1 align="center">ITEM ORDERED</CusTableCell1> */}
              <CusTableCell1 align="center">CURRENT STATUS</CusTableCell1>
              <CusTableCell1 align="center">
                ASSIGN DELIVERY BOY TO ORDER
              </CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {(deliveryOrders && deliveryOrders.length > 0) ||
            storeOrders.length > 0 ||
            phoneOrders.length > 0 ? (
              <>
                {deliveryOrders.map((row) => (
                  <TableRow
                    key={row.orderId}
                    className={row.orderStatus === "DELIVERED" ? "gr" : ""}
                  >
                    <CusTableCell3
                      align="center"
                      onClick={() => {
                        setCurrentOrder(row);
                        handleShowDetailsModal();
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {row.orderId.substr(0, row.orderId.length - 3)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.substr(row.orderId.length - 3)}
                      </span>
                    </CusTableCell3>
                    <CusTableCell2 align="center">
                      {new Date(row.createdDate).getFullYear()}-
                      {new Date(row.createdDate).getMonth() + 1}-
                      {new Date(row.createdDate).getDate()}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderSource}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.mobileNumber}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentMode}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.customerName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.address}</CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.overallPriceWithTax}
                    </CusTableCell2>
                    {/* <CusTableCell2 align="center"         >
                      <Button
                        sx={{ fontSize: "0.75rem" }}
                        fullWidth
                        onClick={() => {
                          setCurrentOrder(row);
                          handleShowDetailsModal();
                        }}
                      >
                        View details
                      </Button>
                    </CusTableCell2> */}
                    <CusTableCell2 align="center">
                      {row.orderStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderStatus === "DELIVERED" ? (
                        <span>{row.deliveryUserId}</span>
                      ) : (
                        <Row>
                          <Col className="m-0 p-0 col-12">
                            <FormControl fullWidth>
                              {/* <InputLabel
                              id="demo-simple-select-label"
                              sx={{ fontSize: "0.75rem" }}
                            >
                              Delivery Boy
                            </InputLabel> */}
                              <NativeSelect
                                defaultValue={
                                  row.deliveryUserId ? row.deliveryUserId : ""
                                }
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleDeliveryBoyUpdate}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                <option
                                  value=""
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Select Delivery Boy
                                </option>
                                {usersByRole.map((user) => (
                                  <option
                                    key={user.userSeqNo}
                                    value={user.firstName}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {user.firstName}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </Col>
                          <Col className="m-0 p-0 col-12">
                            <Button
                              variant="contained"
                              color={row.deliveryUserId ? "primary" : "success"}
                              fullWidth
                              className="mt-2"
                              sx={{ fontSize: "0.75rem" }}
                              onClick={() => {
                                onClickSelectDeliBoy(row.orderId);
                              }}
                            >
                              Confirm
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </CusTableCell2>
                  </TableRow>
                ))}

                {storeOrders.map((row) => (
                  <TableRow
                    key={row.orderId}
                    className={row.orderStatus === "DELIVERED" ? "gr" : ""}
                  >
                    <CusTableCell3
                      align="center"
                      onClick={() => {
                        setCurrentOrder(row);
                        handleShowDetailsModal();
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {row.orderId.substr(0, row.orderId.length - 3)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.substr(row.orderId.length - 3)}
                      </span>
                    </CusTableCell3>
                    <CusTableCell2 align="center">
                      {new Date(row.createdDate).getFullYear()}-
                      {new Date(row.createdDate).getMonth() + 1}-
                      {new Date(row.createdDate).getDate()}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderSource}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.mobileNumber}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentMode}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.customerName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.address}</CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.overallPriceWithTax}
                    </CusTableCell2>
                    {/* <CusTableCell2 align="center"         >
                      <Button
                        sx={{ fontSize: "0.75rem" }}
                        fullWidth
                        onClick={() => {
                          setCurrentOrder(row);
                          handleShowDetailsModal();
                        }}
                      >
                        View details
                      </Button>
                    </CusTableCell2> */}
                    <CusTableCell2 align="center">
                      {row.orderStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderStatus === "DELIVERED" ? (
                        <span>{row.deliveryUserId}</span>
                      ) : (
                        <Row>
                          <Col className="m-0 p-0 col-12">
                            <FormControl fullWidth>
                              {/* <InputLabel
                              id="demo-simple-select-label"
                              sx={{ fontSize: "0.75rem" }}
                            >
                              Delivery Boy
                            </InputLabel> */}
                              <NativeSelect
                                defaultValue={
                                  row.deliveryUserId ? row.deliveryUserId : ""
                                }
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleDeliveryBoyUpdate}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                <option
                                  value=""
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Select Delivery Boy
                                </option>
                                {usersByRole.map((user) => (
                                  <option
                                    key={user.userSeqNo}
                                    value={user.firstName}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {user.firstName}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </Col>
                          <Col className="m-0 p-0 col-12">
                            <Button
                              variant="contained"
                              color={row.deliveryUserId ? "primary" : "success"}
                              fullWidth
                              className="mt-2"
                              sx={{ fontSize: "0.75rem" }}
                              onClick={() => {
                                onClickSelectDeliBoy(row.orderId);
                              }}
                            >
                              Confirm
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </CusTableCell2>
                  </TableRow>
                ))}

                {phoneOrders.map((row) => (
                  <TableRow
                    key={row.orderId}
                    className={row.orderStatus === "DELIVERED" ? "gr" : ""}
                  >
                    <CusTableCell3
                      align="center"
                      onClick={() => {
                        setCurrentOrder(row);
                        handleShowDetailsModal();
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {row.orderId.substr(0, row.orderId.length - 3)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.substr(row.orderId.length - 3)}
                      </span>
                    </CusTableCell3>
                    <CusTableCell2 align="center">
                      {new Date(row.createdDate).getFullYear()}-
                      {new Date(row.createdDate).getMonth() + 1}-
                      {new Date(row.createdDate).getDate()}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderSource}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.mobileNumber}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentMode}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.customerName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.address}</CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.overallPriceWithTax}
                    </CusTableCell2>
                    {/* <CusTableCell2 align="center"         >
                      <Button
                        sx={{ fontSize: "0.75rem" }}
                        fullWidth
                        onClick={() => {
                          setCurrentOrder(row);
                          handleShowDetailsModal();
                        }}
                      >
                        View details
                      </Button>
                    </CusTableCell2> */}
                    <CusTableCell2 align="center">
                      {row.orderStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderStatus === "DELIVERED" ? (
                        <span>{row.deliveryUserId}</span>
                      ) : (
                        <Row>
                          <Col className="m-0 p-0 col-12">
                            <FormControl fullWidth>
                              {/* <InputLabel
                              id="demo-simple-select-label"
                              sx={{ fontSize: "0.75rem" }}
                            >
                              Delivery Boy
                            </InputLabel> */}
                              <NativeSelect
                                defaultValue={
                                  row.deliveryUserId ? row.deliveryUserId : ""
                                }
                                inputProps={{
                                  name: "status",
                                  id: "uncontrolled-native",
                                }}
                                onChange={handleDeliveryBoyUpdate}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                <option
                                  value=""
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Select Delivery Boy
                                </option>
                                {usersByRole.map((user) => (
                                  <option
                                    key={user.userSeqNo}
                                    value={user.firstName}
                                    style={{ fontSize: "0.75rem" }}
                                  >
                                    {user.firstName}
                                  </option>
                                ))}
                              </NativeSelect>
                            </FormControl>
                          </Col>
                          <Col className="m-0 p-0 col-12">
                            <Button
                              variant="contained"
                              color={row.deliveryUserId ? "primary" : "success"}
                              fullWidth
                              className="mt-2"
                              sx={{ fontSize: "0.75rem" }}
                              onClick={() => {
                                onClickSelectDeliBoy(row.orderId);
                              }}
                            >
                              Confirm
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </CusTableCell2>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <CusTableCell2 scope="row" colspan="13">
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      ></div>
                    </div>
                  ) : (
                    <Alert severity="warning">No orders to show today!</Alert>
                  )}
                </CusTableCell2>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {renderDetailsModal()}
    </Layout>
  );
};
