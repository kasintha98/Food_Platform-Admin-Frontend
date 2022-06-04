import React, { useEffect, useState } from "react";
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
import { getCustomerOrders } from "../../actions";

const CusTableCell = styled(TableCell)`
  padding: 0;
  font-size: 10px;
`;

export const KDSTable = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const [filteredData, setFilteredData] = useState([]);
  const [tableOneData, setTableOneData] = useState([]);
  const [tableTwoData, setTableTwoData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    dispatch(
      getCustomerOrders(
        props.restaurantId,
        props.storeId,
        "ACCEPTED",
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      )
    ).then((res) => {
      if (res) {
        setFilteredData(filterByCounter(res, props.counter));
      }
    });
  }, [props.counter, props.restaurantId, props.storeId]);

  const filterByCounter = (orders, counter) => {
    if (counter) {
      for (let i = 0; i < orders.length; i++) {
        orders[i].orderDetails = orders[i].orderDetails.filter(function (el) {
          return el.kdsRoutingName === counter;
        });
      }

      orders = orders.filter(function (el) {
        return el.orderDetails.length > 0;
      });
    }

    let odd = [];
    let even = [];
    orders.forEach((x, i) => {
      if (i % 2 === 0) {
        even.push(x);
        setTableOneData(even);
      } else {
        odd.push(x);
        setTableTwoData(odd);
      }
    });

    return orders;
  };

  return (
    <div className="mt-0">
      <Row>
        <Col
          md={6}
          className="pl-0 ms-0"
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
              {tableOneData && tableOneData.length > 0 && !loading ? (
                <>
                  {tableOneData.map((order) => (
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

                            {item.choice ? (
                              <>
                                <br></br>
                                {/* <hr></hr> */}
                                {item.choice.map((ch) => (
                                  <p style={{ margin: 0 }}>
                                    {ch.status} <br></br>
                                  </p>
                                ))}
                              </>
                            ) : null}

                            {item.extra ? (
                              <>
                                <br></br>
                                {/* <hr></hr> */}
                                {item.extra.map((ch) => (
                                  <p style={{ margin: 0 }}>
                                    {ch.status} <br></br>
                                  </p>
                                ))}
                              </>
                            ) : null}
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
        <Col
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

                            {item.choice ? (
                              <>
                                <br></br>
                                {/* <hr></hr> */}
                                {item.choice.map((ch) => (
                                  <p style={{ margin: 0 }}>
                                    {ch.status} <br></br>
                                  </p>
                                ))}
                              </>
                            ) : null}

                            {item.extra ? (
                              <>
                                <br></br>
                                {/* <hr></hr> */}
                                {item.extra.map((ch) => (
                                  <p style={{ margin: 0 }}>
                                    {ch.status} <br></br>
                                  </p>
                                ))}
                              </>
                            ) : null}
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
        </Col>
      </Row>
    </div>
  );
};
