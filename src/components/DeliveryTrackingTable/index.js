import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pdf from "react-to-pdf";
import {
  getCustomerOrders,
  updateOrder,
  GetOrderProcessStatus2,
} from "../../actions";
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
  Box,
  InputLabel,
  TextField,
  NativeSelect,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { MapNew } from "../MapNew";
import { DeliveryRiderViewMap } from "../DeliveryRiderViewMap";
import { DeliveryRiderViewMapNew } from "../DeliveryRiderViewMapNew";
import { OrderDetailsTable } from "../OrderDetailsTable";
import "./style.css";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.68rem;
  font-weight: bold;
  color: #fff;
  background-color: #70ad47;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
`;

const CusTableCell3 = styled(TableCell)`
  font-size: 0.75rem;
  max-width: 120px;
  word-wrap: break-word;
`;

const CusSelect = styled(Select)`
  & .MuiSelect-select {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

const CusMenuItem = styled(MenuItem)``;

export const DeliveryTrackingTable = (props) => {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const allRiderLocations = useSelector((state) => state.rider.allLocations);
  const stores = useSelector((state) => state.store.stores);
  const businessDateAll = useSelector((state) => state.user.businessDate);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allStatus, setAllStatus] = useState({});
  const [height, setHeight] = useState(0);
  const [selectedStore, setSelectedStore] = useState(
    user.roleCategory === "SUPER_ADMIN" ? "ALL" : user.restaurantId
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId:
      user.roleCategory === "SUPER_ADMIN" ? null : user.restaurantId,
    storeId: user.roleCategory === "SUPER_ADMIN" ? null : user.storeId,
  });

  const dispatch = useDispatch();

  const ref = React.createRef();
  const refH = React.useRef(null);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  const options = {
    unit: "px",
    format: [265, height],
  };

  useEffect(() => {
    const today = new Date(businessDateAll && businessDateAll.businessDate);
    dispatch(
      getCustomerOrders(
        selectedStoreObj.restaurantId,
        selectedStoreObj.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        null,
        props.boyName
      )
    ).then((res) => {
      if (res) {
        setFilteredData(filterByStatus(res));
      }

      if (res && res.length > 0) {
        let ob = {};
        for (let j = 0; j < res.length; j++) {
          dispatch(GetOrderProcessStatus2(res[j].orderId)).then((res2) => {
            if (res2 && res2.length > 0) {
              for (let i = 0; i < res2.length; i++) {
                const newPair = { [res2[i].orderId]: res2 };
                //ob[res2[i].orderId] = res2;
                ob = { ...ob, ...newPair };
              }
              console.log(ob);
              setAllStatus(ob);
            }
          });
        }
      }
    });
  }, [isReset, selectedStoreObj]);

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

  const handleChangeStore = (event) => {
    setSelectedStore(event.target.value);
    console.log(event.target.value);
  };

  const handleSelectedStore = (store) => {
    setSelectedStoreObj(store);
  };

  const handleChangeKeywords = (event) => {
    setKeywords(event.target.value);
  };

  const resetState = () => {
    isReset ? setIsReset(false) : setIsReset(true);
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
        props.boyName
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

  const onClickUpdateStatus = (id) => {
    if (status) {
      dispatch(updateOrder(id, status, null, null, user.loginId)).then(
        (res) => {
          if (res) {
            resetState();
          }
        }
      );
      setStatus("");
    }
  };

  const handleStatusUpdate = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
  };

  const calcOrdersDelivered = () => {
    let arr = filteredData;
    const count = arr.filter(function (el) {
      return el.orderStatus === "DELIVERED";
    }).length;
    return <span>{count}</span>;
  };

  const calcOrdersPending = () => {
    let arr = filteredData;
    const count = arr.filter(function (el) {
      return (
        el.orderStatus === "FOOD READY" ||
        el.orderStatus === "OUT FOR DELIVERY" ||
        el.orderStatus === "CANCELLED"
      );
    }).length;
    return <span>{count}</span>;
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

  const renderTime = (date) => {
    const dateObj = new Date(date);
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  const getTimeByStatus = (id, status, isHtml) => {
    let acceptedTime = null;
    if (allStatus) {
      const arrayOb = allStatus[id];

      if (arrayOb) {
        for (let i = 0; i < arrayOb.length; i++) {
          if (arrayOb[i].orderStatus === status) {
            acceptedTime = arrayOb[i].updatedDate;
          }
        }
      }
    }

    if (acceptedTime) {
      return isHtml ? (
        <span>
          {renderDate(acceptedTime)} - {renderTime(acceptedTime)}
        </span>
      ) : (
        acceptedTime
      );
    } else {
      return isHtml ? <span>N/A</span> : null;
    }
  };

  const getTimeTakenByDeliveryRider = (id, isStrng) => {
    const outTime = getTimeByStatus(id, "OUT FOR DELIVERY", false);
    const deliveredTime = getTimeByStatus(id, "DELIVERED", false);

    if (outTime && deliveredTime) {
      const timeTaken = new Date(deliveredTime) - new Date(outTime);

      /* return isStrng ? (
        `${new Date(timeTaken).toISOString().substring(11, 19)}`
      ) : (
        <span>{new Date(timeTaken).toISOString().substring(11, 19)}</span>
      ); */

      return isStrng ? (
        `${secondsToHMS(timeTaken / 1000)}`
      ) : (
        <span>{secondsToHMS(timeTaken / 1000)}</span>
      );
    }
    if (!deliveredTime) {
      return isStrng ? (
        "Order Not Delivered Yet"
      ) : (
        <span>Order Not Delivered Yet</span>
      );
    }
    if (!outTime) {
      return isStrng ? (
        "Order Accepted Time Missing"
      ) : (
        <span>Order Accepted Time Missing</span>
      );
    }
  };

  const secondsToHMS = (secs) => {
    function z(n) {
      return (n < 10 ? "0" : "") + n;
    }
    var sign = secs < 0 ? "-" : "";
    secs = Math.abs(secs);
    return (
      sign +
      z((secs / 3600) | 0) +
      ":" +
      z(((secs % 3600) / 60) | 0) +
      ":" +
      z(secs % 60)
    );
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
                        Cashier: {user.loginId.toUpperCase()}
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
                      Cashier: {user.loginId.toUpperCase()}
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
    <div>
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
      <Row
        className="mt-3 mb-3"
        style={{
          border: "1px solid #D9D9D9",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <Col sm={4}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            DELIVERY BOY: {props.boyName}
          </Typography>
        </Col>
        <Col sm={4}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            ORDERS DELIVERED:{" "}
            <span className="delivered">{calcOrdersDelivered()}</span>
          </Typography>
        </Col>
        <Col sm={4}>
          <Typography sx={{ color: "#7F7F7F", fontWeight: "bold" }}>
            PENDING DELIVERED:{" "}
            <span className="pending">{calcOrdersPending()}</span>
          </Typography>
        </Col>
      </Row>
      <ExcelFile element={<Button variant="text">Download Full Report</Button>}>
        <ExcelSheet data={filteredData} name="Orders">
          <ExcelColumn label="orderId" value="orderId" />
          <ExcelColumn label="restaurantId" value="restaurantId" />
          <ExcelColumn label="storeId" value="storeId" />
          <ExcelColumn label="mobileNumber" value="mobileNumber" />
          <ExcelColumn label="paymentStatus" value="paymentStatus" />
          <ExcelColumn label="paymentMode" value="paymentMode" />
          <ExcelColumn label="customerName" value="customerName" />
          <ExcelColumn label="address" value="address" />
          <ExcelColumn
            label="overallPriceWithTax"
            value="overallPriceWithTax"
          />
          <ExcelColumn label="orderStatus" value="orderStatus" />
          <ExcelColumn
            label="ORDER ACCEPTED TIME"
            value={(col) => getTimeByStatus(col.orderId, "ACCEPTED", false)}
          />
          <ExcelColumn
            label="ORDER DELIVERED TIME"
            value={(col) => getTimeByStatus(col.orderId, "DELIVERED", false)}
          />
          <ExcelColumn
            label="TIME TAKEN BY DELIVERY BOY (HH:MM:SS)"
            value={(col) => getTimeTakenByDeliveryRider(col.orderId, true)}
          />
        </ExcelSheet>
      </ExcelFile>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">ORDER NO</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER PHONE NO</CusTableCell1>
              <CusTableCell1 align="center">PYMT.</CusTableCell1>
              <CusTableCell1 align="center">PYMT. MODE</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER NAME</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER ADDRESS</CusTableCell1>
              <CusTableCell1 align="center">AMOUNT</CusTableCell1>
              <CusTableCell1 align="center">CURRENT STATUS</CusTableCell1>
              <CusTableCell1 align="center">ORDER ACCEPTED TIME</CusTableCell1>
              <CusTableCell1 align="center">ORDER DELIVERED TIME</CusTableCell1>
              <CusTableCell1 align="center">
                TIME TAKEN BY DELIVERY BOY (HH:MM:SS)
              </CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              <>
                {filteredData.map((row) => (
                  <TableRow key={row.orderId}>
                    <CusTableCell3
                      align="center"
                      onClick={() => {
                        setCurrentOrder(row);
                        handleShowDetailsModal();
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* {row.orderId.slice(0, 11)} <br></br> */}
                      {/* {row.orderId.slice(0, row.orderId.length - 4)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.slice(
                          row.orderId.length - 4,
                          row.orderId.length
                        )}
                      </span> */}
                      {row.orderId.substr(0, row.orderId.length - 3)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.substr(row.orderId.length - 3)}
                      </span>
                    </CusTableCell3>

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

                    <CusTableCell2 align="center">
                      {row.orderStatus === "DELIVERED" ? (
                        <span style={{ color: "green" }}>
                          {row.orderStatus}
                        </span>
                      ) : (
                        <span>{row.orderStatus}</span>
                      )}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {getTimeByStatus(row.orderId, "OUT FOR DELIVERY", true)}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {getTimeByStatus(row.orderId, "DELIVERED", true)}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {getTimeTakenByDeliveryRider(row.orderId)}
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
                      No orders in "FOOD READY" / "OUT FOR DELIVERY" /
                      "DELIVERED" / "CANCELLED" status to show today!
                    </Alert>
                  )}
                </CusTableCell2>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {/* <h3>Customer Order Address Locations</h3>
        <MapNew></MapNew> */}
        {/* <h3>Delivery Rider View</h3>
        <DeliveryRiderViewMap></DeliveryRiderViewMap> */}
        {/* <h3>Delivery Rider View New</h3>
        <DeliveryRiderViewMapNew></DeliveryRiderViewMapNew> */}
      </div>
      {renderDetailsModal()}
    </div>
  );
};
