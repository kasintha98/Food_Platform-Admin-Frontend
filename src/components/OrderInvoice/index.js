import React, { useState, useEffect, useRef } from "react";
import Pdf from "react-to-pdf";
import { InvoiceTable } from "../InvoiceTable";
import { useHistory } from "react-router-dom";
import { Row, Col, Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./style.css";
import { OrderDetailsTable } from "../OrderDetailsTable";

export const OrderInvoice = (props) => {
  const [showInvoice, setShowInvoice] = useState(false);
  const [height, setHeight] = useState(0);

  const ref = React.createRef();
  const refH = useRef(null);

  useEffect(() => {
    if (refH.current) {
      setHeight(refH.current.clientHeight * 0.58);
    }
  });

  const options = {
    unit: "px",
    format: [255, height],
  };

  const history = useHistory();

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    history.push("/dine-in");
  };

  const handleManualPrint = () => {
    const div = document.getElementById("billNew").innerHTML;
    var windows = window.open("", "", "height=600, width=600");
    windows.document.write("<html><body >");
    windows.document.write(
      "<style> .id{font-size: 12px;} body{text-align: center; margin: 0; line-height: 0; font-size: 10px;} th{font-size: 11px;} h5{font-size: 10px; line-height: 0.9 !important; font-weight: 400 !important;} td{font-size: 11px; font-weight: bold;} table{width: 100%} tbody{text-align: left;} th{text-align: left !important;} section{ line-height: 0.9 !important;}  @media print { body {  }} @page { size: Statement;margin: 0;}</style>"
    );
    windows.document.write(div);
    windows.document.write("</body></html>");
    windows.document.close();
    windows.print();

    //window.print();
  };

  const renderNowDate = () => {
    const dateObj = new Date();
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span>
        {day}/{month.toUpperCase()}/{year}
      </span>
    );
  };

  const renderNowTime = () => {
    const dateObj = new Date();
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  return (
    <Modal
      show={props.showInvoice}
      onHide={handleCloseInvoice}
      style={{ zIndex: 1100 }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Typography>{props.title}</Typography>
        </Modal.Title>
      </Modal.Header>
      {props.orderResp ? (
        <Modal.Body style={{ maxHeight: "75vh", overflowY: "auto" }}>
          {props.storeObj ? (
            <div ref={ref}>
              <div style={{ display: "none" }}>
                <div id="billNew">
                  <div className="text-center">
                    <Typography sx={{ fontWeight: "600" }}>
                      {props.orderResp ? props.orderResp.storeName : "Hangries"}
                    </Typography>
                    <Typography sx={{ color: "black" }}>
                      <span>{props.storeObj.address1}</span>
                      {props.storeObj.address2 ? (
                        <>
                          , <span>{props.storeObj.address2}</span>
                        </>
                      ) : null}
                      {props.storeObj.address3 ? (
                        <>
                          , <br></br>
                          <span>{props.storeObj.address3}</span>
                        </>
                      ) : null}
                      , {props.storeObj.city}
                      {props.storeObj.zipCode ? (
                        <>, {props.storeObj.zipCode}</>
                      ) : null}
                      , {props.storeObj.country}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      GST NO:{" "}
                      {props.storeObj ? props.storeObj.storeGstNumber : null}
                    </Typography>
                    <p className="id">
                      Order ID:{" "}
                      {props.orderResp ? props.orderResp.orderId : null}
                    </p>
                    <Typography sx={{ fontWeight: "600" }}>
                      Customer Name:{" "}
                      {props.firstName ? (
                        <span>
                          {props.firstName} {props.lastName}
                        </span>
                      ) : (
                        <span>{props.orderResp?.customerName}</span>
                      )}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      Table No:{" "}
                      {props.orderResp && props.orderResp.storeTableId
                        ? props.orderResp.storeTableId
                        : "N/A"}
                    </Typography>
                    <Typography sx={{ fontWeight: "600" }}>
                      <span>
                        {props.orderResp
                          ? props.orderResp.orderDeliveryType
                          : null}
                      </span>
                      <span>
                        [
                        {props.orderResp ? props.orderResp.paymentStatus : null}
                        ]
                      </span>
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <Typography sx={{ color: "black" }}>
                      Name:{" "}
                      {props.firstName ? (
                        <span>
                          {props.firstName} {props.lastName}
                        </span>
                      ) : (
                        <span>{props.orderResp?.customerName}</span>
                      )}
                    </Typography>
                    <Typography sx={{ color: "black" }}>
                      Mob No:{" "}
                      {props.phoneNo ? (
                        <span>{props.phoneNo}</span>
                      ) : (
                        <span>{props.orderResp?.mobileNumber}</span>
                      )}
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    <Typography sx={{ color: "black" }}>
                      <Row>
                        <Col>
                          <p>Time: {renderNowTime()}</p>
                        </Col>
                        <Col>
                          <p>Date: {renderNowDate()}</p>
                        </Col>
                      </Row>
                    </Typography>
                  </div>
                  <hr></hr>
                  <div>
                    {
                      (props.title = "OrderDetails" ? (
                        <OrderDetailsTable
                          fullResp={props.fullResp}
                        ></OrderDetailsTable>
                      ) : (
                        <InvoiceTable
                          allProducts={props.orderResp.orderDetails}
                          grandTot={props.orderResp.totalPrice}
                          cgst={props.orderResp.cgstCalculatedValue}
                          sgst={props.orderResp.sgstCalculatedValue}
                          overallPriceWithTax={
                            props.orderResp.overallPriceWithTax
                          }
                          delCharge={props.delCharge}
                          fullResp={props.orderResp}
                          isShowDeliveryCharge={props.isShowDeliveryCharge}
                          bOGOLowestPizzaKey={
                            props.bOGOLowestPizzaKey
                              ? props.bOGOLowestPizzaKey
                              : []
                          }
                          drinkReduceKey={props.drinkReduceKey}
                          pastaReduceKey={props.pasta59OfferReduceTotal}
                          combo1OfferReduceTotal={props.combo1OfferReduceTotal}
                          combo2OfferReduceTotal={props.combo2OfferReduceTotal}
                          friesOfferReduceTotal={props.friesOfferReduceTotal}
                          isBill={true}
                        ></InvoiceTable>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div ref={refH} id="billHY" className="billHY">
                <div className="text-center">
                  <Typography sx={{ fontWeight: "600" }}>
                    {props.orderResp ? props.orderResp.storeName : "Hangries"}
                  </Typography>
                  <Typography sx={{ color: "black" }}>
                    <span>{props.storeObj.address1}</span>
                    {props.storeObj.address2 ? (
                      <>
                        , <span>{props.storeObj.address2}</span>
                      </>
                    ) : null}
                    {props.storeObj.address3 ? (
                      <>
                        , <br></br>
                        <span>{props.storeObj.address3}</span>
                      </>
                    ) : null}
                    , {props.storeObj.city}
                    {props.storeObj.zipCode ? (
                      <>, {props.storeObj.zipCode}</>
                    ) : null}
                    , {props.storeObj.country}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    GST NO:{" "}
                    {props.storeObj ? props.storeObj.storeGstNumber : null}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    Order ID: {props.orderResp ? props.orderResp.orderId : null}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    Customer Name:{" "}
                    {props.firstName ? (
                      <span>
                        {props.firstName} {props.lastName}
                      </span>
                    ) : (
                      <span>{props.orderResp?.customerName}</span>
                    )}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    Table No:{" "}
                    {props.orderResp && props.orderResp.storeTableId
                      ? props.orderResp.storeTableId
                      : "N/A"}
                  </Typography>
                  <Typography sx={{ fontWeight: "600" }}>
                    <span>
                      {props.orderResp
                        ? props.orderResp.orderDeliveryType
                        : null}
                    </span>
                    <span>
                      [{props.orderResp ? props.orderResp.paymentStatus : null}]
                    </span>
                  </Typography>
                </div>
                <hr></hr>
                <div>
                  <Typography sx={{ color: "black" }}>
                    Name:{" "}
                    {props.firstName ? (
                      <span>
                        {props.firstName} {props.lastName}
                      </span>
                    ) : (
                      <span>{props.orderResp?.customerName}</span>
                    )}
                  </Typography>
                  <Typography sx={{ color: "black" }}>
                    Mob No:{" "}
                    {props.phoneNo ? (
                      <span>{props.phoneNo}</span>
                    ) : (
                      <span>{props.orderResp?.mobileNumber}</span>
                    )}
                  </Typography>
                </div>
                <hr></hr>
                <div>
                  <Typography sx={{ color: "black" }}>
                    <Row>
                      <Col>
                        <p>Time: {renderNowTime()}</p>
                      </Col>
                      <Col>
                        <p>Date: {renderNowDate()}</p>
                      </Col>
                    </Row>
                  </Typography>
                </div>
                <hr></hr>
                <div>
                  <InvoiceTable
                    allProducts={props.orderResp.orderDetails}
                    grandTot={props.orderResp.totalPrice}
                    cgst={props.orderResp.cgstCalculatedValue}
                    sgst={props.orderResp.sgstCalculatedValue}
                    overallPriceWithTax={props.orderResp.overallPriceWithTax}
                    delCharge={props.delCharge}
                    fullResp={props.orderResp}
                    isShowDeliveryCharge={props.isShowDeliveryCharge}
                    bOGOLowestPizzaKey={
                      props.bOGOLowestPizzaKey ? props.bOGOLowestPizzaKey : []
                    }
                    drinkReduceKey={props.drinkReduceKey}
                    pastaReduceKey={props.pasta59OfferReduceTotal}
                    combo1OfferReduceTotal={props.combo1OfferReduceTotal}
                    combo2OfferReduceTotal={props.combo2OfferReduceTotal}
                    friesOfferReduceTotal={props.friesOfferReduceTotal}
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
            {/* <ReactToPrint
          pageStyle="{ size: Statement }"
          trigger={() => (
            <Button
              color="secondary"
              //onClick={handleCloseInvoice}
              className="w-100"
              variant="contained"
            >
              Print
            </Button>
          )}
          content={() => ref.current}
        /> */}
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
