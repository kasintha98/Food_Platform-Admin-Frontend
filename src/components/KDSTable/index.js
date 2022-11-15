import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import bellSound from "../../audio/bell.wav";
import { useDispatch, useSelector } from "react-redux";
import { OrderDetailsTable } from "../OrderDetailsTable";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";
import Alert from "@mui/material/Alert";
import { Row, Col } from "react-bootstrap";
import "./style.css";
import {
  getCustomerOrders,
  updateOrderSubProdStatus,
  updateOrder,
  updateFoodPackagedFlag,
  updateFoodPackagedFlagByItem,
  getCustomerOrdersSilent,
} from "../../actions";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
`;

export const KDSTable = forwardRef((props, ref) => {
  const loading = useSelector((state) => state.order.loading);
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const kdsTime = useSelector((state) => state.user.kdsTime);
  const businessDateAll = useSelector((state) => state.user.businessDate);
  const [filteredData, setFilteredData] = useState([]);
  const [newSubStatus, setNewSubStatus] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const [currentItem, setCurrentItem] = useState({});

  const dispatch = useDispatch();
  const componentRef = useRef();
  const prevCountRef = useRef();

  useEffect(() => {
    const today = businessDateAll
      ? new Date(businessDateAll.businessDate)
      : new Date();
    dispatch(
      getCustomerOrders(
        props.restaurantId,
        props.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        null,
        null,
        null,
        "N",
        null,
        null,
        true
      )
    ).then((res) => {
      if (res) {
        setFilteredData(filterByCounter(res, props.counter));
      }
    });
  }, [props.counter, props.restaurantId, props.storeId, newSubStatus]);

  useEffect(() => {
    setTimeout(
      function () {
        const today = businessDateAll
          ? new Date(businessDateAll.businessDate)
          : new Date();
        dispatch(
          getCustomerOrdersSilent(
            props.restaurantId,
            props.storeId,
            null,
            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            null,
            null,
            null,
            "N",
            null,
            null,
            true
          )
        ).then((res) => {
          if (res) {
            setFilteredData(filterByCounter(res, props.counter));
          }
        });
      },
      kdsTime ? kdsTime : 30000
    );
  });

  useEffect(() => {
    prevCountRef.current = filteredData.length;
  }, [filteredData]);

  useImperativeHandle(ref, () => ({
    handleRefresh,
  }));

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

  const filterByCounter = (orders, counter) => {
    if (counter) {
      for (let i = 0; i < orders.length; i++) {
        orders[i].orderDetails = orders[i].orderDetails.filter(function (el) {
          return el.kdsRoutingName === counter;
        });

        if (props.counter) {
          orders[i].orderDetails = orders[i].orderDetails.filter(function (el) {
            return el.orderDetailStatus !== "FOOD READY";
          });
        }
      }

      orders = orders.filter(function (el) {
        return el.orderDetails.length > 0;
      });
    }

    //In All KDS counter show only ACCEPT, PROCESSING orders filtering
    /* orders = orders.filter(function (el) {
      return el.orderStatus === "ACCEPTED" || el.orderStatus === "PROCESSING";
    }); */

    //Divide into 2 tables
    /* let odd = [];
    let even = [];
    orders.forEach((x, i) => {
      if (i % 2 === 0) {
        even.push(x);
        setTableOneData(even);
      } else {
        odd.push(x);
        setTableTwoData(odd);
      }
    }); */

    if (orders.length > prevCountRef.current) {
      var bell = new Audio(bellSound);
      bell.play();
    }
    return orders;
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleRefresh = () => {
    if (newSubStatus) {
      setNewSubStatus(false);
    } else {
      setNewSubStatus(true);
    }
  };

  const handleUpdateOrderItemStatus = (
    orderId,
    productId,
    subProductId,
    currentOrderDetailStatus,
    order,
    item
  ) => {
    setCurrentOrder(order);
    setCurrentItem(item);
    const foundMatch = stores.find((obj) => {
      return (
        obj.restaurantId === order.restaurantId && obj.storeId === order.storeId
      );
    });

    if (currentOrderDetailStatus === "SUBMITTED") {
      handleSubProductFromTopProduct(
        productId,
        order.orderDetails,
        subProductId,
        "ACCEPTED"
      );

      dispatch(
        updateOrderSubProdStatus(
          orderId,
          productId,
          subProductId,
          "ACCEPTED",
          null,
          null,
          user.loginId
        )
      ).then((res) => {
        if (res) {
          newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
        }
      });
    }
    if (currentOrderDetailStatus === "ACCEPTED") {
      handleSubProductFromTopProduct(
        productId,
        order.orderDetails,
        subProductId,
        "PROCESSING"
      );

      dispatch(
        updateOrderSubProdStatus(
          orderId,
          productId,
          subProductId,
          "PROCESSING",
          null,
          null,
          user.loginId
        )
      ).then((res) => {
        if (res) {
          newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
        }
      });

      if (order.orderStatus === "ACCEPTED") {
        dispatch(updateOrder(orderId, "PROCESSING", null, true, user.loginId));
        setTimeout(function () {
          if (foundMatch && foundMatch.storeKOTPrintFlag === "Y") {
            handlePrint();
          }
        }, 1000);
      }
    }
    if (currentOrderDetailStatus === "PROCESSING") {
      handleSubProductFromTopProduct(
        productId,
        order.orderDetails,
        subProductId,
        "FOOD READY"
      );

      dispatch(
        updateOrderSubProdStatus(
          orderId,
          productId,
          subProductId,
          "FOOD READY",
          null,
          null,
          user.loginId
        )
      ).then((res) => {
        newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
      });
      /* .then((res) => {
        //If all order items are food ready then whole order is food ready
        if (
          res[0].orderDetails.filter(
            (e) => e.orderDetailStatus === "FOOD READY"
          ).length === res[0].orderDetails.length
        ) {
          dispatch(
            updateOrder(orderId, "FOOD READY", null, true, user.loginId)
          ).then((res) => {
            if (res) {
              newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
            }
          });
        } else {
          newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
        }
      }); */
    }
  };

  const updateFoodPackageFlag = (orderId, foodPackagedFlag) => {
    dispatch(
      updateFoodPackagedFlag(orderId, foodPackagedFlag, user.loginId)
    ).then((res) => {
      if (res) {
        handleRefresh();
      }
    });
  };

  const updateFoodPackageFlagEachItem = (
    orderId,
    productId,
    subProductId,
    foodPackagedFlag
  ) => {
    dispatch(
      updateFoodPackagedFlagByItem(
        orderId,
        productId,
        subProductId,
        foodPackagedFlag,
        user.loginId
      )
    ).then((res) => {
      if (res) {
        handleRefresh();
      }
    });
  };

  const handleSubProductFromTopProduct = (
    productId,
    orderDetails,
    subProductId,
    status
  ) => {
    if (subProductId === "NAA") {
      for (let i = 0; i < orderDetails.length; i++) {
        if (
          orderDetails[i].productId === productId &&
          orderDetails[i].subProductId !== "NAA"
        ) {
          dispatch(
            updateOrderSubProdStatus(
              orderDetails[i].orderId,
              orderDetails[i].productId,
              orderDetails[i].subProductId,
              status,
              null,
              true,
              user.loginId
            )
          );
        }
      }
    }
  };

  const renderTableBody = () => {
    if (!props.counter) {
      return (
        <>
          {filteredData.map((order) => (
            <>
              {order.orderDetails.map((item, index) => (
                <>
                  {item.orderDetailFoodPackagedFlag === "N" ? (
                    <TableRow>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {item.orderId.substr(item.orderId.length - 3)} &nbsp;
                        <>
                          <Button
                            sx={{ padding: 0 }}
                            color="error"
                            variant="contained"
                            onClick={() => {
                              //updateFoodPackageFlag(order.orderId, "Y");
                              updateFoodPackageFlagEachItem(
                                item.orderId,
                                item.productId,
                                item.subProductId,
                                "Y"
                              );
                            }}
                            disabled={
                              item.orderDetailStatus === "SUBMITTED" ||
                              item.orderDetailStatus === "ACCEPTED" ||
                              item.orderDetailStatus === "PROCESSING"
                            }
                          >
                            Release
                          </Button>
                        </>
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        <Timer
                          active
                          duration={null}
                          time={new Date() - new Date(order.createdDate)}
                        >
                          <Timecode />
                        </Timer>
                      </CusTableCell>
                      {/* <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderSource}
                      </CusTableCell> */}
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderDeliveryType}
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000", fontWeight: "600" }}
                      >
                        {order.storeTableId ? order.storeTableId : "N/A"}
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.customerName}
                      </CusTableCell>
                      <CusTableCell
                        align="left"
                        sx={{
                          border: "1px solid #000",
                          fontWeight: "600",
                          fontSize: "16px !important",
                        }}
                      >
                        <div key={index}>
                          {item.ingredient === "No Ingredient" ? (
                            <div
                              style={{
                                borderBottom: "1px solid #000",
                                minHeight: "25px",
                              }}
                            >
                              {item.productName}
                            </div>
                          ) : (
                            <div
                              style={{
                                borderBottom: "1px solid #000",
                                color: "red",
                                paddingLeft: "2em",
                                minHeight: "25px",
                              }}
                            >
                              {item.ingredient}
                            </div>
                          )}
                        </div>
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        <div
                          key={index}
                          style={{
                            borderBottom: "1px solid #000",
                            minHeight: "25px",
                            fontWeight: "600",
                          }}
                        >
                          {item.quantity}
                        </div>
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        <div
                          key={index}
                          style={{
                            borderBottom: "1px solid #000",
                            minHeight: "25px",
                          }}
                        >
                          {item.remarks ? item.remarks : "No Data"}
                        </div>
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        <div
                          key={index}
                          className={
                            item.orderDetailStatus === "FOOD READY"
                              ? "back-green"
                              : item.orderDetailStatus === "PROCESSING"
                              ? "back-yellow"
                              : item.orderDetailStatus === "ACCEPTED"
                              ? "back-orange"
                              : ""
                          }
                          onClick={() => {
                            handleUpdateOrderItemStatus(
                              item.orderId,
                              item.productId,
                              item.subProductId,
                              item.orderDetailStatus,
                              order,
                              item
                            );
                          }}
                        >
                          <div
                            style={{
                              borderBottom: "1px solid #000",
                              minHeight: "25px",
                            }}
                          >
                            {item.orderDetailStatus}
                          </div>
                        </div>
                      </CusTableCell>
                    </TableRow>
                  ) : null}
                </>
              ))}
            </>
          ))}
        </>
      );
    } else {
      return (
        <>
          {filteredData.map((order) => (
            <TableRow>
              <CusTableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.orderId.substr(order.orderId.length - 3)} &nbsp;
              </CusTableCell>
              <CusTableCell align="center" sx={{ border: "1px solid #000" }}>
                <Timer
                  active
                  duration={null}
                  time={new Date() - new Date(order.createdDate)}
                >
                  <Timecode />
                </Timer>
              </CusTableCell>
              {/* <CusTableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.orderSource}
              </CusTableCell> */}
              <CusTableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.orderDeliveryType}
              </CusTableCell>
              <CusTableCell
                align="center"
                sx={{ border: "1px solid #000", fontWeight: "600" }}
              >
                {order.storeTableId ? order.storeTableId : "N/A"}
              </CusTableCell>
              <CusTableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.customerName}
              </CusTableCell>
              <CusTableCell
                align="left"
                sx={{
                  border: "1px solid #000",
                  fontWeight: "600",
                  fontSize: "16px !important",
                }}
              >
                {order.orderDetails.map((item, index) => (
                  <div key={index}>
                    {item.ingredient === "No Ingredient" ? (
                      <div
                        style={{
                          borderBottom: "1px solid #000",
                          minHeight: "25px",
                        }}
                      >
                        {item.productName}
                      </div>
                    ) : (
                      <div
                        style={{
                          borderBottom: "1px solid #000",
                          color: "red",
                          paddingLeft: "2em",
                          minHeight: "25px",
                        }}
                      >
                        {item.ingredient}
                      </div>
                    )}
                  </div>
                ))}
              </CusTableCell>
              <CusTableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.orderDetails.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      borderBottom: "1px solid #000",
                      minHeight: "25px",
                      fontWeight: "600",
                    }}
                  >
                    {item.quantity}
                  </div>
                ))}
              </CusTableCell>
              <CusTableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.orderDetails.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      borderBottom: "1px solid #000",
                      minHeight: "25px",
                    }}
                  >
                    {item.remarks ? item.remarks : "No Data"}
                  </div>
                ))}
              </CusTableCell>
              <CusTableCell align="center" sx={{ border: "1px solid #000" }}>
                {order.orderDetails.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item.orderDetailStatus === "FOOD READY"
                        ? "back-green"
                        : item.orderDetailStatus === "PROCESSING"
                        ? "back-yellow"
                        : item.orderDetailStatus === "ACCEPTED"
                        ? "back-orange"
                        : ""
                    }
                    onClick={() => {
                      handleUpdateOrderItemStatus(
                        item.orderId,
                        item.productId,
                        item.subProductId,
                        item.orderDetailStatus,
                        order,
                        item
                      );
                    }}
                  >
                    <div
                      style={{
                        borderBottom: "1px solid #000",
                        minHeight: "25px",
                      }}
                    >
                      {item.orderDetailStatus}
                    </div>
                  </div>
                ))}
              </CusTableCell>
            </TableRow>
          ))}
        </>
      );
    }
  };

  return (
    <div className="mt-0">
      <Row>
        <Col
          className="p-0 m-0 col-12"
          style={{ overflowX: "auto", paddingRight: "5px" }}
        >
          <Table sx={{ minWidth: 825 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#595959",
                }}
              >
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Order Id
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Time (H:M:S)
                </CusTableCell>
                {/* <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Order Type
                </CusTableCell> */}
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Order Info
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Table ID
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Customer Name
                </CusTableCell>
                <CusTableCell
                  sx={{
                    color: "#fff",
                    border: "1px solid #fff",
                    minWidth: "350px",
                  }}
                  align="center"
                >
                  Item Name
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Qty.
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Remarks
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Status
                </CusTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData && filteredData.length > 0 && !loading ? (
                <>{renderTableBody()}</>
              ) : (
                <TableRow>
                  <CusTableCell scope="row" colspan="9">
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        ></div>
                      </div>
                    ) : (
                      <Alert severity="warning" className="mt-4">
                        No orders to show!
                      </Alert>
                    )}
                  </CusTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Col>

        {/* <Col
          md={6}
          className="pr-0 me-0"
          style={{ overflowX: "auto", paddingLeft: "5px" }}
        >
          <Table sx={{ minWidth: 703 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#595959",
                }}
              >
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Order Id
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Time (H:M:S)
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Order Type
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Order Info
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Customer Name
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Item Name
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Qty.
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Remarks
                </CusTableCell>
                <CusTableCell
                  sx={{ color: "#fff", border: "1px solid #fff" }}
                  align="center"
                >
                  Status
                </CusTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableTwoData && tableTwoData.length > 0 && !loading ? (
                <>
                  {tableTwoData.map((order) => (
                    <TableRow>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderId.substr(order.orderId.length - 3)}
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        <Timer
                          active
                          duration={null}
                          time={new Date(order.createdDate)}
                        >
                          <Timecode />
                        </Timer>
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderSource}
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderDeliveryType}
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.customerId}
                      </CusTableCell>
                      <CusTableCell
                        align="left"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderDetails.map((item) => (
                          <>
                            {item.ingredient === "No Ingredient" ? (
                              <div style={{ borderBottom: "1px solid #000" }}>
                                {item.productName}
                              </div>
                            ) : (
                              <div
                                style={{
                                  borderBottom: "1px solid #000",
                                  color: "red",
                                  paddingLeft: "2em",
                                }}
                              >
                                {item.ingredient}
                              </div>
                            )}
                          </>
                        ))}
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderDetails.map((item) => (
                          <>
                            <div style={{ borderBottom: "1px solid #000" }}>
                              {item.quantity}
                            </div>
                          </>
                        ))}
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderDetails.map((item) => (
                          <>
                            <div style={{ borderBottom: "1px solid #000" }}>
                              {item.remarks ? item.remarks : "No Data"}
                            </div>
                          </>
                        ))}
                      </CusTableCell>
                      <CusTableCell
                        align="center"
                        sx={{ border: "1px solid #000" }}
                      >
                        {order.orderDetails.map((item) => (
                          <div
                            className={
                              item.orderDetailStatus === "FOOD READY" ||
                              item.orderDetailStatus === "Completed"
                                ? "back-green"
                                : "back-orange"
                            }
                          >
                            <div style={{ borderBottom: "1px solid #000" }}>
                              {item.orderDetailStatus}
                            </div>
                          </div>
                        ))}
                      </CusTableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <CusTableCell scope="row" colspan="9">
                    {loading ? (
                      <div class="d-flex justify-content-center">
                        <div
                          class="spinner-border text-primary"
                          role="status"
                        ></div>
                      </div>
                    ) : (
                      <Alert severity="warning" className="mt-4">
                        No orders to show!
                      </Alert>
                    )}
                  </CusTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Col> */}
      </Row>

      <div style={{ display: "none" }}>
        <div
          style={{ fontFamily: "Billfont" }}
          className="text-center"
          ref={componentRef}
        >
          <p style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
            KOT{" "}
            {currentOrder.orderId
              ? currentOrder.orderId.substr(currentOrder.orderId.length - 3)
              : currentOrder.orderId}
          </p>
          <p style={{ fontWeight: "bold", fontSize: "3.5rem" }}>
            {currentOrder.orderDeliveryType}
          </p>
          <p style={{ fontWeight: "bold", fontSize: "3.5rem" }}>
            Table No: {currentOrder.storeTableId}
          </p>
          <p style={{ fontWeight: "bold", fontSize: "3.5rem" }}>
            Name: {currentOrder.customerName}
          </p>
          <div style={{ display: "inline-flex", columnGap: "10px" }}>
            <p style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
              {renderNowDate(currentOrder.orderReceivedDateTime)}
            </p>
            <p style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
              {renderNowTime(currentOrder.createdDate)}
            </p>
          </div>
          <hr></hr>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    fontFamily: "Billfont !important",
                  }}
                  align="center"
                >
                  -------
                  <hr></hr>
                  Qty
                  <hr></hr>
                  -------
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    fontFamily: "Billfont !important",
                  }}
                  align="center"
                >
                  ------------
                  <hr></hr>
                  Dish Name
                  <hr></hr>
                  ------------
                </TableCell>
                {/* <TableCell
                  sx={{
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    fontFamily: "Billfont !important",
                  }}
                  align="center"
                >
                  Unit
                  <hr></hr>
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={currentOrder.orderId}>
                <TableCell
                  sx={{
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    fontFamily: "Billfont !important",
                  }}
                  align="center"
                >
                  {currentItem.quantity}
                  <hr></hr>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    fontFamily: "Billfont !important",
                  }}
                  align="center"
                >
                  {currentItem.productName}
                  <hr></hr>
                </TableCell>
                {/* <TableCell
                  sx={{
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    fontFamily: "Billfont !important",
                  }}
                  align="center"
                >
                  {currentItem.size}
                  <hr></hr>
                </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
});
