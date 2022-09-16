import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerOrders,
  updateOrder,
  getUsersByRole,
  updateOrderPaymentAndStatus,
} from "../../actions";
import Layout from "../NewLayout";
import { Row, Col, Modal } from "react-bootstrap";
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
import { toast } from "react-toastify";
import { OrderDetailsTable } from "../../components/OrderDetailsTable";
import Pdf from "react-to-pdf";

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
`;

/* const paymentModes = [
  { name: "CASH", code: "CASH" },
  { name: "PayTM", code: "PayTM" },
  { name: "Credit / Debit", code: "EDC" },
  { name: "Google Pay", code: "Gpay" },
  { name: "PhonePe", code: "PhonePe" },
  { name: "Amazon Pay", code: "AmznPay" },
  { name: "COD", code: "COD" },
]; */

export const DeliveryBoy = () => {
  const user = useSelector((state) => state.auth.user);
  const stores = useSelector((state) => state.store.stores);

  const businessDateAll = useSelector((state) => state.user.businessDate);
  const paymentModes = useSelector((state) => state.user.paymentModes);
  const usersByRole = useSelector((state) => state.user.usersByRole);
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDeliBoy, setSelectedDeliBoy] = useState("");
  const [height, setHeight] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const [selectedDeliBoyObj, setSelectedDeliBoyObj] = useState("");
  const statuses =
    user.roleCategory === "DELIVERY_BOY"
      ? ["PROCESSING", "FOOD READY", "OUT FOR DELIVERY", "DELIVERED"]
      : [
          "PROCESSING",
          "FOOD READY",
          "OUT FOR DELIVERY",
          "DELIVERED",
          "CANCELLED",
        ];

  const dispatch = useDispatch();

  const ref = React.createRef();
  const refH = React.useRef(null);

  const options = {
    unit: "px",
    format: [265, height],
  };

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  useEffect(() => {
    const today = new Date(businessDateAll && businessDateAll.businessDate);

    if (user.roleCategory === "DELIVERY_BOY") {
      setSelectedDeliBoy(user.firstName);
      dispatch(
        getCustomerOrders(
          null,
          null,
          null,
          `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
          null,
          `${user.firstName}`
        )
      ).then((res) => {
        if (res) {
          setFilteredData(filterByStatus(res));
        }
      });
    } else {
      dispatch(getUsersByRole("DELIVERY_BOY"));
      if (selectedDeliBoyObj) {
        dispatch(
          getCustomerOrders(
            null,
            null,
            null,
            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            null,
            `${selectedDeliBoyObj.firstName}`
          )
        ).then((res) => {
          if (res) {
            setFilteredData(filterByStatus(res));
          }
        });
      }
    }
  }, [isReset]);

  const filterByStatus = (orders) => {
    orders = orders.filter(function (el) {
      return (
        el.orderStatus === "FOOD READY" ||
        el.orderStatus === "OUT FOR DELIVERY" ||
        el.orderStatus === "DELIVERED" ||
        el.orderStatus === "CANCELLED"
      );
    });

    return orders;
  };

  const handleCloseDetailsModal = () => setShowDetailsModal(false);
  const handleShowDetailsModal = () => setShowDetailsModal(true);

  const handleChangeKeywords = (event) => {
    setKeywords(event.target.value);
  };

  const handlePaymentModeUpdate = (event) => {
    setPaymentMode(event.target.value);
    console.log(event.target.value);
  };

  const resetState = () => {
    isReset ? setIsReset(false) : setIsReset(true);
  };

  const hidePrevStatus = (curStatus) => {
    if (curStatus === "DELIVERED") {
      return [];
    } else {
      const index = statuses.indexOf(curStatus);

      if (index) {
        const newArr = statuses.slice(index + 1, statuses.length);
        return newArr;
      } else {
        return statuses;
      }
    }
  };

  const searchOrder = () => {
    const today = new Date(businessDateAll && businessDateAll.businessDate);
    dispatch(
      getCustomerOrders(
        user.restaurantId,
        user.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        keywords,
        selectedDeliBoy
      )
    ).then((res) => {
      if (res) {
        setFilteredData(filterByStatus(res));
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

  const onClickUpdateStatus = (id, order) => {
    if ((status && status !== "none") || paymentMode) {
      /* dispatch(updateOrder(id, status, null,user.loginId)).then((res) => {
        if (res) {
          resetState();
        }
      }); */

      dispatch(
        updateOrderPaymentAndStatus(
          id,
          paymentMode ? paymentMode : order.paymentMode,
          "PAID",
          status ? status : order.orderStatus,
          null,
          user.loginId
        )
      ).then((res) => {
        if (res) {
          resetState();
        }
      });

      setStatus("");
      setPaymentMode("");
    } else {
      toast.error("Please select a status/ payment mode!");
    }
  };

  const handleStatusUpdate = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
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

  const handleDeliveryBoyUpdate = (event) => {
    setSelectedDeliBoy(event.target.value);

    if (event.target.value) {
      const today = new Date(businessDateAll && businessDateAll.businessDate);
      dispatch(
        getCustomerOrders(
          null,
          null,
          null,
          `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
          null,
          `${event.target.value}`
        )
      ).then((res) => {
        if (res) {
          setFilteredData(filterByStatus(res));
        }
      });
    } else {
      setFilteredData([]);
    }
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
            <>
              {" "}
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
                    <Typography>Mob No: {currentOrder.mobileNumber}</Typography>
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
    );
  };

  return (
    <Layout sidebar headerTitle="Delivery Boy">
      <Row>
        <Col sm={user.roleCategory === "DELIVERY_BOY" ? 6 : 4}>
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
        <Col sm={user.roleCategory === "DELIVERY_BOY" ? 6 : 4}>
          <Typography sx={{ color: "#595959", fontWeight: "bold" }}>
            Role: Delivery Boy{" "}
            {selectedDeliBoy ? (
              <span>({selectedDeliBoy})</span>
            ) : (
              <span>(None Selected)</span>
            )}
          </Typography>
          <Typography sx={{ color: "#595959", fontWeight: "bold" }}>
            Store Name: {user.resturantName}
          </Typography>
        </Col>
        {user.roleCategory !== "DELIVERY_BOY" && (
          <Col sm={4}>
            <FormControl fullWidth>
              <NativeSelect
                inputProps={{
                  name: "status",
                  id: "uncontrolled-native",
                }}
                onChange={handleDeliveryBoyUpdate}
                sx={{ fontSize: "0.75rem" }}
              >
                <option
                  value=""
                  onClick={() => {
                    setSelectedDeliBoyObj(null);
                  }}
                >
                  Select Delivery Boy
                </option>
                {usersByRole.map((user) => (
                  <option
                    key={user.userSeqNo}
                    value={user.firstName}
                    onClick={() => {
                      setSelectedDeliBoyObj(user);
                    }}
                  >
                    {user.firstName}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Col>
        )}
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
              <CusTableCell1 align="center">ACCEPT ORDER</CusTableCell1>
              <CusTableCell1 align="center">ACTION</CusTableCell1>
              <CusTableCell1 align="center">STATUS</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              <>
                {filteredData.map((row) => (
                  <TableRow key={row.orderId}>
                    <CusTableCell2
                      align="center"
                      onClick={() => {
                        setCurrentOrder(row);
                        handleShowDetailsModal();
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {row.orderId.slice(0, 11)} <br></br>
                      {row.orderId.slice(11, 19)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.slice(19, 23)}
                      </span>
                    </CusTableCell2>
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
                          disabled={row.orderStatus === "DELIVERED"}
                          sx={{
                            fontSize: "0.75rem",
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "black",
                            },
                          }}
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
                      <Button
                        variant="contained"
                        fullWidth
                        disabled={
                          row.orderStatus === "FOOD READY" ? false : true
                        }
                        onClick={() => {
                          dispatch(
                            updateOrder(
                              row.orderId,
                              "OUT FOR DELIVERY",
                              null,
                              null,
                              user.loginId
                            )
                          ).then((res) => {
                            if (res) {
                              resetState();
                            }
                          });
                        }}
                      >
                        Accept
                      </Button>
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
                              <option
                                value="none"
                                style={{ fontSize: "0.75rem" }}
                              >
                                Select Status
                              </option>
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
                    <CusTableCell2 align="center">
                      {row.orderStatus === "DELIVERED" ? (
                        <span style={{ color: "green" }}>
                          {row.orderStatus}
                        </span>
                      ) : (
                        <span>{row.orderStatus}</span>
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
                    <Alert severity="warning">
                      {selectedDeliBoy
                        ? `No orders in "FOOD READY" / "OUT FOR DELIVERY" /
                      "DELIVERED" / "CANCELLED" status to show today!`
                        : "Please select a delivery boy!"}
                    </Alert>
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
