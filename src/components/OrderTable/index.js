import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerOrders,
  updateOrder,
  updateOrderPaymentAndStatus,
} from "../../actions";
import styled from "@emotion/styled";
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
  FormControl,
  InputLabel,
  TextField,
  NativeSelect,
  Typography,
} from "@mui/material";
import { Row, Col, Modal } from "react-bootstrap";
import { OrderDetailsTable } from "../OrderDetailsTable";
import { toast } from "react-toastify";
import Pdf from "react-to-pdf";
import { OrderInvoice } from "../OrderInvoice";

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

const statuses = [
  "SUBMITTED",
  "ACCEPTED",
  "PROCESSING",
  "FOOD READY",
  "OUT FOR DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

/* const paymentModes = [
  { name: "CASH", code: "CASH" },
  { name: "PayTM", code: "PayTM" },
  { name: "Credit / Debit", code: "EDC" },
  { name: "Google Pay", code: "Gpay" },
  { name: "PhonePe", code: "PhonePe" },
  { name: "Amazon Pay", code: "AmznPay" },
  { name: "COD", code: "COD" },
]; */

export const OrderTable = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const paymentModes = useSelector((state) => state.user.paymentModes);
  const loading = useSelector((state) => state.order.loading);
  const [status, setStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [height, setHeight] = useState(0);

  const handleCloseDetailsModal = () => setShowDetailsModal(false);
  const handleShowDetailsModal = () => setShowDetailsModal(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date(businessDateAll && businessDateAll.businessDate);
    if (props.isForOrderSource) {
      dispatch(
        getCustomerOrders(
          null,
          null,
          null,
          `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
          null,
          null,
          null,
          null,
          null,
          props.type
        )
      );
    } else {
      dispatch(
        getCustomerOrders(
          null,
          null,
          props.type,
          `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        )
      );
    }
  }, [props.type, isReset]);

  const ref = React.createRef();
  const refH = useRef(null);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  const options = {
    unit: "px",
    format: [265, height],
  };

  const handleStatusUpdate = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
  };

  const handlePaymentModeUpdate = (event) => {
    setPaymentMode(event.target.value);
    console.log(event.target.value);
  };

  const onClickUpdateStatus = (id, order) => {
    if (status || paymentMode) {
      /* dispatch(updateOrder(id, status, props.type,user.loginId)).then((res) => {
        if (res) {
          handleIsReset();
        }
      }); */

      dispatch(
        updateOrderPaymentAndStatus(
          id,
          paymentMode ? paymentMode : order.paymentMode,
          "PAID",
          status ? status : order.orderStatus,
          props.type,
          user.loginId
        )
      ).then((res) => {
        if (res) {
          handleIsReset();
        }
      });

      setStatus("");
      setPaymentMode("");
    }
  };

  const handleChangeKeywords = (event) => {
    setKeywords(event.target.value);
  };

  const hidePrevStatus = (curStatus) => {
    if (curStatus === "DELIVERED") {
      return [];
    } else {
      const index = statuses.indexOf(curStatus);

      if (index) {
        const newArr = statuses.slice(index, statuses.length);
        return newArr;
      } else {
        return statuses;
      }
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
        <>
          <Typography>{foundMatch.address1},</Typography>
          {foundMatch.address2 ? (
            <>
              <Typography>{foundMatch.address2},</Typography>
            </>
          ) : null}
          {foundMatch.address3 ? (
            <Typography>{foundMatch.address3},</Typography>
          ) : null}
          <Typography>{foundMatch.city},</Typography>
          {foundMatch.zipCode ? (
            <Typography>{foundMatch.zipCode},</Typography>
          ) : null}
          <Typography>{foundMatch.country}</Typography>
        </>
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
      "<style> body{text-align: center; margin: 0; line-height: 0; font-size: 10px;} th{font-size: 10px;} td{font-size: 10px;} table{width: 100%} tbody{text-align: left;} th{text-align: left !important;} @media print { body {  }} @page { size: Statement;margin: 0;}</style>"
    );
    windows.document.write(div);
    windows.document.write("</body></html>");
    windows.document.close();
    windows.print();

    //window.print();
  };

  const renderDetailsModal = () => {
    return (
      <>
        {/* <OrderInvoice
          storeObj={props.storeObj}
          isShowDeliveryCharge={props.isShowDeliveryCharge}
          orderResp={currentOrder}
          firstName={currentOrder.customerName}
          phoneNo={currentOrder.mobileNumber}
          delCharge={currentOrder.deliveryCharges}
          showInvoice={showDetailsModal}
          title={"OrderDetails"}
          fullResp={currentOrder}
        ></OrderInvoice> */}
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
            <Modal.Title>OrderDetails</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentOrder ? (
              <>
                <div ref={ref}>
                  <div style={{ display: "none" }}>
                    <div id="billNew">
                      <div className="text-center">
                        <Typography sx={{ fontWeight: "600" }}>
                          {currentOrder
                            ? currentOrder.restaurantName
                            : "Hangries"}
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
                          Customer Name:{" "}
                          <span>
                            {currentOrder?.customerName.toUpperCase()}
                          </span>
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
                        <Typography>
                          Mob No: {currentOrder.mobileNumber}
                        </Typography>
                        <Typography>Address: {currentOrder.address}</Typography>
                      </div>
                      <hr></hr>
                      <div>
                        <Typography>
                          <Row>
                            <Col>
                              <Typography>
                                Time: {renderNowTime(currentOrder.createdDate)}
                              </Typography>
                            </Col>
                            <Col>
                              <Typography>
                                Date: {renderNowDate(currentOrder.createdDate)}
                              </Typography>
                            </Col>
                          </Row>
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
                        {currentOrder
                          ? currentOrder.restaurantName
                          : "Hangries"}
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
                        Customer Name:{" "}
                        <span>{currentOrder?.customerName.toUpperCase()}</span>
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
                      <Typography>
                        Mob No: {currentOrder.mobileNumber}
                      </Typography>
                      <Typography>Address: {currentOrder.address}</Typography>
                    </div>
                    <hr></hr>
                    <div>
                      <Typography>
                        <Row>
                          <Col>
                            Time: {renderNowTime(currentOrder.createdDate)}
                          </Col>
                          <Col>
                            Date: {renderNowDate(currentOrder.createdDate)}
                          </Col>
                        </Row>
                      </Typography>
                    </div>
                    <hr></hr>
                    <OrderDetailsTable
                      fullResp={currentOrder}
                    ></OrderDetailsTable>
                  </div>
                </div>
              </>
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
      </>
    );
  };

  const searchOrder = () => {
    const today = new Date(businessDateAll && businessDateAll.businessDate);
    dispatch(
      getCustomerOrders(
        null,
        null,
        props.type,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        keywords
      )
    );
  };

  const resetSearch = () => {
    setKeywords("");
    handleIsReset();
    toast.success("Reset Orders!");
  };

  const handleIsReset = () => {
    if (isReset) {
      setIsReset(false);
    } else {
      setIsReset(true);
    }
  };

  const renderTime = (date) => {
    const dateObj = new Date(date);
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  return (
    <div>
      <div>
        {!props.type ? (
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
        ) : null}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">ORDER NO</CusTableCell1>
              <CusTableCell1 align="center">CREATED DATE</CusTableCell1>
              <CusTableCell1 align="center">SOURCE</CusTableCell1>
              <CusTableCell1 align="center">ORDER TYPE</CusTableCell1>
              <CusTableCell1 align="center">PYMT.</CusTableCell1>
              <CusTableCell1 align="center">PYMT. MODE</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER NAME</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER ADDRESS</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER PHONE NO</CusTableCell1>
              <CusTableCell1 align="center">AMOUNT</CusTableCell1>
              {/* <CusTableCell1 align="center">ITEM ORDERED</CusTableCell1> */}
              <CusTableCell1 align="center">CURRENT STATUS</CusTableCell1>
              <CusTableCell1 align="center">ACTION</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.length > 0 ? (
              <>
                {orders.map((row) => (
                  <TableRow key={row.orderId}>
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
                      <br></br>
                      {renderTime(row.createdDate)}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderSource}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderDeliveryType}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.paymentStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          Payment Mode
                        </InputLabel>
                        <NativeSelect
                          defaultValue={row.paymentMode}
                          inputProps={{
                            name: "status",
                            id: "uncontrolled-native",
                          }}
                          onChange={handlePaymentModeUpdate}
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {paymentModes.map((mode) => (
                            <option
                              key={mode.value}
                              value={mode.value}
                              style={{ fontSize: "0.75rem" }}
                            >
                              {mode.description}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.customerName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">{row.address}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.mobileNumber}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.overallPriceWithTax}
                    </CusTableCell2>
                    {/* <CusTableCell2 align="center">
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
                      <Row>
                        <Col className="m-0 p-0 col-12">
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              sx={{ fontSize: "0.75rem" }}
                            >
                              Status
                            </InputLabel>
                            <NativeSelect
                              defaultValue={row.orderStatus}
                              inputProps={{
                                name: "status",
                                id: "uncontrolled-native",
                              }}
                              onChange={handleStatusUpdate}
                              sx={{ fontSize: "0.75rem" }}
                              disabled={row.orderStatus === "DELIVERED"}
                            >
                              {hidePrevStatus(row.orderStatus).map((status) => (
                                <option
                                  key={status}
                                  value={status}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  {status}
                                </option>
                              ))}
                            </NativeSelect>
                          </FormControl>
                        </Col>
                        <Col className="m-0 p-0 col-12">
                          <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            className="mt-2"
                            sx={{ fontSize: "0.75rem" }}
                            onClick={() => {
                              onClickUpdateStatus(row.orderId, row);
                            }}
                            disabled={row.orderStatus === "DELIVERED"}
                          >
                            Confirm
                          </Button>
                        </Col>
                      </Row>
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
                    <Alert severity="warning">
                      No {props.type} orders to show today!
                    </Alert>
                  )}
                </CusTableCell2>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {renderDetailsModal()}
    </div>
  );
};
