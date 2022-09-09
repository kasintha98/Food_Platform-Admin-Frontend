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
  const [selectedStore, setSelectedStore] = useState(
    user.roleCategory === "SUPER_ADMIN" ? "ALL" : user.restaurantId
  );
  const [selectedStoreObj, setSelectedStoreObj] = useState({
    restaurantId:
      user.roleCategory === "SUPER_ADMIN" ? null : user.restaurantId,
    storeId: user.roleCategory === "SUPER_ADMIN" ? null : user.storeId,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date(businessDateAll && businessDateAll.businessDate);
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
    const today = new Date(businessDateAll && businessDateAll.businessDate);
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
          <Modal.Title>OrderDetails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrderDetailsTable fullResp={currentOrder}></OrderDetailsTable>
        </Modal.Body>
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
