import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
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
  getAllOrders,
  getCustomerOrders,
  updateOrderSubProdStatus,
  updateOrder,
} from "../../actions";

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 14px;
`;

export const KDSTable = forwardRef((props, ref) => {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const [filteredData, setFilteredData] = useState([]);
  const [newSubStatus, setNewSubStatus] = useState(false);
  const [tableOneData, setTableOneData] = useState([]);
  const [tableTwoData, setTableTwoData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    dispatch(
      getCustomerOrders(
        props.restaurantId,
        props.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      )
    ).then((res) => {
      if (res) {
        setFilteredData(filterByCounter(res, props.counter));
      }
    });
  }, [props.counter, props.restaurantId, props.storeId, newSubStatus]);

  useImperativeHandle(ref, () => ({
    handleRefresh,
  }));

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

    orders = orders.filter(function (el) {
      return el.orderStatus === "ACCEPTED" || el.orderStatus === "PROCESSING";
    });

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

    return orders;
  };

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
    order
  ) => {
    if (currentOrderDetailStatus === "SUBMITTED") {
      dispatch(
        updateOrderSubProdStatus(orderId, productId, subProductId, "ACCEPTED")
      ).then((res) => {
        if (res) {
          newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
        }
      });
    }
    if (currentOrderDetailStatus === "ACCEPTED") {
      dispatch(
        updateOrderSubProdStatus(orderId, productId, subProductId, "PROCESSING")
      ).then((res) => {
        if (res) {
          newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
        }
      });

      if (order.orderStatus === "ACCEPTED") {
        dispatch(updateOrder(orderId, "PROCESSING", null, true));
      }
    }
    if (currentOrderDetailStatus === "PROCESSING") {
      dispatch(
        updateOrderSubProdStatus(orderId, productId, subProductId, "FOOD READY")
      ).then((res) => {
        //If all order items are food ready then whole order is food ready
        if (
          res[0].orderDetails.filter(
            (e) => e.orderDetailStatus === "FOOD READY"
          ).length === res[0].orderDetails.length
        ) {
          dispatch(updateOrder(orderId, "FOOD READY", null, true)).then(
            (res) => {
              if (res) {
                newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
              }
            }
          );
        } else {
          newSubStatus ? setNewSubStatus(false) : setNewSubStatus(true);
        }
      });
    }
  };

  return (
    <div className="mt-0">
      <Row>
        <Col
          className="p-0 m-0 col-12"
          style={{ overflowX: "auto", paddingRight: "5px" }}
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
              {filteredData && filteredData.length > 0 && !loading ? (
                <>
                  {filteredData.map((order) => (
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
                          time={new Date() - new Date(order.createdDate)}
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
                        {order.customerName}
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
                                order
                              );
                            }}
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
    </div>
  );
});
