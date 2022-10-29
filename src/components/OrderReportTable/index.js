import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders, getAllReports } from "../../actions";
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
import { OrderInvoice } from "../OrderInvoice";
import { OrderInvoicePrint } from "../OrderInvoicePrint";
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

const CusTableCell3 = styled(TableCell)`
  font-size: 0.75rem;
  max-width: 120px;
  word-wrap: break-word;
`;

const CusTableCell5 = styled(TableCell)`
  font-size: 0.75rem;
  background-color: #6c757d;
  color: #fff;
`;

export const OrderReportTable = (props) => {
  //const orders = useSelector((state) => state.order.orders);
  const allReports = useSelector((state) => state.report.allReports);
  const stores = useSelector((state) => state.store.stores);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.order.loading);
  const [showInvoice, setShowInvoice] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(false);
  const [height, setHeight] = useState(0);

  const dispatch = useDispatch();
  const ref = React.createRef();
  const refH = useRef(null);

  useEffect(() => {
    //replace getCustomerOrders data with getAllReports data
    dispatch(
      getAllReports(
        props.restaurantId ? props.restaurantId : "ALL",
        props.storeId ? props.storeId : "ALL",
        `${props.startDate.getFullYear()}-${
          props.startDate.getMonth() + 1
        }-${props.startDate.getDate()}`,
        `${props.endDate.getFullYear()}-${
          props.endDate.getMonth() + 1
        }-${props.endDate.getDate()}`,
        props.selectedReport
      )
    );
  }, [
    props.restaurantId,
    props.storeId,
    props.endDate,
    props.startDate,
    props.selectedReport,
  ]);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  const options = {
    unit: "px",
    format: [265, height],
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

  const handleManualPrint = () => {
    const div = document.getElementById("billNew").innerHTML;
    var windows = window.open("", "", "height=600, width=600");
    windows.document.write("<html><body >");
    windows.document.write(
      "<style> .id{font-size: 12px;} body{text-align: center; margin: 0; line-height: 0; font-size: 10px; font-weight: bold;} th{font-size: 11px;} h5{font-size: 10px; line-height: 0.9 !important; font-weight: bold !important;} td{font-size: 11px; font-weight: bold;} table{width: 100%} tbody{text-align: left;} th{text-align: left !important;} section{ line-height: 0.9 !important;}  @media print { body {  }} @page { size: Statement;margin: 0;}</style>"
    );
    windows.document.write(div);
    windows.document.write("</body></html>");
    windows.document.close();
    windows.print();

    //window.print();
  };
  const renderStoreAddress = (restaurantId, storeId) => {
    const foundMatch = stores.find(
      (x) => x.restaurantId === restaurantId && x.storeId === storeId
    );

    if (foundMatch) {
      return (
        <section>
          <Typography>
            <span>{foundMatch.address1},</span> <br></br>
            {foundMatch.address2 ? <span>{foundMatch.address2},</span> : null}
            {foundMatch.address3 ? <span>{foundMatch.address3},</span> : null}
            <span>{foundMatch.city},</span>
            {foundMatch.zipCode ? <span>{foundMatch.zipCode},</span> : null}
          </Typography>

          {/* <Typography>{foundMatch.country}</Typography> */}
        </section>
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

  const renderInvoiceModal = () => {
    return (
      <Modal
        show={showInvoice}
        onHide={handleCloseInvoice}
        style={{
          marginTop: "65px",
          zIndex: 1100,
          paddingBottom: "60px",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography>Invoice</Typography>
          </Modal.Title>
        </Modal.Header>
        {currentOrder ? (
          <>
            <div ref={ref}>
              <div style={{ display: "none" }}>
                <OrderInvoicePrint
                  currentOrder={currentOrder}
                ></OrderInvoicePrint>
              </div>
              <div ref={refH}>
                <OrderInvoice currentOrder={currentOrder}></OrderInvoice>
              </div>
            </div>
          </>
        ) : null}

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

  const getTotalAmount = () => {
    if (allReports.reportOrderData && allReports.reportOrderData.length > 0) {
      let total = 0;
      for (let i = 0; i < allReports.reportOrderData.length; i++) {
        total = total + allReports.reportOrderData[i].overallPriceWithTax;
      }
      return total;
    } else {
      return 0;
    }
  };

  const getCGST = () => {
    if (allReports.reportOrderData && allReports.reportOrderData.length > 0) {
      let total = 0;
      for (let i = 0; i < allReports.reportOrderData.length; i++) {
        total = total + allReports.reportOrderData[i].cgstCalculatedValue;
      }
      return total.toFixed(2);
    } else {
      return 0;
    }
  };

  const getSGST = () => {
    if (allReports.reportOrderData && allReports.reportOrderData.length > 0) {
      let total = 0;
      for (let i = 0; i < allReports.reportOrderData.length; i++) {
        total = total + allReports.reportOrderData[i].sgstCalculatedValue;
      }
      return total.toFixed(2);
    } else {
      return 0;
    }
  };

  const getDelCharges = () => {
    if (allReports.reportOrderData && allReports.reportOrderData.length > 0) {
      let total = 0;
      for (let i = 0; i < allReports.reportOrderData.length; i++) {
        total = total + allReports.reportOrderData[i].deliveryCharges;
      }
      return total;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <ExcelFile element={<Button variant="text">Download Full Report</Button>}>
        <ExcelSheet data={allReports.reportOrderData} name="Orders">
          <ExcelColumn label="restaurantId" value="restaurantId" />
          <ExcelColumn label="orderStatus" value="orderStatus" />
          <ExcelColumn label="orderId" value="orderId" />
          <ExcelColumn
            label="paymentTxnReference"
            value="paymentTxnReference"
          />
          <ExcelColumn label="createdDate" value="createdDate" />
          <ExcelColumn
            label="orderReceivedDateTime"
            value="orderReceivedDateTime"
          />
          <ExcelColumn label="orderSource" value="orderSource" />
          <ExcelColumn label="orderDeliveryType" value="orderDeliveryType" />
          <ExcelColumn label="paymentStatus" value="paymentStatus" />
          <ExcelColumn label="paymentMode" value="paymentMode" />
          <ExcelColumn label="customerName" value="customerName" />
          <ExcelColumn label="mobileNumber" value="mobileNumber" />
          <ExcelColumn label="storeTableId" value="storeTableId" />
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
          <ExcelColumn label="discountCode" value="discountCode" />
          <ExcelColumn label="discountPercentage" value="discountPercentage" />
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
          <ExcelColumn label="updatedBy" value="updatedBy" />
          {/* <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/> */}
        </ExcelSheet>
      </ExcelFile>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 3000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CusTableCell1 align="center">NO</CusTableCell1>
              <CusTableCell1 align="center">RESTAURANT NAME</CusTableCell1>
              <CusTableCell1 align="center">STORE NAME</CusTableCell1>
              <CusTableCell1 align="center">ORDER STATUS</CusTableCell1>
              <CusTableCell1 align="center">ORDER NO</CusTableCell1>
              <CusTableCell1 align="center">REFERENCE NO</CusTableCell1>
              <CusTableCell1 align="center">ORDER DATE</CusTableCell1>
              <CusTableCell1 align="center">SOURCE</CusTableCell1>
              <CusTableCell1 align="center">ORDER TYPE</CusTableCell1>
              <CusTableCell1 align="center">PYMT. STATUS</CusTableCell1>
              <CusTableCell1 align="center">PYMT. MODE</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER NAME</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER ADDRESS</CusTableCell1>
              <CusTableCell1 align="center">CUSTOMER PHONE NO</CusTableCell1>
              <CusTableCell1 align="center">TABLE NO</CusTableCell1>
              <CusTableCell1 align="center">
                TOTAL AMOUNT INC. TAX
              </CusTableCell1>
              <CusTableCell1 align="center" sx={{ minWidth: "100px" }}>
                CGST
              </CusTableCell1>
              <CusTableCell1 align="center" sx={{ minWidth: "100px" }}>
                SGST
              </CusTableCell1>
              <CusTableCell1 align="center" sx={{ minWidth: "100px" }}>
                DELIVERY CHARGES
              </CusTableCell1>
              <CusTableCell1 align="center">DISCOUNT CODE</CusTableCell1>
              <CusTableCell1 align="center">DISCOUNT PERCENTAGE</CusTableCell1>
              <CusTableCell1 align="center">ITEM ORDERED</CusTableCell1>
              <CusTableCell1 align="center">ACTION</CusTableCell1>
              <CusTableCell1 align="center">VIEW | PRINT INVOICE</CusTableCell1>
              <CusTableCell1 align="center">ORDER ENTERED BY</CusTableCell1>
              <CusTableCell1 align="center">ORDER UPDATED BY</CusTableCell1>
            </TableRow>
          </TableHead>
          <TableBody>
            {allReports.reportOrderData &&
            allReports.reportOrderData.length > 0 ? (
              <>
                {allReports.reportOrderData.map((row, index) => (
                  <TableRow key={row.orderId}>
                    <CusTableCell2 align="center">{index + 1}</CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.restaurantName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.storeName}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {row.orderStatus}
                    </CusTableCell2>
                    <CusTableCell3 align="center">
                      {/* {row.orderId.slice(0, 11)} <br></br>
                      {row.orderId.slice(11, 19)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.slice(19, 23)}
                      </span> */}
                      {row.orderId.substr(0, row.orderId.length - 3)}
                      <span style={{ color: "#4472c4" }}>
                        {row.orderId.substr(row.orderId.length - 3)}
                      </span>
                    </CusTableCell3>
                    <CusTableCell2 align="center">
                      {row.paymentTxnReference
                        ? row.paymentTxnReference
                        : "N/A"}
                    </CusTableCell2>
                    <CusTableCell2 align="center">
                      {new Date(row.orderReceivedDateTime).getFullYear()}-
                      {new Date(row.orderReceivedDateTime).getMonth() + 1}-
                      {new Date(row.orderReceivedDateTime).getDate()}
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
                    <CusTableCell2 align="center">
                      {row.storeTableId ? row.storeTableId : "N/A"}
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
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      {row.couponCode ? row.couponCode : "N/A"}
                    </CusTableCell2>
                    <CusTableCell2
                      align="center"
                      sx={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      {row.discountPercentage ? row.discountPercentage : "N/A"}
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
                    <CusTableCell2 align="center">
                      {row.updatedBy}
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
            <TableRow>
              <CusTableCell5 colSpan={15} align="center">
                TOTAL
              </CusTableCell5>
              <CusTableCell5 align="center">
                Rs. {getTotalAmount()}
              </CusTableCell5>
              <CusTableCell5 align="center">Rs. {getCGST()}</CusTableCell5>
              <CusTableCell5 align="center">Rs. {getSGST()}</CusTableCell5>
              <CusTableCell5 align="center">
                Rs. {getDelCharges()}
              </CusTableCell5>
              <CusTableCell5 colSpan={7} align="center"></CusTableCell5>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {renderInvoiceModal()}
    </div>
  );
};
