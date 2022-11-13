import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import "./style.css";
import { OrderDetailsTable } from "../OrderDetailsTable";

export const OrderInvoice = (props) => {
  const stores = useSelector((state) => state.store.stores);

  const renderNowDate = () => {
    const dateObj = new Date(
      props.currentOrder && props.currentOrder.orderReceivedDateTime
    );
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
    const dateObj = new Date(
      props.currentOrder && props.currentOrder.createdDate
    );
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    return <span>{time}</span>;
  };

  const renderStoreGST = (restaurantId, storeId) => {
    const foundMatch = stores.find(
      (x) => x.restaurantId === restaurantId && x.storeId === storeId
    );

    if (foundMatch) {
      return <>GST NO: {foundMatch.storeGstNumber}</>;
    }
  };

  const renderStoreAddress = (restaurantId, storeId) => {
    const foundMatch = stores.find(
      (x) => x.restaurantId === restaurantId && x.storeId === storeId
    );

    if (foundMatch) {
      return (
        <section>
          <Typography style={{ fontWeight: "600" }}>
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

  return (
    <div>
      <div className="text-center">
        <Typography sx={{ fontWeight: "600" }}>
          {props.currentOrder ? props.currentOrder.restaurantName : "Hangries"}
        </Typography>
        <Typography sx={{ color: "black" }}>
          {renderStoreAddress(
            props.currentOrder.restaurantId,
            props.currentOrder.storeId
          )}
        </Typography>
        <hr></hr>
        <Typography sx={{ fontWeight: "600" }}>
          {renderStoreGST(
            props.currentOrder.restaurantId,
            props.currentOrder.storeId
          )}
        </Typography>

        <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
          Order ID: {props.currentOrder ? props.currentOrder.orderId : null}
        </Typography>
        <hr></hr>
        <Row>
          <Col>
            <Typography sx={{ fontWeight: "600" }}>
              Cashier: {props.currentOrder.createdBy.toUpperCase()}
            </Typography>
          </Col>
          <Col>
            <Typography sx={{ fontWeight: "600" }}>
              Table No:{" "}
              {props.currentOrder && props.currentOrder.storeTableId
                ? props.currentOrder.storeTableId
                : "N/A"}
            </Typography>
          </Col>
        </Row>
        <Typography sx={{ fontWeight: "600" }}>
          <span>{props.currentOrder.orderDeliveryType}</span>
          <span> [{props.currentOrder.paymentStatus}]</span>
        </Typography>
        <div>
          <Typography sx={{ fontWeight: "600" }}>
            <Row>
              <Col>Time: {renderNowTime(props.currentOrder.createdDate)}</Col>
              <Col>
                Date: {renderNowDate(props.currentOrder.orderReceivedDateTime)}
              </Col>
            </Row>
          </Typography>
        </div>
      </div>
      <hr></hr>
      <div className="text-center">
        <Typography sx={{ fontWeight: "600" }}>
          Name: {props.currentOrder.customerName.toUpperCase()}
        </Typography>
        {/* <Typography>Address: {props.currentOrder.address}</Typography> */}
        <Typography sx={{ fontWeight: "600" }}>
          Mob No: {props.currentOrder.mobileNumber}
        </Typography>
        <Typography sx={{ color: "black", fontWeight: "600" }}>
          Address: {props.currentOrder.address}
        </Typography>
      </div>

      <hr></hr>
      <OrderDetailsTable fullResp={props.currentOrder}></OrderDetailsTable>
    </div>
  );
};
