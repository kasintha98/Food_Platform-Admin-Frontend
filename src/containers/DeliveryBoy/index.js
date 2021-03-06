import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders, updateOrder, getUsersByRole } from "../../actions";
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

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
`;

export const DeliveryBoy = () => {
  const user = useSelector((state) => state.auth.user);
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

  useEffect(() => {
    const today = new Date();

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
    const today = new Date();
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

  const onClickUpdateStatus = (id) => {
    if (status && status !== "none") {
      dispatch(updateOrder(id, status, null)).then((res) => {
        if (res) {
          resetState();
        }
      });
      setStatus("");
    } else {
      toast.error("Please select a status!");
    }
  };

  const handleStatusUpdate = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
  };

  const handleDeliveryBoyUpdate = (event) => {
    setSelectedDeliBoy(event.target.value);

    if (event.target.value) {
      const today = new Date();
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
                            updateOrder(row.orderId, "OUT FOR DELIVERY", null)
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
                              onClickUpdateStatus(row.orderId);
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
