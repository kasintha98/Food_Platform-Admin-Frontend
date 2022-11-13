import React from "react";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { OrderDetailsTable } from "../OrderDetailsTable";

export const OrderInvoicePrint = (props) => {
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

  return (
    <div id="billNew">
      <div className="text-center" style={{ marginTop: "25px" }}>
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

        <p className="id">
          Order ID: {props.currentOrder ? props.currentOrder.orderId : null}
        </p>
        <hr></hr>

        <div style={{ display: "inline-flex", columnGap: "5px" }}>
          <p>Cashier: {props.currentOrder.createdBy.toUpperCase()}</p>
          <p>
            Table No:{" "}
            {props.currentOrder && props.currentOrder.storeTableId
              ? props.currentOrder.storeTableId
              : "N/A"}
          </p>
        </div>
        <div>
          <p>
            <span>{props.currentOrder.orderDeliveryType}</span>
            <span> [{props.currentOrder.paymentStatus}]</span>
          </p>
        </div>
      </div>
      <div style={{ display: "inline-flex", columnGap: "10px" }}>
        <Typography>
          Date: {renderNowDate(props.currentOrder.orderReceivedDateTime)}
        </Typography>
        <Typography>
          Time: {renderNowTime(props.currentOrder.createdDate)}
        </Typography>
      </div>
      <hr></hr>
      <div>
        <Typography>
          Name: {props.currentOrder.customerName.toUpperCase()}
        </Typography>
        {/* <Typography>Address: {props.currentOrder.address}</Typography> */}
        <Typography>Mob No: {props.currentOrder.mobileNumber}</Typography>
        <h5 sx={{ color: "black" }}>Address: {props.currentOrder.address}</h5>
      </div>
      <hr></hr>

      <OrderDetailsTable
        fullResp={props.currentOrder}
        isBill={true}
      ></OrderDetailsTable>
    </div>
  );
};
