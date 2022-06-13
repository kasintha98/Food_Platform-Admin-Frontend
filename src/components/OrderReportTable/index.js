import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders } from "../../actions";
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
  Typography,
} from "@mui/material";
import { Row, Col, Modal } from "react-bootstrap";
import Pdf from "react-to-pdf";
import { InvoiceTable } from "../InvoiceTable";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CusTableCell1 = styled(TableCell)`
  font-size: 0.75rem;
  font-weight: bold;
  background-color: #ffc000;
`;

const CusTableCell2 = styled(TableCell)`
  font-size: 0.75rem;
  padding: 0;
`;

export const OrderReportTable = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [height, setHeight] = useState(0);

  const dispatch = useDispatch();
  const ref = React.createRef();
  const refH = useRef(null);

  useEffect(() => {
    const today = new Date();
    dispatch(
      getCustomerOrders(
        props.restaurantId,
        props.storeId,
        null,
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      )
    );
  }, [props.restaurantId, props.storeId]);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  const options = {
    unit: "px",
    format: [255, height],
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
  };
  const handleShowInvoice = () => setShowInvoice(true);

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

  const getItemString = (items) => {
    let str = "";

    for (let i = 0; i < items.length; i++) {
      str = str + `${items[i].productName}-${items[i].ingredient}, \n`;
    }

    return str;
  };

  const renderInvoiceModal = () => {
    return (
      <Modal
        show={showInvoice}
        onHide={handleCloseInvoice}
        style={{ marginTop: "40px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography>Invoice</Typography>
          </Modal.Title>
        </Modal.Header>
        {currentOrder ? (
          <Modal.Body style={{ maxHeight: "75vh", overflowY: "auto" }}>
            {currentOrder ? (
              <div ref={ref}>
                <div ref={refH}>
                  <div className="text-center">
                    <Typography sx={{ fontWeight: "600" }}>Hangries</Typography>

                    <Typography sx={{ fontWeight: "600" }}>
                      Order ID: {currentOrder ? currentOrder.orderId : null}
                    </Typography>

                    <Typography sx={{ fontWeight: "600" }}>
                      <span>{currentOrder.orderDeliveryType}</span>
                      <span> [{currentOrder.paymentStatus}]</span>
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <Typography>Name: {currentOrder.customerName}</Typography>
                    <Typography>Address: {currentOrder.address}</Typography>
                    <Typography>Mob No: {currentOrder.mobileNumber}</Typography>
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
                  <div>
                    <InvoiceTable
                      allProducts={currentOrder.orderDetails}
                      grandTot={currentOrder.totalPrice}
                      cgst={currentOrder.cgstCalculatedValue}
                      sgst={currentOrder.sgstCalculatedValue}
                      overallPriceWithTax={currentOrder.overallPriceWithTax}
                      delCharge={currentOrder.deliveryCharges}
                      fullResp={currentOrder}
                    ></InvoiceTable>
                  </div>
                </div>
              </div>
            ) : null}
          </Modal.Body>
        ) : null}

        <Modal.Footer>
          <Row className="w-100">
            <Col className="col-6">
              <Button
                color="secondary"
                onClick={handleCloseInvoice}
                className="w-100"
                variant="contained"
              >
                Close
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
      <ExcelFile element={<Button variant="text">Download Full Report</Button>}>
        <ExcelSheet data={orders} name="Orders">
          <ExcelColumn label="restaurantId" value="restaurantId" />
          <ExcelColumn label="orderStatus" value="orderStatus" />
          <ExcelColumn label="orderId" value="orderId" />
          <ExcelColumn label="createdDate" value="createdDate" />
          <ExcelColumn label="orderSource" value="orderSource" />
          <ExcelColumn label="orderDeliveryType" value="orderDeliveryType" />
          <ExcelColumn label="paymentStatus" value="paymentStatus" />
          <ExcelColumn label="paymentMode" value="paymentMode" />
          <ExcelColumn label="customerName" value="customerName" />
          <ExcelColumn label="mobileNumber" value="mobileNumber" />
          <ExcelColumn
            label="overallPriceWithTax"
            value="overallPriceWithTax"
          />
          <ExcelColumn
            label="cgstCalculatedValue"
            value="cgstCalculatedValue"
          />
          <ExcelColumn
            label="sgstCalculatedValue"
            value="sgstCalculatedValue"
          />
          <ExcelColumn label="deliveryCharges" value="deliveryCharges" />
          {/* <ExcelColumn
            label="orderDetails"
            value={(col) => {
              col.orderDetails.map(
                (item) => `${item.productName}-${item.ingredient}\n`
              );
            }}
          /> */}
          <ExcelColumn
            label="orderDetails"
            value={(col) => getItemString(col.orderDetails)}
          />
          <ExcelColumn label="orderStatus" value="orderStatus" />
          <ExcelColumn label="createdBy" value="createdBy" />
          {/* <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/> */}
        </ExcelSheet>
      </ExcelFile>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 3000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">NO</CusTableCell1>
              <CusTableCell1 align="center">RESTAURANT ID</CusTableCell1>
              <CusTableCell1 align="center">RESTAURANT NAME</CusTableCell1>
              <CusTableCell1 align="center">ORDER STATUS</CusTableCell1>
              <CusTableCell1 align="center">ORDER NO</CusTableCell1>
              <CusTableCell1 align="center">ORDER DATE</CusTableCell1>
              <CusTableCell1 align="center">SOURCE</CusTableCell1>
              <CusTableCell1 align="center">ORDER TYPE</CusTableCell1>
              <CusTableCell1 align="center">PYMT. STATUS</CusTableCell1>
              <CusTableCell1 align="center">PYMT. MODE</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER NAME</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER ADDRESS</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER PHONE NO</CusTableCell1>
              <CusTableCell1 align="center">
                TOTAL AMOUNT INC. TAX
              </CusTableCell1>
              <CusTableCell1 align="center">CGST</CusTableCell1>
              <CusTableCell1 align="center">SGST</CusTableCell1>
              <CusTableCell1 align="center">DELIVERY CHARGES</CusTableCell1>
              <CusTableCell1 align="center">ITEM ORDERED</CusTableCell1>
              <CusTableCell1 align="center">ACTION</CusTableCell1>
              <CusTableCell1 align="center">VIEW | PRINT INVOICE</CusTableCell1>
              <CusTableCell1 align="center">ORDER ENTERED BY</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.length > 0 ? (
              <>
                {orders.map((row, index) => (
                  <TableRow key={row.orderId}>
                    <CusTableCell2 align="center">{index + 1}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.restaurantId}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.restaurantId}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
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
                      {row.orderSource === "W" ? "Web" : row.orderSource}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderDeliveryType}
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
                    <CusTableCell2 align="center">
                      {row.mobileNumber}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.overallPriceWithTax}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.cgstCalculatedValue}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.sgstCalculatedValue}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      Rs. {row.deliveryCharges}
                    </CusTableCell2>
                    <CusTableCell2 align="left">
                      {row.orderDetails.map((item) => (
                        <>
                          {item.ingredient === "No Ingredient" ? (
                            <div>
                              {item.productName} X ({item.quantity}) Rs.
                              {Number(item.quantity) * Number(item.price)}
                              <br></br>
                            </div>
                          ) : (
                            <div style={{}}>
                              {item.ingredient} X ({item.quantity}) Rs.
                              {Number(item.quantity) * Number(item.price)}
                              <br></br>
                            </div>
                          )}
                        </>
                      ))}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderStatus}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      <Button
                        onClick={() => {
                          setCurrentOrder(row);
                          handleShowInvoice();
                        }}
                      >
                        Invoice
                      </Button>
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.createdBy}
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
                    <Alert severity="warning">No orders to show!</Alert>
                  )}
                </CusTableCell2>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {renderInvoiceModal()}
    </div>
  );
};
