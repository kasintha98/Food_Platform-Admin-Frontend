import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

const CusTableCell = styled(TableCell)`
  color: black;
`;

export const InvoiceTable = (props) => {
  const renderDiscount = (isOnlyValue) => {
    if (props.fullResp.discountPercentage) {
      const grandTotal = Number(props.grandTot);
      const currentPerc = 100 - Number(props.fullResp.discountPercentage);
      const divide = grandTotal / currentPerc;
      const divde100mul = divide * 100;

      const disc = divde100mul - grandTotal;

      if (isOnlyValue) {
        return disc.toFixed(2);
      } else {
        return <span>(- Rs. {disc.toFixed(2)})</span>;
      }
    } else {
      if (isOnlyValue) {
        return 0;
      } else {
        return <span>(- Rs. 0)</span>;
      }
    }
  };

  const renderAllTotal = (key, item) => {
    if (props.bOGOLowestPizzaKey?.some((el) => el.key === key)) {
      return (
        <>
          {props.bOGOLowestPizzaKey.find((x) => x.key === key).quantity *
            props.bOGOLowestPizzaKey.find((x) => x.key === key).price +
            (props.bOGOLowestPizzaKey.find((x) => x.key === key)
              .extraSubTotalWithQty
              ? props.bOGOLowestPizzaKey.find((x) => x.key === key)
                  .extraSubTotalWithQty
              : 0) +
            (Object.keys(
              props.bOGOLowestPizzaKey.find((x) => x.key === key)?.choiceIng
            ).length > 0
              ? Number(
                  props.bOGOLowestPizzaKey.find((x) => x.key === key)?.choiceIng
                    .choiceTotal
                    ? props.bOGOLowestPizzaKey.find((x) => x.key === key)
                        ?.choiceIng.choiceTotal
                    : 0
                )
              : 0)}
        </>
      );
    } else if (props.drinkReduceKey && props.drinkReduceKey.key === key) {
      return (
        <>
          {(Number(item.quantity) -
            Number(props.drinkReduceKey.reducingDrinkaQty)) *
            item.price +
            (item.extraSubTotalWithQty ? item.extraSubTotalWithQty : 0)}
        </>
      );
    } else if (props.pastaReduceKey && props.pastaReduceKey.pastaKey === key) {
      return (
        <>
          {(Number(item.quantity) -
            Number(props.pastaReduceKey.reducingPastaQty)) *
            item.price}
        </>
      );
    } else if (props.combo1OfferReduceTotal) {
      console.log(props.combo1OfferReduceTotal.pizzaObj);
      if (
        props.combo1OfferReduceTotal.pizzaObj.productId === key &&
        props.combo1OfferReduceTotal.pizzaObj.price === item.price
      ) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.combo1OfferReduceTotal.reducingPizzaQty)) *
              item.price}
          </>
        );
      } else if (props.combo1OfferReduceTotal.noodlesKey === key) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.combo1OfferReduceTotal.reducingNoodlesQty)) *
              item.price}
          </>
        );
      } else if (props.combo1OfferReduceTotal.manchuriKey === key) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.combo1OfferReduceTotal.reducingManchuriQty)) *
              item.price}
          </>
        );
      } else if (
        props.combo1OfferReduceTotal.drinkObj.some((el) => el.productId === key)
      ) {
        return (
          <>
            {(Number(item.quantity) -
              Number(
                props.combo1OfferReduceTotal.drinkObj.find((x) => x.key === key)
                  .reducingDrinkQty
              )) *
              item.price}
          </>
        );
      } else {
        return (
          <>
            {item.quantity * item.price +
              (item.extraSubTotalWithQty ? item.extraSubTotalWithQty : 0)}
          </>
        );
      }
    } else if (props.combo2OfferReduceTotal) {
      if (props.combo2OfferReduceTotal.pizzaKey === key) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.combo2OfferReduceTotal.reducingPizzaQty)) *
              item.price +
              (item.extraSubTotalWithQty ? item.extraSubTotalWithQty : 0) +
              (Object.keys(item?.choiceIng).length > 0
                ? item?.choiceIng.choiceTotal
                : 0)}
          </>
        );
      } else if (props.combo2OfferReduceTotal.garBreadKey === key) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.combo2OfferReduceTotal.reducingBreadQty)) *
              item.price +
              (item.extraSubTotalWithQty ? item.extraSubTotalWithQty : 0) +
              (Object.keys(item?.choiceIng).length > 0
                ? item?.choiceIng.choiceTotal
                : 0)}
          </>
        );
      } else if (props.combo2OfferReduceTotal.lavaCakeKey === key) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.combo2OfferReduceTotal.reducingLavaQty)) *
              item.price +
              (item.extraSubTotalWithQty ? item.extraSubTotalWithQty : 0) +
              (Object.keys(item?.choiceIng).length > 0
                ? item?.choiceIng.choiceTotal
                : 0)}
          </>
        );
      } else if (props.combo2OfferReduceTotal.pastaKey === key) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.combo2OfferReduceTotal.reducingPastaQty)) *
              item.price +
              (item.extraSubTotalWithQty ? item.extraSubTotalWithQty : 0) +
              (Object.keys(item?.choiceIng).length > 0
                ? item?.choiceIng.choiceTotal
                : 0)}
          </>
        );
      } else if (
        props.combo2OfferReduceTotal.drinkObj.some((el) => el.productId === key)
      ) {
        return (
          <>
            {(Number(item.quantity) -
              Number(
                props.combo2OfferReduceTotal.drinkObj.find((x) => x.key === key)
                  .reducingDrinkQty
              )) *
              item.price +
              (item.extraSubTotalWithQty ? item.extraSubTotalWithQty : 0) +
              (Object.keys(item?.choiceIng).length > 0
                ? item?.choiceIng.choiceTotal
                : 0)}
          </>
        );
      } else {
        return (
          <>
            {item.quantity * item.price +
              (item.extraSubTotalWithQty ? item.extraSubTotalWithQty : 0) +
              (Object.keys(item?.choiceIng).length > 0
                ? item?.choiceIng.choiceTotal
                : 0)}
          </>
        );
      }
    } else if (props.friesOfferReduceTotal) {
      if (props.friesOfferReduceTotal.drinkKey === key) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.friesOfferReduceTotal.reducingDrinkQty)) *
              item.price}
          </>
        );
      } else if (props.friesOfferReduceTotal.friesKey === key) {
        return (
          <>
            {(Number(item.quantity) -
              Number(props.friesOfferReduceTotal.reducingFriesQty)) *
              item.price}
          </>
        );
      } else {
        return <>{item.quantity * item.price}</>;
      }
    } else {
      return <>{item.quantity * item.price}</>;
    }
  };

  const renderNewSubTotal = () => {
    if (props.drinkReduceKey) {
      return (
        <>
          {Number(props.grandTot) +
            Number(renderDiscount(true)) -
            Number(props.drinkReduceKey.price)}
        </>
      );
    } else if (props.pastaReduceKey) {
      return (
        <>
          {Number(props.grandTot) +
            Number(renderDiscount(true)) -
            Number(props.pastaReduceKey.newPrice)}
        </>
      );
    } else if (props.friesOfferReduceTotal) {
      return (
        <>
          {Number(props.grandTot) +
            Number(renderDiscount(true)) -
            Number(props.friesOfferReduceTotal.price)}
        </>
      );
    } else if (props.combo1OfferReduceTotal) {
      return (
        <>
          {Number(props.grandTot) +
            Number(renderDiscount(true)) -
            Number(props.combo1OfferReduceTotal.price)}
        </>
      );
    } else {
      return <>{Number(props.grandTot) + Number(renderDiscount(true))}</>;
    }
  };

  return (
    <div>
      {props.allProducts ? (
        <Table
          sx={{ width: "100%", overflowX: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <CusTableCell>Dish Name</CusTableCell>
              <CusTableCell>Qty</CusTableCell>
              <CusTableCell>Rate</CusTableCell>
              <CusTableCell>Amount</CusTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allProducts.map((row) => (
              <>
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <CusTableCell>
                    {row.subProductId !== "NAA" ? (
                      <span style={{ marginLeft: "15px" }}>
                        {row.ingredient}
                      </span>
                    ) : (
                      <span> {row.productName}</span>
                    )}
                  </CusTableCell>
                  <CusTableCell>{row.quantity}</CusTableCell>
                  <CusTableCell>
                    Rs. {row.price}
                    .00
                  </CusTableCell>
                  <CusTableCell>
                    Rs. {/* {Number(row.quantity) * Number(row.price)} */}
                    {renderAllTotal(row.productId, row)}.00
                  </CusTableCell>
                </TableRow>
              </>
            ))}
            <TableRow sx={{ borderTop: "2px solid black" }}>
              <CusTableCell component="th" scope="row" colspan="3">
                Total
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                Rs. {renderNewSubTotal()}
              </CusTableCell>
            </TableRow>

            {props.fullResp.discountPercentage &&
            Number(props.fullResp.discountPercentage) ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  Discount
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  {renderDiscount()}
                </CusTableCell>
              </TableRow>
            ) : null}

            {props.fullResp.couponCode ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  Coupon Code
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  {props.fullResp.couponCode}
                </CusTableCell>
              </TableRow>
            ) : null}

            {props.drinkReduceKey ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  DRINK29 Offer
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  Rs. {props.drinkReduceKey.price}.00
                </CusTableCell>
              </TableRow>
            ) : null}

            {props.combo1OfferReduceTotal ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  COMBO1 Offer
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  Rs. {props.combo1OfferReduceTotal.price}.00
                </CusTableCell>
              </TableRow>
            ) : null}

            {props.pastaReduceKey ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  PASTA59 Offer
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  Rs. {props.pastaReduceKey.newPrice}.00
                </CusTableCell>
              </TableRow>
            ) : null}

            {props.friesOfferReduceTotal ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  FRIES69 Offer
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  Rs. {props.friesOfferReduceTotal.price}.00
                </CusTableCell>
              </TableRow>
            ) : null}

            {props.isShowDeliveryCharge ? (
              <TableRow>
                <CusTableCell component="th" scope="row" colspan="3">
                  Delivery Charges
                </CusTableCell>
                <CusTableCell
                  component="th"
                  scope="row"
                  colspan="1"
                  sx={{ fontStyle: "italic" }}
                >
                  Rs. {props.fullResp.deliveryCharges}
                </CusTableCell>
              </TableRow>
            ) : null}

            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                CGST
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                Rs. {props.cgst}
              </CusTableCell>
            </TableRow>

            <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                SGST
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                Rs. {props.sgst}
              </CusTableCell>
            </TableRow>
            {/* <TableRow>
              <CusTableCell component="th" scope="row" colspan="3">
                Delivery Charges
              </CusTableCell>
              <CusTableCell
                component="th"
                scope="row"
                colspan="1"
                sx={{ fontStyle: "italic" }}
              >
                Rs. {props.fullResp.deliveryCharges}
              </CusTableCell>
            </TableRow> */}
            <TableRow
              sx={{
                borderTop: "2px solid black",
                borderBottom: "2px solid black",
              }}
            >
              <CusTableCell component="th" scope="row" colspan="3">
                Grand Total
              </CusTableCell>
              <CusTableCell component="th" scope="row" colspan="1">
                Rs. {props.overallPriceWithTax}
              </CusTableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
};
