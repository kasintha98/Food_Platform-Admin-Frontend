import React, { forwardRef, useImperativeHandle } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { OrderDetailsTable } from "../OrderDetailsTable";

export const OrderInvoicePrint = forwardRef((props, ref) => {
  const stores = useSelector((state) => state.store.stores);

  const componentRef = React.useRef();

  const renderNowDate = () => {
    const dateObj = new Date(
      props.currentOrder && props.currentOrder.orderReceivedDateTime
    );
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return (
      <span
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          fontFamily: "Billfont",
          color: "black",
        }}
      >
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

    return (
      <span
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          fontFamily: "Billfont",
          color: "black",
        }}
      >
        {time}
      </span>
    );
  };

  useImperativeHandle(ref, () => ({
    handlePrint,
  }));

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const renderStoreGST = (restaurantId, storeId) => {
    const foundMatch = stores.find(
      (x) => x.restaurantId === restaurantId && x.storeId === storeId
    );

    if (foundMatch) {
      return (
        <span
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "Billfont",
            color: "black",
          }}
        >
          GST NO: {foundMatch.storeGstNumber}
        </span>
      );
    }
  };

  const renderStoreAddress = (restaurantId, storeId) => {
    const foundMatch = stores.find(
      (x) => x.restaurantId === restaurantId && x.storeId === storeId
    );

    if (foundMatch) {
      return (
        <section>
          <Typography
            sx={{
              color: "black",
              fontSize: "2.5rem",
              fontWeight: "bold",
              fontFamily: "Billfont",
            }}
          >
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
    <div id="billNew" ref={componentRef} style={{ fontFamily: "Billfont" }}>
      <div className="text-center" /* style={{ marginTop: "25px" }} */>
        <Typography
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "Billfont",
            color: "black",
          }}
        >
          {props.currentOrder ? props.currentOrder.restaurantName : "Hangries"}
        </Typography>
        <Typography>
          {renderStoreAddress(
            props.currentOrder.restaurantId,
            props.currentOrder.storeId
          )}
        </Typography>
        <hr></hr>
        <Typography>
          {renderStoreGST(
            props.currentOrder.restaurantId,
            props.currentOrder.storeId
          )}
        </Typography>

        <p
          style={{ fontSize: "3rem", fontWeight: "bold", color: "black" }}
          className="id"
        >
          Order ID: {props.currentOrder ? props.currentOrder.orderId : null}
        </p>
        <hr></hr>

        <div style={{ display: "inline-flex", columnGap: "15px" }}>
          <p style={{ fontSize: "3rem", fontWeight: "bold", color: "black" }}>
            Cashier: {props.currentOrder.createdBy.toUpperCase()}
          </p>
          <p style={{ fontSize: "3rem", fontWeight: "bold", color: "black" }}>
            Table No:{" "}
            {props.currentOrder && props.currentOrder.storeTableId
              ? props.currentOrder.storeTableId
              : "N/A"}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "3rem", fontWeight: "bold", color: "black" }}>
            <span>{props.currentOrder.orderDeliveryType}</span>
            <span> [{props.currentOrder.paymentStatus}]</span>
          </p>
        </div>
      </div>
      <div style={{ display: "inline-flex", columnGap: "10px" }}>
        <Typography>
          <span
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              fontFamily: "Billfont",
              color: "black",
            }}
          >
            Date:
          </span>{" "}
          {renderNowDate(props.currentOrder.orderReceivedDateTime)}
        </Typography>
        <Typography>
          <span
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              fontFamily: "Billfont",
              color: "black",
            }}
          >
            Time:
          </span>{" "}
          {renderNowTime(props.currentOrder.createdDate)}
        </Typography>
      </div>
      <hr></hr>
      <div>
        <Typography
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "Billfont",
            color: "black",
          }}
        >
          Name: {props.currentOrder.customerName.toUpperCase()}
        </Typography>
        {/* <Typography>Address: {props.currentOrder.address}</Typography> */}
        <Typography
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "Billfont",
            color: "black",
          }}
        >
          Mob No: {props.currentOrder.mobileNumber}
        </Typography>
        <h5
          style={{
            color: "black",
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "Billfont",
          }}
        >
          Address: {props.currentOrder.address}
        </h5>
      </div>
      <hr></hr>

      <OrderDetailsTable
        fullResp={props.currentOrder}
        isBill={true}
      ></OrderDetailsTable>
    </div>
  );
});
