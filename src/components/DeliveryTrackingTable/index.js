import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders, updateOrder } from "../../actions";
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
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { MapNew } from "../MapNew";
import { OrderDetailsTable } from "../OrderDetailsTable";
import "./style.css";

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  color: #fff;
  background-color: #70ad47;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
`;

export const DeliveryTrackingTable = (props) => {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    dispatch(
      getCustomerOrders(
        user.restaurantId,
        user.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        null,
        props.boyName
      )
    ).then((res) => {
      if (res) {
        setFilteredData(filterByStatus(res));
      }
    });
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

  const resetState = () => {
    isReset ? setIsReset(false) : setIsReset(true);
  };

  const searchOrder = () => {
    const today = new Date();
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
      dispatch(updateOrder(id, status, null)).then((res) => {
        if (res) {
          resetState();
        }
      });
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

  const renderDetailsModal = () => {
    return (
      <Modal
        show={showDetailsModal}
        onHide={handleCloseDetailsModal}
        close
        style={{ marginTop: "60px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>OrderDetails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderDetailsTable fullResp={currentOrder}></OrderDetailsTable>
        </Modal.Body>
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
          <Typography sx={{ color: "#595959", fontWeight: "bold" }}>
            Role: Store Manager
          </Typography>
          <Typography sx={{ color: "#595959", fontWeight: "bold" }}>
            Store Name: Hangries YamunaNagar
          </Typography>
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
        <MapNew></MapNew>
      </div>
      {renderDetailsModal()}
    </div>
  );
};
